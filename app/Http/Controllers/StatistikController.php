<?php

namespace App\Http\Controllers;

use App\Models\SusenasMak;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatistikController extends Controller
{
    public function index()
    {
        return Inertia::render("Provinsi/Statistik/index");
    }
    public function fetch($kode_kabkot) {
        if($kode_kabkot=="00")
        {
            $daftar_pengeluaran_perkapita = SusenasMak::where("status_dok","clean")
            ->where("r203","1")
            ->pluck("blokqc_5");

        } else {
            $daftar_pengeluaran_perkapita = SusenasMak::where("kode_kabkot",$kode_kabkot)
            ->where("status_dok","clean")
            ->where("r203","1")
            ->pluck("blokqc_5");

        }

        $data = [
            "pengeluaran_perkapita"=>$daftar_pengeluaran_perkapita
        
        ];
        return response()->json($data, 200);
    }
}
