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
        Schema::create('kabkot', function (Blueprint $table) {
            $table->string('kode', 2);
            $table->primary('kode');
            $table->string('nama', 63);
            $table->string('kode_provinsi', 2);
            $table->foreign('kode_provinsi')->references('kode')->on('provinsi')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kabkot');
    }
};
