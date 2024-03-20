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
        Schema::create('kabkot_summary', function (Blueprint $table) {
            $table->string('kode_prov');
            $table->string('kode_kabkot');
            // $table->string('nks');
            $table->string('kabkot');
            $table->integer('jumlah_dok');
            $table->integer('target_nks');
            // $table->tinyInteger('jumlah_dokumen')->default(0);
            $table->integer('dok_error')->default(0);
            $table->integer('dok_warning')->default(0);
            $table->integer('dok_clean')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kabkot_summary');
    }
};
