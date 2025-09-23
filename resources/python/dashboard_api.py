# monitoring_dashboard.py
# Python port of MonitoringController::update_dashboard() and dependencies
# SQLAlchemy Core + ORM; compatible with MySQL/MariaDB and Postgres.
from __future__ import annotations

import time
from dataclasses import dataclass
from datetime import datetime
from typing import Dict, Any, Optional, Tuple, List

from sqlalchemy import (
    create_engine, MetaData, Table, Column, Integer, String, Float, DateTime,
    select, func, and_, text, insert, update,cast
)
from sqlalchemy.dialects.mysql import insert as mysql_insert
from sqlalchemy.dialects.postgresql import insert as pg_insert


from sqlalchemy.orm import sessionmaker

# ----------------------------
# Database bootstrap
# ----------------------------
# Example DSN (MySQL/MariaDB):
#   "mysql+pymysql://user:pass@localhost:3306/your_db?charset=utf8mb4"
# Example DSN (Postgres):
#   "postgresql+psycopg2://user:pass@localhost:5432/your_db"
ENGINE_DSN = "mysql+pymysql://root:root@localhost:3306/meta_ssn_2025_maret?charset=utf8mb4"

engine = create_engine(ENGINE_DSN, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine)
metadata = MetaData()

# ----------------------------
# Tables referenced in PHP
# (only columns we touch are declared here)
# ----------------------------
kabkot = Table(
    "kabkot", metadata,
    Column("id", Integer, primary_key=True),
    Column("kode", String(8), nullable=False),
)

susenas_mak = Table(
    "vsusenas_mak", metadata,
    Column("id", Integer, primary_key=True),
    Column("status_dok", String(16)),
    Column("kode_prov", String(4)),
    Column("kode_kabkot", String(8)),
    # other columns...
)
anggota_ruta = Table("anggota_ruta", metadata, autoload_with=engine)

komoditas_kabkot_summary = Table(
    "komoditas_kabkot_summary", metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("kode_kabkot", String(8), index=True),
    Column("id_komoditas", Integer, index=True),
    Column("sum_volume", Float),
    Column("sum_kalori", Float),
    Column("average_harga", Float),
)

kabkot_summary = Table(
    "kabkot_summary", metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("kode_kabkot", String(8), unique=True),
    Column("konsumsi_perkapita_total", Float),
    Column("konsumsi_perkapita_basket_komoditas", Float),
    Column("jumlah_individu", Integer),
    Column("jumlah_ruta", Integer),
    # If you track doc status per kab/kot in this table, add them:
    Column("dok_error", Integer, default=0),
    Column("dok_warning", Integer, default=0),
    Column("dok_clean", Integer, default=0),
)

# You likely also have base tables for konsumsi:
konsumsi = Table("konsumsi", metadata, autoload_with=engine)
konsumsi_art = Table("konsumsi_art", metadata, autoload_with=engine)

# and possibly a komoditas reference table used in the join:
komoditas = Table("komoditas", metadata, autoload_with=engine)
# If you had a materialized/summary view in PHP (e.g., komoditas_kabkot_summary source),
# make sure it exists or replace with your base joins in komoditas_summary() below.


# ----------------------------
# Helpers (ported logic, with TODOs where PHP is truncated)
# ----------------------------
def resolve_col(tbl, *candidates: str):
    existing = set(tbl.columns.keys())
    for name in candidates:
        if name in existing:
            return tbl.c[name]
    raise KeyError(
        f"None of the candidate columns {candidates} exist in table '{tbl.name}'. "
        f"Available columns: {sorted(existing)}"
    )

