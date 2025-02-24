<?php

use App\Models\KomoditasNonMakanan;
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

        Schema::table('komoditas_non_makanan', function (Blueprint $table) {
            $table->integer("nomor_urut")->nullable();
        });
        $new_nomor = [
            "1" =>    1,
            "2" =>    2,
            "3" =>    3,
            "4" =>    5,
            "5" =>    6,
            "6" =>    7,
            "7" =>    8,
            "8" =>    9,
            "9" =>    10,
            "10" =>    11,
            "11" =>    12,
            "12" =>    16,
            "13" =>    14,
            "14" =>    13,
            "15" =>    15,
            "16" =>    4,
            "17" =>    17,
            "18" =>    18,
            "19" =>    19,
            "20" =>    20,
            "21" =>    21,
            "22" =>    22,
            "23" =>    23,
            "24" =>    24,
            "25" =>    25,
            "26" =>    26,
            "27" =>    27,
            "28" =>    28,
            "29" =>    29,
            "30" =>    30,
            "31" =>    31,
            "32" =>    32,
            "33" =>    33,
            "34" =>    34,
            "35" =>    35,
            "36" =>    36,
        ];
        $daftar_komoditas = KomoditasNonMakanan::get();
        foreach ($daftar_komoditas as $index => $komoditas) {
            # code...
            $komoditas->nomor_urut = $new_nomor[$index+1];
            $komoditas->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
