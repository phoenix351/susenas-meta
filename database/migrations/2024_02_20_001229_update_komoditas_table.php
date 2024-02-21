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
        Schema::table('komoditas', function (Blueprint $table) {
            $table->integer('kalori')->default(0);
            $table->boolean('flag_basket')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        try {
            //code...
            Schema::table('komoditas', function (Blueprint $table) {
                $table->dropColumn('kalori');
                $table->dropColumn('flag_basket');
            });
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
};
