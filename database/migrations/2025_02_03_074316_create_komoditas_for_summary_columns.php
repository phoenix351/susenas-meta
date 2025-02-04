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
        Schema::create('komoditas_kabkot_summary', function (Blueprint $table) {
            $table->string("kode_kabkot");
            $table->integer("id_komoditas");
            $table->double("sum_volume", 20, 3)->default(0);
            $table->double("sum_kalori", 20, 3)->default(0);
            $table->double("average_harga", 20, 3)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komoditas_kabkot_summary');
    }
};
