<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sql = "
        CREATE VIEW kabkot_summary AS
SELECT
    master_wilayah.kode_prov,
    master_wilayah.kode_kabkot,
    master_wilayah.kabkot,
    COALESCE(COUNT(DISTINCT master_wilayah.nks), 0) as target_nks,
    COALESCE(COUNT(DISTINCT vsusenas_mak.id), 0) as jumlah_dok,
    -- COALESCE(COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = 'entri' THEN vsusenas_mak.id END), 0) as dok_entri,
    COALESCE(COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = 'error' THEN vsusenas_mak.id END), 0) as dok_error,
    COALESCE(COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = 'warning' THEN vsusenas_mak.id END), 0) as dok_warning,
    COALESCE(COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = 'clean' THEN vsusenas_mak.id END), 0) as dok_clean
FROM
    master_wilayah
LEFT JOIN vsusenas_mak ON master_wilayah.kode_prov = vsusenas_mak.kode_prov
    AND master_wilayah.kode_kabkot = vsusenas_mak.kode_kabkot
WHERE
    master_wilayah.kode_kabkot = 'your_kode_kabkot' OR '00' = '00'  -- Adjust your condition here
GROUP BY
    master_wilayah.kode_prov,
    master_wilayah.kode_kabkot,
    master_wilayah.kabkot;

        ";

        // Execute the raw SQL query
        DB::statement($sql);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('drop view if exists kabkot_summary');
    }
};
