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
        Schema::create('konsumsi', function (Blueprint $table) {
            // $table->id();
            $table->unsignedBigInteger('id_ruta');
            $table->unsignedBigInteger('id_komoditas');
            $table->primary(['id_ruta', 'id_komoditas']);

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
        Schema::dropIfExists('konsumsi');
    }
};