def build_join_chain(base_table):
    """
    Returns (joined_from, susenas_tbl) so we can filter by status_dok/kode_kabkot.
    - RUTA tables have id_ruta -> vsusenas_mak.id
    - ART tables have id_art -> anggota_ruta.id -> anggota_ruta.id_ruta -> vsusenas_mak.id
    Always joins komoditas on id_komoditas -> komoditas.id
    """
    # join to komoditas
    col_idkomod_local  = resolve_col(base_table, "id_komoditas", "komoditas_id", "id_komod")
    col_idkomod_remote = resolve_col(komoditas, "id", "id_komoditas")

    if "id_art" in base_table.columns or "art_id" in base_table.columns:
        col_id_art = resolve_col(base_table, "id_art", "art_id")
        # ART chain: base -> anggota_ruta -> vsusenas_mak
        jr = (
            base_table
            .join(anggota_ruta, col_id_art == anggota_ruta.c.id)
            .join(susenas_mak, anggota_ruta.c.id_ruta == susenas_mak.c.id)
            .join(komoditas, col_idkomod_local == col_idkomod_remote)
        )
        return jr, susenas_mak
    else:
        # RUTA chain: base -> vsusenas_mak
        col_id_ruta = resolve_col(base_table, "id_ruta", "ruta_id")
        jr = (
            base_table
            .join(susenas_mak, col_id_ruta == susenas_mak.c.id)
            .join(komoditas, col_idkomod_local == col_idkomod_remote)
        )
        return jr, susenas_mak
def get_total_kapita(sess, kode_kabkot: str) -> int:
    """
    PHP: counts individuals from clean routes.
    In your PHP, this likely derives from SusenasMak join(s).
    """
    q = select(func.count(susenas_mak.c.id)).where(susenas_mak.c.status_dok == "clean")
    if kode_kabkot != "00":
        q = q.where(susenas_mak.c.kode_kabkot == kode_kabkot)
    return sess.execute(q).scalar_one() or 0


def get_konsumsi_total(sess, base_table, relationship: str, kode_kabkot: str) -> dict:
    # Base numeric columns on konsumsi / konsumsi_art
    col_volume      = resolve_col(base_table, "volume_total", "volume_beli", "volume_produksi")
    col_harga_total = resolve_col(base_table, "harga_total", "total_harga", "nilai", "nilai_total")

    # From komoditas (PHP: $table->komoditas->kalori)
    col_kalori      = resolve_col(komoditas, "kalori", "energi", "kal")

    # Join chain (handles RUTA vs ART automatically)
    joined_from, sus_tbl = build_join_chain(base_table)

    # Filters (only add if column exists)
    conds = []
    if "status_dok" in sus_tbl.columns:
        conds.append(sus_tbl.c.status_dok == "clean")
    if kode_kabkot != "00" and "kode_kabkot" in sus_tbl.columns:
        conds.append(sus_tbl.c.kode_kabkot == kode_kabkot)

    # Aggregates
    sum_volume_expr = func.sum(col_volume)
    sum_kalori_expr = func.sum(col_kalori)
    avg_harga_expr  = (func.sum(col_harga_total) / func.nullif(sum_volume_expr, 0)).label("avg_harga")

    q_total = select(sum_volume_expr, sum_kalori_expr, avg_harga_expr).select_from(joined_from)
    if conds:
        q_total = q_total.where(and_(*conds))
    total_row = sess.execute(q_total).first()
    sum_vol = float(total_row[0] or 0)
    sum_kal = float(total_row[1] or 0)
    avg_h   = float(total_row[2] or 0)

    # TODO: replace basket_filter with your actual rule (e.g., specific komoditas IDs)
    basket_filter = text("1=1")
    q_basket = select(sum_volume_expr, sum_kalori_expr).select_from(joined_from).where(basket_filter)
    if conds:
        q_basket = q_basket.where(and_(*conds))
    b_row = sess.execute(q_basket).first()
    basket_vol = float(b_row[0] or 0)
    basket_kal = float(b_row[1] or 0)

    return {
        "sum_volume": sum_vol,
        "sum_kalori": sum_kal,
        "average_harga": avg_h,
        "total": sum_kal,     # calories total
        "basket": basket_kal  # calories in basket subset
    }

def get_konsumsi_ruta_total(sess, kode_kabkot: str) -> Dict[str, float]:
    # Mirrors your PHP get_konsumsi_ruta_total()
    return get_konsumsi_total(sess, konsumsi, relationship="ruta", kode_kabkot=kode_kabkot)


def get_konsumsi_art_total(sess, kode_kabkot: str) -> Dict[str, float]:
    # Mirrors your PHP get_konsumsi_art_total()
    return get_konsumsi_total(sess, konsumsi_art, relationship="art", kode_kabkot=kode_kabkot)


