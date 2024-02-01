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
            $table->id();
            $table->string('kode_prov', 2);
            $table->string('kode_kab', 2);
            $table->string('kode_kec', 3);
            $table->string('kode_desa', 3);
            $table->string('kode_bs4', 4);
            $table->string('nks', 6);
            $table->string('semester', 1);
            // $table->string('id_bs', 10);
            $table->string('id_dsrt', 2);
            // $table->string('no_urut_sampel', 4);

            $table->string('operator_id', 15);

            $table->string('nama_krt', 255);
            $table->string('alamat', 255);
            $table->string('status', 15);

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
