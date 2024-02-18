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
        Schema::create('konsumsi_art', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_komoditas');
            $table->string('id_art', 36);
            $table->unique(['id_art', 'id_komoditas']);

            $table->string('item')->nullable();
            $table->string('satuan')->nullable();
            $table->integer('harga_beli')->nullable();
            $table->integer('harga_produksi')->nullable();
            $table->integer('volume_beli')->nullable();
            $table->integer('volume_produksi')->nullable();
            $table->integer('volume_total')->nullable();
            $table->integer('harga_total')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konsumsi_art');
    }
};
