<?php

use App\Models\Komoditas;
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
            $table->integer("nomor_urut")->default(0);
        });
        $daftar_komoditas = Komoditas::all();
        foreach ($daftar_komoditas as $komoditas) {
            # code...
            $komoditas->nomor_urut = $komoditas->id;
            $komoditas->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('komoditas', function (Blueprint $table) {
            $table->dropColumn("komoditas");
        });
    }
};