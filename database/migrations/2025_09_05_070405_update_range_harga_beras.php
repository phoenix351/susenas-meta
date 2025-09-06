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
            DB::table('range_harga_komoditas')
                ->where('id_komoditas', 2)
                ->where('max', '<', 20000)
                ->update(['max' => 20000]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::transaction(function () {
            DB::table('range_harga_komoditas')
                ->where('id', 2)
                ->where('max', 20000)
                ->update(['max' => 19999]);
        });
    }
};
