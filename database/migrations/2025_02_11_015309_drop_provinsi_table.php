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
        Schema::table('kabkot', function (Blueprint $table) {
            $table->dropForeign("kabkot_kode_provinsi_foreign");
        });
        Schema::table('provinsi', function (Blueprint $table) {
            $table->drop(); 
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
