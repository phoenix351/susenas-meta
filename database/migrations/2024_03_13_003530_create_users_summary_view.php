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
            CREATE VIEW user_summary AS
            SELECT
                users.id,
                users.nama_lengkap,
                users.username,
                users.kode_kabkot,
                master_wilayah.kabkot,
                COUNT(DISTINCT vsusenas_mak.id) as jumlah_dokumen,
                COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = 'error' THEN vsusenas_mak.id END) as dok_error,
                COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = 'warning' THEN vsusenas_mak.id END) as dok_warning,
                COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = 'clean' THEN vsusenas_mak.id END) as dok_clean
            FROM
                users
                JOIN vsusenas_mak ON vsusenas_mak.users_id = users.id
                JOIN master_wilayah ON master_wilayah.kode_kabkot = users.kode_kabkot
            GROUP BY
                users.id, users.nama_lengkap, users.username, users.kode_kabkot, master_wilayah.kabkot
            ";

        // Execute the raw SQL query
        DB::statement($sql);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('drop view if exists user_summary');
    }
};
