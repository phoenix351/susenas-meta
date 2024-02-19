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
        Schema::create('range_harga_komoditas', function (Blueprint $table) {
            $table->string('id_komoditas');
            $table->string('kode_kabkot');
            $table->unique(['id_komoditas', 'kode_kabkot']);

            $table->integer('min');
            $table->integer('max');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('range_harga_komoditas');
    }
};
