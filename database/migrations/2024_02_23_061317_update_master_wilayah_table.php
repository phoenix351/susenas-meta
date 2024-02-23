<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('master_wilayah', function (Blueprint $table) {
            $table->dropColumn('jumlah_ruta');
            $table->dropColumn('kode_sls6');
            $table->dropColumn('nama_sls');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('master_wilayah', function (Blueprint $table) {
            $table->integer('jumlah_ruta');
            $table->string('kode_sls6', 6);
            $table->string('nama_sls', 255);
        });
        //
    }
};
