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
        Schema::table('kabkot_summary', function (Blueprint $table) {
            $table->double("konsumsi_perkapita_total", 20, 3)->default(0);
            $table->integer("jumlah_individu")->default(0);
            $table->integer("jumlah_ruta")->default(0);

            $table->double("konsumsi_perkapita_basket_komoditas", 20, 3)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
