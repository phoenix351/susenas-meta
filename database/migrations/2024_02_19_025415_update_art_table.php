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
        Schema::table('anggota_ruta', function (Blueprint $table) {

            $table->integer('mak_beli')->nullable();
            $table->integer('mak_produksi')->nullable();
            $table->integer('rokok_beli')->nullable();
            $table->integer('rokok_produksi')->nullable();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        try {
            //code...
            Schema::table('anggota_ruta', function (Blueprint $table) {
                $table->dropColumn('mak_beli');
                $table->dropColumn('mak_produksi');
                $table->dropColumn('rokok_beli');
                $table->dropColumn('rokok_produksi');
                
            });
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
};