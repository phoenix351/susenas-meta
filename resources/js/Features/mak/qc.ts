// src/features/mak/qc.ts
import { api } from "./api";

export type QcRincian = {
    id: number;
    rincian: string;
    value: number;
    dataType: "integer" | "decimal" | "rupiah";
    editable?: boolean;
};

export async function calculateQc(
    id_ruta: string,
    jumlah_art: number,
    daftarQc: QcRincian[],
    blokqc_3: number
) {
    const { data } = await api.calcQC(id_ruta);
    const newQc = [...daftarQc];

    newQc[0].value = data.kalori_total / jumlah_art / 7;
    newQc[1].value = data.jumlah_komoditas_bahan_makanan;
    newQc[2].value = data.jumlah_komoditas_makanan_jadi_rokok;
    newQc[3].value = blokqc_3;
    newQc[4].value = newQc[1].value + newQc[2].value + newQc[3].value;
    newQc[5].value = Math.round(data.pengeluaran / jumlah_art);
    newQc[6].value = data.kalori_basket / 7 / jumlah_art;

    return newQc;
}

export function recalcRekapMak(rekapMak: any[], source: any[]) {
    const next = [...rekapMak];
    // copy totals
    source.forEach((r: any) => {
        next[r.id_kelompok].beli = Number(r.beli);
        next[r.id_kelompok].produksi = Number(r.produksi);
        next[r.id_kelompok].total =
            next[r.id_kelompok].beli + next[r.id_kelompok].produksi;
    });
    // 15: subtotal 1..14
    next[14] = next.slice(0, 14).reduce(
        (acc, cur) => ({
            beli: acc.beli + (cur?.beli ?? 0),
            produksi: acc.produksi + (cur?.produksi ?? 0),
            total: acc.total + (cur?.total ?? 0),
        }),
        { beli: 0, produksi: 0, total: 0 }
    );
    // 16: avg makanan
    next[15].total = Math.round((next[14].total * 30) / 7);
    // 18: total avg (16 + 17)
    next[17].total = next[15].total + next[16].total;
    return next;
}

export function sumHargaByPattern(
    values: Record<string, any>,
    pattern: string
) {
    return Object.entries(values)
        .filter(([k]) => k.endsWith(pattern) && !k.includes("jumlah"))
        .reduce((sum, [, v]) => sum + (Number(v) || 0), 0);
}
