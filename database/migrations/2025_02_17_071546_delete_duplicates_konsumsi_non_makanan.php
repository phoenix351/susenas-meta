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
        DB::table('konsumsi_non_makanan as t1')
        ->join('konsumsi_non_makanan as t2', function ($join) {
            $join->on('t1.id_ruta', '=', 't2.id_ruta')
                 ->on('t1.id_komoditas', '=', 't2.id_komoditas')
                 ->whereRaw('t1.id < t2.id');
        })
        ->delete();
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
