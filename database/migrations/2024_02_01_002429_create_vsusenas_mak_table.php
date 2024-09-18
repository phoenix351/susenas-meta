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
        Schema::create('vsusenas_mak', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('users_id', 36);
            $table->string('status_dok', 10)->default("error");

            $table->string('kode_prov', 2);
            $table->string('kode_kabkot', 2);
            $table->string('kode_kec', 3);
            $table->string('kode_desa', 3);
            $table->string('kode_bs4', 4);
            $table->string('nks', 6);
            $table->string('semester', 1)->default(1);
            // $table->string('id_bs', 10);
            $table->string('r108', 8)->nullable();
            $table->unsignedInteger('r109')->nullable();
            $table->string('r110', 255)->nullable();
            $table->string('r111', 255)->nullable();

            // blok 2
            $table->string('r201_nama', 255)->nullable();
            $table->string('r202_nama', 255)->nullable();
            $table->enum('r201_jabatan', ['Staf BPS Provinsi', 'Staf BPS Kabupaten/Kota', 'Mitra'])->default('Staf BPS Kabupaten/Kota');
            $table->enum('r202_jabatan', ['Staf BPS Provinsi', 'Staf BPS Kabupaten/Kota', 'Mitra'])->default('Staf BPS Kabupaten/Kota');
            $table->string('r203', 1)->nullable();

            // worksheet
            $table->unsignedInteger('wtf_1')->nullable();
            $table->unsignedInteger('wtf_2')->nullable();
            $table->unsignedInteger('wtf_3')->nullable();
            $table->unsignedInteger('wtf_4')->nullable();
            $table->unsignedBigInteger('wtf_5')->nullable();
            $table->unsignedInteger('wtf_6')->nullable();
            $table->unsignedInteger('wtf_7')->nullable();
            $table->unsignedInteger('wtf_8')->nullable();
            $table->unsignedInteger('wtf_9')->nullable();
            $table->unsignedInteger('wtf_10')->nullable();
            $table->unsignedInteger('wtf_11')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vsusenas_mak');
    }
};
