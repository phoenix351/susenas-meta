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
        Schema::table('vsusenas_mak', function (Blueprint $table) {
            $table->integer('blok4_31_jumlah_mak_beli')->nullable();
            $table->integer('blok4_31_jumlah_mak_produksi')->nullable();
            $table->integer('blok4_31_jumlah_rokok_beli')->nullable();
            $table->integer('blok4_31_jumlah_rokok_produksi')->nullable();

            for ($i = 0; $i <= 14; $i++) {
                # code...
                $table->integer('blok4_32_' . $i . '_beli')->nullable();
                $table->integer('blok4_32_' . $i . '_produksi')->nullable();
                $table->integer('blok4_32_' . $i . '_total')->nullable();
            }
            $table->integer('blok4_32_15_total')->nullable();
            $table->integer('blok4_32_16_total')->nullable();
            $table->integer('blok4_32_17_total')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        try {
            //code...
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('blok4_31_jumlah_mak_beli');
                $table->dropColumn('blok4_31_jumlah_mak_produksi');
                $table->dropColumn('blok4_31_jumlah_rokok_beli');
                $table->dropColumn('blok4_31_jumlah_rokok_produksi');
    
                for ($i = 0; $i <= 14; $i++) {
                    # code...
    
                    $table->dropColumn('blok4_32_' . $i . '_beli');
                    $table->dropColumn('blok4_32_' . $i . '_produksi');
                    $table->dropColumn('blok4_32_' . $i . '_total');
                }
    
                $table->dropColumn('blok4_32_15_total');
                $table->dropColumn('blok4_32_16_total');
                $table->dropColumn('blok4_32_17_total');
            });
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
};