def konsumsi_perkapita_total(sess, kode_kabkot: str) -> Dict[str, float]:
    """
    PHP logic (as visible): 
      total_konsumsi_art_kalori["total"] + total_konsumsi_ruta_kalori["total"]
      then scaled by (30/7)/jumlah_kapita
      same for "basket".
    """
    jumlah_kapita = get_total_kapita(sess, kode_kabkot)
    if jumlah_kapita <= 0:
        return {"total": 0.0, "basket": 0.0, "jumlah_individu": 0}

    total_ruta = get_konsumsi_ruta_total(sess, kode_kabkot)
    total_art = get_konsumsi_art_total(sess, kode_kabkot)

    total_kal = (total_art["total"] + total_ruta["total"]) * 30.0 / 7.0 / jumlah_kapita
    basket_kal = (total_art["basket"] + total_ruta["basket"]) * 30.0 / 7.0 / jumlah_kapita

    return {
        "total": float(total_kal),
        "basket": float(basket_kal),
        "jumlah_individu": int(jumlah_kapita),
    }


def komoditas_summary(sess, kode_kabkot: str) -> List[Dict[str, Any]]:
    # Use konsumsi as the base (RUTA-level). If you need ART-level, call with konsumsi_art.
    base = konsumsi

    col_volume      = resolve_col(base, "volume_total", "volume_beli", "volume_produksi")
    col_harga_total = resolve_col(base, "harga_total", "total_harga", "nilai", "nilai_total")
    col_kalori      = resolve_col(komoditas, "kalori", "energi", "kal")
    col_idkomod     = resolve_col(base, "id_komoditas", "komoditas_id", "id_komod")

    joined_from, sus_tbl = build_join_chain(base)

    conds = []
    if "status_dok" in sus_tbl.columns:
        conds.append(sus_tbl.c.status_dok == "clean")
    if kode_kabkot != "00" and "kode_kabkot" in sus_tbl.columns:
        conds.append(sus_tbl.c.kode_kabkot == kode_kabkot)

    sum_volume_expr = func.sum(col_volume).label("sum_volume")
    sum_kalori_expr = func.sum(col_kalori).label("sum_kalori")
    avg_harga_expr  = (func.sum(col_harga_total) / func.nullif(func.sum(col_volume), 0)).label("average_harga")

    q = (
        select(
            sus_tbl.c.kode_kabkot.label("kode_kabkot"),
            col_idkomod.label("id_komoditas"),
            sum_volume_expr,
            sum_kalori_expr,
            avg_harga_expr,
        )
        .select_from(joined_from)
        .group_by(sus_tbl.c.kode_kabkot, col_idkomod)
        .order_by(col_idkomod.asc())
    )
    if conds:
        q = q.where(and_(*conds))

    rows = sess.execute(q).mappings().all()
    now = datetime.utcnow()
    return [
        {
            "kode_kabkot": r["kode_kabkot"],
            "id_komoditas": int(r["id_komoditas"] or 0),
            "sum_volume": float(r["sum_volume"] or 0),
            "sum_kalori": float(r["sum_kalori"] or 0),
            "average_harga": float(r["average_harga"] or 0),
        }
        for r in rows
    ]

def upsert_kabkot_summary(sess, data: Dict[str, Any]) -> None:
    dialect = engine.dialect.name
    if dialect in ("mysql", "mariadb"):
        mi = mysql_insert(kabkot_summary).values(**data)
        stmt = mi.on_duplicate_key_update(
            konsumsi_perkapita_total=mi.inserted.konsumsi_perkapita_total,
            konsumsi_perkapita_basket_komoditas=mi.inserted.konsumsi_perkapita_basket_komoditas,
            jumlah_individu=mi.inserted.jumlah_individu,
            jumlah_ruta=mi.inserted.jumlah_ruta,
            dok_error=mi.inserted.dok_error,
            dok_warning=mi.inserted.dok_warning,
            dok_clean=mi.inserted.dok_clean,
        )
    elif dialect == "postgresql":
        pi = pg_insert(kabkot_summary).values(**data)
        stmt = pi.on_conflict_do_update(
            index_elements=[kabkot_summary.c.kode_kabkot],  # requires UNIQUE
            set_={
                "konsumsi_perkapita_total": pi.excluded.konsumsi_perkapita_total,
                "konsumsi_perkapita_basket_komoditas": pi.excluded.konsumsi_perkapita_basket_komoditas,
                "jumlah_individu": pi.excluded.jumlah_individu,
                "jumlah_ruta": pi.excluded.jumlah_ruta,
                "dok_error": pi.excluded.dok_error,
                "dok_warning": pi.excluded.dok_warning,
                "dok_clean": pi.excluded.dok_clean,
            },
        )
    else:
        raise RuntimeError(f"Unsupported dialect for upsert: {dialect}")
    sess.execute(stmt)


