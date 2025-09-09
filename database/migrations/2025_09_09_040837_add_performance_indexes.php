<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ---------- vsusenas_mak ----------
        $this->addIndexIfMissing('vsusenas_mak', ['status_dok', 'kode_kabkot'], 'idx_status_kab');
        // Only add idx_id if 'id' is not already indexed (e.g., as PRIMARY)
        $this->addSingleColumnIndexIfNotIndexed('vsusenas_mak', 'id', 'idx_id');

        // ---------- konsumsi ----------
        $this->addIndexIfMissing('konsumsi', ['id_ruta'], 'idx_ruta');
        $this->addIndexIfMissing('konsumsi', ['id_komoditas'], 'idx_komo');
        $this->addIndexIfMissing('konsumsi', ['volume_total'], 'idx_vol');

        // ---------- konsumsi_art ----------
        $this->addIndexIfMissing('konsumsi_art', ['id_art'], 'idx_art');
        $this->addIndexIfMissing('konsumsi_art', ['id_komoditas'], 'idx_komo');
        $this->addIndexIfMissing('konsumsi_art', ['volume_total'], 'idx_vol');

        // ---------- anggota_ruta ----------
        $this->addIndexIfMissing('anggota_ruta', ['id_ruta'], 'idx_ruta');

        // ---------- komoditas ----------
        // Only add idx_id if 'id' is not already indexed (e.g., as PRIMARY)
        $this->addSingleColumnIndexIfNotIndexed('komoditas', 'id', 'idx_id');
        $this->addIndexIfMissing('komoditas', ['flag_basket'], 'idx_flag');
    }

    public function down(): void
    {
        $this->dropIndexIfExists('vsusenas_mak', 'idx_status_kab');
        $this->dropIndexIfExists('vsusenas_mak', 'idx_id');

        $this->dropIndexIfExists('konsumsi', 'idx_ruta');
        $this->dropIndexIfExists('konsumsi', 'idx_komo');
        $this->dropIndexIfExists('konsumsi', 'idx_vol');

        $this->dropIndexIfExists('konsumsi_art', 'idx_art');
        $this->dropIndexIfExists('konsumsi_art', 'idx_komo');
        $this->dropIndexIfExists('konsumsi_art', 'idx_vol');

        $this->dropIndexIfExists('anggota_ruta', 'idx_ruta');

        $this->dropIndexIfExists('komoditas', 'idx_id');
        $this->dropIndexIfExists('komoditas', 'idx_flag');
    }

    // ----------------- Helpers -----------------

    /** Add a (named) index iff it doesn't already exist. */
    private function addIndexIfMissing(string $table, array $columns, string $indexName): void
    {
        if ($this->indexExists($table, $indexName)) {
            return;
        }
        Schema::table($table, function (Blueprint $t) use ($columns, $indexName) {
            $t->index($columns, $indexName);
        });
    }

    /** Add a single-column index only if that column is not already indexed in any way (incl. PRIMARY). */
    private function addSingleColumnIndexIfNotIndexed(string $table, string $column, string $indexName): void
    {
        if ($this->columnHasAnyIndex($table, $column)) {
            return;
        }
        Schema::table($table, function (Blueprint $t) use ($column, $indexName) {
            $t->index([$column], $indexName);
        });
    }

    /** Drop a (named) index iff it exists. */
    private function dropIndexIfExists(string $table, string $indexName): void
    {
        if (! $this->indexExists($table, $indexName)) {
            return;
        }
        Schema::table($table, function (Blueprint $t) use ($indexName) {
            $t->dropIndex($indexName);
        });
    }

    /** Check by information_schema if an index name exists on a table. */
    private function indexExists(string $table, string $indexName): bool
    {
        $row = DB::selectOne("
            SELECT COUNT(*) AS c
            FROM information_schema.statistics
            WHERE table_schema = DATABASE()
              AND table_name   = ?
              AND index_name   = ?
            LIMIT 1
        ", [$table, $indexName]);

        return ($row && (int) $row->c > 0);
    }

    /** True if *any* index (including PRIMARY) covers the given column. */
    private function columnHasAnyIndex(string $table, string $column): bool
    {
        $row = DB::selectOne("
            SELECT COUNT(*) AS c
            FROM information_schema.statistics
            WHERE table_schema = DATABASE()
              AND table_name   = ?
              AND column_name  = ?
            LIMIT 1
        ", [$table, $column]);

        return ($row && (int) $row->c > 0);
    }
};
