<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::transaction(function () {
            DB::table('komoditas_non_makanan')
                ->where('nama_komoditas', 'like', '%Air (R.235)%')
                ->update(['nama_komoditas' => 'Air (R.236)']);

            DB::table('komoditas_non_makanan')
                ->where('nama_komoditas', 'like', '%Perawatan kulit, muka, kuku, tambut (R.271)%')
                ->update(['nama_komoditas' => 'Perawatan kulit, muka, kuku, rambut (R.271)']);



            // Shift nomor_urut up by 1 for >= 5
            DB::table('komoditas_non_makanan')
                ->where('nomor_urut', '>=', 5)
                ->update(['nomor_urut' => DB::raw('nomor_urut + 1')]);

            // Insert new row at 5 (add timestamps if required)
            DB::table('komoditas_non_makanan')->insert([
                [
                    'nama_komoditas' => 'LPG (R.253)',
                    'nomor_urut'     => 5,
                    // 'created_at'   => now(),
                    // 'updated_at'   => now(),
                ],
            ]);
        });
    }

    public function down(): void
    {
        DB::transaction(function () {
            // Revert text changes
            DB::table('komoditas_non_makanan')
                ->where('nama_komoditas', 'like', '%Air (R.236)%')
                ->update(['nama_komoditas' => 'Air (R.235)']);

            DB::table('komoditas_non_makanan')
                ->where('nama_komoditas', 'like', '%Perawatan kulit, muka, kuku, rambut (R.271)%')
                ->update(['nama_komoditas' => 'Perawatan kulit, muka, kuku, tambut (R.271)']);



            // Remove the inserted row at nomor_urut = 5 (be precise if possible)
            DB::table('komoditas_non_makanan')
                ->where('nama_komoditas', 'LPG (R.253)')
                ->where('nomor_urut', 5)
                ->delete();

            // Shift nomor_urut back down by 1 for rows currently >= 6
            DB::table('komoditas_non_makanan')
                ->where('nomor_urut', '>=', 6)
                ->update(['nomor_urut' => DB::raw('nomor_urut - 1')]);
        });
    }
};
