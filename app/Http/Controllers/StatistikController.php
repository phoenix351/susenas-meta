<?php

namespace App\Http\Controllers;

use App\Models\Kabkot;
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
        $data_ruta = [];
        $data_anggota_ruta = [];
        $garis_kemiskinan_sementara = Kabkot::get();
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
        foreach ($data_ruta as  $ruta) {
            # code...
            $daftar_anggota_ruta = $ruta->anggota_ruta;
            foreach ($daftar_anggota_ruta as  $key=>$anggota_ruta) {
                # code...
                $anggota_ruta->pengeluaran_perkapita = $ruta->pengeluaran_perkapita;
                $anggota_ruta->kode_kabkot = $ruta->kode_kabkot;
                $anggota_ruta->nks = $ruta->nks;
                $anggota_ruta->nomor_sampel = $ruta->nomor_sampel;
                $anggota_ruta->nomor = $key+1;
                $data_anggota_ruta[] = $anggota_ruta;
            }
        }

        $data = [
            "pengeluaran_perkapita" => $daftar_pengeluaran_perkapita,
            "data_ruta" => $data_ruta,
            "data_anggota_ruta"=>$data_anggota_ruta,
            "garis_kemiskinan_sementara"=>$garis_kemiskinan_sementara

        ];
        return response()->json($data, 200);
    }
   
   
}
