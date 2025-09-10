<?php

use App\Models\Kabkot;
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
        // return;
        Schema::table('kabkot', function (Blueprint $table) {
            $table->integer("garis_kemiskinan_sementara")->default(0);
        });
        $daftar_inflasi = [
            ["kode_kabkot" => "00", "inflasi" => 0.15],
            ["kode_kabkot" => "01", "inflasi" => 0],
            ["kode_kabkot" => "02", "inflasi" => 0],
            ["kode_kabkot" => "03", "inflasi" => 0],
            ["kode_kabkot" => "04", "inflasi" => 0],
            ["kode_kabkot" => "05", "inflasi" => 0],
            ["kode_kabkot" => "06", "inflasi" => 0],
            ["kode_kabkot" => "07", "inflasi" => 0],
            ["kode_kabkot" => "08", "inflasi" => 0],
            ["kode_kabkot" => "09", "inflasi" => 0],
            ["kode_kabkot" => "10", "inflasi" => 0],
            ["kode_kabkot" => "11", "inflasi" => 0],
            ["kode_kabkot" => "71", "inflasi" => 0],
            ["kode_kabkot" => "72", "inflasi" => 0],
            ["kode_kabkot" => "73", "inflasi" => 0],
            ["kode_kabkot" => "74", "inflasi" => 0],

        ];
        // DB::beginTransaction();
        foreach ($daftar_inflasi as  $inflasi) {
            # code...
            $kabkot = Kabkot::where("kode", $inflasi["kode_kabkot"])->first();
            $garis_kemiskinan_sementara = $kabkot->garis_kemiskinan * (1 + $inflasi["inflasi"]);
            $kabkot->garis_kemiskinan_sementara = $garis_kemiskinan_sementara;
            $kabkot->save();
        }
        // dd([$kabkot, $garis_kemiskinan_sementara]);
        // DB::commit();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
