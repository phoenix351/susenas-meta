<?php

namespace App\Http\Controllers;

use App\Models\AnggotaRuta;
use App\Models\SusenasMak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PeriksaController extends Controller
{
    public function index()
    {
        $kode_kabkot = auth()->user()->kode_kabkot;

        // $data = SusenasMak::join('anggota_ruta', 'vsusenas_mak.id', '=', 'anggota_ruta.id_ruta')
        //     ->groupBy('vsusenas_mak.kode_kabkot', 'vsusenas_mak.nks', 'vsusenas_mak.r109')
        //     ->select(
        //         'vsusenas_mak.kode_kabkot',
        //         'vsusenas_mak.nks',
        //         'vsusenas_mak.r109',
        //         DB::raw('count(anggota_ruta.id) as jumlah_art'),
        //         DB::raw('MAX(vsusenas_mak.blok4_32_15_total) as blok4_32_15_total'),
        //         DB::raw('MAX(vsusenas_mak.blok4_32_16_total) as blok4_32_16_total'),
        //         DB::raw('SUM(vsusenas_mak.blokqc_1 + vsusenas_mak.blokqc_2) as blokqc_sum'),
        //         DB::raw('MAX(vsusenas_mak.blokqc_3) as blokqc_3')
        //     )
        //     ->when(isset($kode_kabkot) && $kode_kabkot !== "00", function ($query) use ($kode_kabkot) {
        //         $query->where('vsusenas_mak.kode_kabkot', $kode_kabkot);
        //     })
        //     ->get();
        $data = SusenasMak::joinSub(function ($join) {
            $join->from('anggota_ruta')
                ->groupBy('anggota_ruta.id_ruta')
                ->select('anggota_ruta.id_ruta', DB::raw('count(anggota_ruta.id) as jumlah_art'));
        }, 'anggota_ruta_counts', 'anggota_ruta_counts.id_ruta', '=', 'vsusenas_mak.id')
            ->groupBy('vsusenas_mak.kode_kabkot', 'vsusenas_mak.nks', 'vsusenas_mak.r109')
            ->select(
                'vsusenas_mak.kode_kabkot',
                'vsusenas_mak.nks',
                'vsusenas_mak.r109',
                DB::raw('COALESCE(SUM(vsusenas_mak.blok4_32_15_total), 0) as blok4_32_15_total'),
                DB::raw('COALESCE(SUM(vsusenas_mak.blok4_32_16_total), 0) as blok4_32_16_total'),
                DB::raw('COALESCE(SUM(vsusenas_mak.blokqc_1 + vsusenas_mak.blokqc_2), 0) as blokqc_sum'),
                DB::raw('COALESCE(MAX(vsusenas_mak.blokqc_3), 0) as blokqc_3'),
                DB::raw('COALESCE(MAX(anggota_ruta_counts.jumlah_art), 0) as jumlah_art')
            )
            ->when(isset($kode_kabkot) && $kode_kabkot !== "00", function ($query) use ($kode_kabkot) {
                $query->where('vsusenas_mak.kode_kabkot', $kode_kabkot);
            })
            ->get();
        return Inertia::render('Periksa', ['data' => $data]);
    }
}