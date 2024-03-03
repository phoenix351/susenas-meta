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
        Schema::create('daftar_validasi', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('error');
            $table->string('blok');
            $table->string('nama_variabel');
            $table->string('deskripsi_variabel');
            $table->string('nama_rule');
            $table->string('value')->nullable();

            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daftar_validasi');
    }
};
