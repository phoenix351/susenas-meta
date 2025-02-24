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
    public function fetch_pengeluaran_perkapita($kode_kabkot)
    {
        if ($kode_kabkot == "00") {
            $daftar_pengeluaran_perkapita = SusenasMak::where("status_dok", "clean")
                ->where("r203", "1")
                ->pluck("blokqc_5");

            $data_ruta = SusenasMak::select("id", "wtf_1 as jumlah_art", "blokqc_5 as pengeluaran_perkapita", "kode_kabkot", "nks", "r109 as nomor_sampel", "r110 as nama_krt")
                ->where("status_dok", "clean")
                ->where("r203", "1")
                ->get();
        } else {
            $daftar_pengeluaran_perkapita = SusenasMak::where("kode_kabkot", $kode_kabkot)
                ->where("status_dok", "clean")
                ->where("r203", "1")
                ->pluck("blokqc_5");
            $data_ruta = SusenasMak::select("id", "wtf_1 as jumlah_art", "blokqc_5 as pengeluaran_perkapita", "kode_kabkot", "nks", "r109 as nomor_sampel", "r110 as nama_krt")
                ->where("kode_kabkot", $kode_kabkot)
                ->where("status_dok", "clean")
                ->where("r203", "1")
                ->get();
        }

        $data = [
            "pengeluaran_perkapita" => $daftar_pengeluaran_perkapita,
            "data_ruta" => $data_ruta

        ];
        return response()->json($data, 200);
    }
}
