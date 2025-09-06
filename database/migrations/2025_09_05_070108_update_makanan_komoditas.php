<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::transaction(function () {

            DB::table('komoditas')
                ->where('id', 83)
                ->update(['satuan' => '250 ml']);
            DB::table('komoditas')
                ->where('nama_komoditas', 'like', '%?%')
                ->update([
                    'nama_komoditas' => DB::raw("REPLACE(nama_komoditas, '?', '-')")
                ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::transaction(function () {
            DB::table('komoditas')
                ->where('id', 83)
                ->update(['satuan' => '200 ml']);
            DB::table('komoditas')
                ->where('nama_komoditas', 'like', '%-%')
                ->update([
                    'nama_komoditas' => DB::raw("REPLACE(nama_komoditas, '-', '?')")
                ]);
        });
    }
};