def upsert_komoditas_kabkot_summary(sess, rows: List[Dict[str, Any]]) -> None:
    if not rows:
        return
    dialect = engine.dialect.name
    if dialect in ("mysql", "mariadb"):
        mi = mysql_insert(komoditas_kabkot_summary).values(rows)
        stmt = mi.on_duplicate_key_update(
            sum_volume=mi.inserted.sum_volume,
            sum_kalori=mi.inserted.sum_kalori,
            average_harga=mi.inserted.average_harga,
        )
    elif dialect == "postgresql":
        pi = pg_insert(komoditas_kabkot_summary).values(rows)
        stmt = pi.on_conflict_do_update(
            index_elements=[komoditas_kabkot_summary.c.kode_kabkot,
                            komoditas_kabkot_summary.c.id_komoditas],  # requires UNIQUE pair
            set_={
                "sum_volume": pi.excluded.sum_volume,
                "sum_kalori": pi.excluded.sum_kalori,
                "average_harga": pi.excluded.average_harga,
            },
        )
    else:
        raise RuntimeError(f"Unsupported dialect for upsert: {dialect}")
    sess.execute(stmt)
# ----------------------------
# Core computation (ported)
# ----------------------------
def hitung_summary_kabupaten_kota(sess, kode_kabkot: str) -> None:
    # Count clean RUTA in this kab/kot
    q_ruta = select(func.count(susenas_mak.c.id)).where(susenas_mak.c.status_dok == "clean")
    if kode_kabkot != "00":
        q_ruta = q_ruta.where(susenas_mak.c.kode_kabkot == kode_kabkot)
    jumlah_ruta = sess.execute(q_ruta).scalar_one() or 0
    if jumlah_ruta == 0:
        return

    # Per-kapita totals
    percap = konsumsi_perkapita_total(sess, kode_kabkot)
    konsumsi_total = round(percap["total"], 3)
    konsumsi_basket = round(percap["basket"], 3)
    jumlah_individu = percap["jumlah_individu"]

    # TODO: compute dok_error/dok_warning/dok_clean if you track these per kab/kot
    dok_error = 0
    dok_warning = 0
    dok_clean = jumlah_ruta

    # Upsert kabkot_summary
    now = datetime.utcnow()
    data = dict(
        kode_kabkot=kode_kabkot,
        konsumsi_perkapita_total=konsumsi_total,
        konsumsi_perkapita_basket_komoditas=konsumsi_basket,
        jumlah_individu=jumlah_individu,
        jumlah_ruta=jumlah_ruta,
        dok_error=dok_error,
        dok_warning=dok_warning,
        dok_clean=dok_clean,
    )
    upsert_kabkot_summary(sess, data)

    # Bulk upsert komoditas_kabkot_summary
    rows = komoditas_summary(sess, kode_kabkot)
    upsert_komoditas_kabkot_summary(sess, rows)



# ----------------------------
# Public entrypoint (ported)
# ----------------------------
def update_dashboard():
    """
    Port of MonitoringController::update_dashboard()
    Iterates kab/kot (kode != '00') and computes summaries,
    printing how long each kab/kot took.
    """
    with SessionLocal() as sess:
        # Fetch kab/kot list
        q = select(kabkot.c.kode).where(kabkot.c.kode != "00")
        daftar = [row[0] for row in sess.execute(q).all()]

        for kode in daftar:
            start = time.perf_counter()
            hitung_summary_kabupaten_kota(sess, kode)
            end = time.perf_counter()
            duration = end - start

            print(
                f"[{datetime.utcnow().isoformat()}] "
                f"Updated summary for kab/kot {kode} "
                f"in {duration:.3f} seconds"
            )

        sess.commit()
    return {"message": "selesai menghitung summary"}


if __name__ == "__main__":
    # Run once
    # --- DIAGNOSTIC: list columns so we know real names ---
    print("konsumsi columns:", list(konsumsi.columns.keys()))
    print("konsumsi_art columns:", list(konsumsi_art.columns.keys()))
    print("vsusenas_mak columns:", list(susenas_mak.columns.keys()))

    print(update_dashboard())
    