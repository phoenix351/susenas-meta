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
        Schema::create('user_summary', function (Blueprint $table) {
            $table->string('id');
            $table->string('nama_lengkap');
            $table->string('username');
            $table->string('kode_kabkot');
            $table->string('kabkot');
            $table->integer('jumlah_dokumen')->default(0);
            $table->integer('dok_error')->default(0);
            $table->integer('dok_warning')->default(0);
            $table->integer('dok_clean')->default(0);
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_summary');
    }
};
