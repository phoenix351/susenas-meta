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
            $table->float("sum_volume")->default(0);
            $table->float("sum_kalori")->default(0);
            $table->float("average_harga")->default(0);
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
