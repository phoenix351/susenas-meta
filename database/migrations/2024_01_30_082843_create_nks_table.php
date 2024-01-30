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
        Schema::create('nks', function (Blueprint $table) {
            $table->id();
            $table->string('kode_nks', 6);
            $table->string('kode_kabkot', 2);
            $table->foreign('kode_kabkot')->references('kode')->on('kabkot')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nks');
    }
};
