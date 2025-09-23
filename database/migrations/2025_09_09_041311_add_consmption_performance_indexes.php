<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ---------- ruta / susenas_mak ----------
        // $this->addIndexIfMissing('ruta', ['status_dok', 'kode_kabkot'], 'idx_status_kab');
        $this->addIndexIfMissing('vsusenas_mak', ['status_dok', 'kode_kabkot'], 'idx_status_kab');
        $this->addIndexIfMissing('vsusenas_mak', ['kode_kabkot'], 'idx_kab');

        // ---------- anggota_ruta ----------
        $this->addIndexIfMissing('anggota_ruta', ['id_ruta'], 'idx_ruta');

        // ---------- konsumsi ----------
        $this->addIndexIfMissing('konsumsi', ['id_ruta'], 'idx_ruta');
        $this->addIndexIfMissing('konsumsi', ['volume_total'], 'idx_vol');

        // ---------- konsumsi_art ----------
        $this->addIndexIfMissing('konsumsi_art', ['id_art'], 'idx_art');
        $this->addIndexIfMissing('konsumsi_art', ['volume_total'], 'idx_vol');

        // ---------- komoditas ----------
        $this->addIndexIfMissing('komoditas', ['flag_basket'], 'idx_flag');

        // ---------- komoditas_kabkot_summary ----------
        // drop legacy/conflicting uniques if present
        $this->dropIndexIfExists('komoditas_kabkot_summary', 'uk_kabkot');
        $this->dropIndexIfExists('komoditas_kabkot_summary', 'uk_kabkot_nullkomoditas');

        // add consolidated unique + helper indexes
        $this->addUniqueIfMissing('komoditas_kabkot_summary', ['kode_kabkot', 'id_komoditas'], 'uk_kabkot_komo');
        $this->addIndexIfMissing('komoditas_kabkot_summary', ['kode_kabkot'], 'idx_kabkot');
        $this->addIndexIfMissing('komoditas_kabkot_summary', ['id_komoditas'], 'idx_komo');

        // ---------- kabkot_summary ----------
        // fast lookup by kode_kabkot (non-unique)
        // NOTE: if you plan to add UNIQUE(kode_kabkot), the unique already implies an index.
        // We'll add the non-unique only if the unique isn't present.
        if (! $this->indexExists('kabkot_summary', 'uk_kabkot')) {
            $this->addIndexIfMissing('kabkot_summary', ['kode_kabkot'], 'idx_kabkot');
        }

        // unique per kab/kot (adjust if your design needs kode_prov too)
        $this->addUniqueIfMissing('kabkot_summary', ['kode_kabkot'], 'uk_kabkot');

        // ---------- master_wilayah ----------
        $this->addIndexIfMissing('master_wilayah', ['kode_kabkot'], 'idx_kabkot');
    }

    public function down(): void
    {
        // Drop everything we added (safe if missing)

        // ruta / susenas_mak
        // $this->dropIndexIfExists('ruta', 'idx_status_kab');
        $this->dropIndexIfExists('vsusenas_mak', 'idx_status_kab');
        $this->dropIndexIfExists('vsusenas_mak', 'idx_kab');

        // anggota_ruta
        $this->dropIndexIfExists('anggota_ruta', 'idx_ruta');

        // konsumsi
        $this->dropIndexIfExists('konsumsi', 'idx_ruta');
        $this->dropIndexIfExists('konsumsi', 'idx_vol');

        // konsumsi_art
        $this->dropIndexIfExists('konsumsi_art', 'idx_art');
        $this->dropIndexIfExists('konsumsi_art', 'idx_vol');

        // komoditas
        $this->dropIndexIfExists('komoditas', 'idx_flag');

        // komoditas_kabkot_summary
        $this->dropIndexIfExists('komoditas_kabkot_summary', 'uk_kabkot_komo'); // unique
        $this->dropIndexIfExists('komoditas_kabkot_summary', 'idx_kabkot');
        $this->dropIndexIfExists('komoditas_kabkot_summary', 'idx_komo');

        // kabkot_summary
        $this->dropIndexIfExists('kabkot_summary', 'uk_kabkot'); // unique
        $this->dropIndexIfExists('kabkot_summary', 'idx_kabkot');

        // master_wilayah
        $this->dropIndexIfExists('master_wilayah', 'idx_kabkot');
    }

    // --------------- helpers ----------------

    /** Add a (named) non-unique index if missing. */
    private function addIndexIfMissing(string $table, array $columns, string $name): void
    {
        if ($this->indexExists($table, $name)) return;

        Schema::table($table, function (Blueprint $t) use ($columns, $name) {
            $t->index($columns, $name);
        });
    }

    /** Add a (named) unique index if missing. */
    private function addUniqueIfMissing(string $table, array $columns, string $name): void
    {
        if ($this->indexExists($table, $name)) return;

        Schema::table($table, function (Blueprint $t) use ($columns, $name) {
            $t->unique($columns, $name);
        });
    }

    /** Drop an index/unique by name if it exists. */
    private function dropIndexIfExists(string $table, string $name): void
    {
        if (! $this->indexExists($table, $name)) return;

        Schema::table($table, function (Blueprint $t) use ($name) {
            // Laravel treats unique separately; try unique first then generic index.
            try {
                $t->dropUnique($name);
            } catch (\Throwable $e) {
                try {
                    $t->dropIndex($name);
                } catch (\Throwable $e2) {
                    // swallow: index already gone or type mismatch
                }
            }
        });
    }

    /** Check presence by information_schema. */
    private function indexExists(string $table, string $name): bool
    {
        $row = DB::selectOne(
            "SELECT COUNT(*) AS c
             FROM information_schema.statistics
             WHERE table_schema = DATABASE()
               AND table_name   = ?
               AND index_name   = ?
             LIMIT 1",
            [$table, $name]
        );

        return $row && (int)$row->c > 0;
    }
};
