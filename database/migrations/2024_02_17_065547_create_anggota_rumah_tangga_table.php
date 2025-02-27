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
        Schema::create('anggota_ruta', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('id_ruta', 36);
            $table->string('nama');
            $table->integer('nomor_art');
            $table->unique(['nomor_art', 'id_ruta']);
            $table->string('rekap')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_rumah_tangga');
    }
};
