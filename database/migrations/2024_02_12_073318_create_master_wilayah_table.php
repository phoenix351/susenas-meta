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
        Schema::create('master_wilayah', function (Blueprint $table) {
            $table->id();

            $table->string('kode_prov', 2);
            $table->string('prov', 63)->default("SULAWESI UTARA");

            $table->string('kode_kabkot', 2);
            $table->string('kabkot', 63)->default("SULAWESI UTARA");

            $table->string('kode_kec', 3);
            $table->string('kec', 63);

            $table->string('kode_desa', 3);
            $table->string('desa', 63);

            $table->string('klas', 1);
            $table->string('kode_bs4', 4);
            $table->string('nks', 6);

            $table->smallInteger('jumlah_ruta');

            $table->string('kode_sls6', 6);
            $table->string('nama_sls', 255);
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_wilayah');
    }
};
