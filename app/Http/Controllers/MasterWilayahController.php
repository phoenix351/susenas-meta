<?php

namespace App\Http\Controllers;

use App\Models\MasterWilayah;
use Illuminate\Http\Request;

class MasterWilayahController extends Controller
{
    public function fetch_desa(Request $request)
    {

        $kode_kabkot = $request->query('kodeKabkot');
        $kode_kec = $request->query('kodeKec');
        // $semester = $request->query('semester');

        $data = MasterWilayah::where('kode_kabkot', $kode_kabkot)->where('kode_kec', $kode_kec)->distinct()->get(['kode_desa', 'desa']);
        return response()->json($data, 200);
    }
    public function fetch_bs4(Request $request)
    {

        $kode_kabkot = $request->query('kodeKabkot');
        $kode_kec = $request->query('kodeKec');
        $kode_desa = $request->query('kodeDesa');
        // $semester = $request->query('semester');

        $data = MasterWilayah::where('kode_kabkot', $kode_kabkot)->where('kode_kec', $kode_kec)->where('kode_desa', $kode_desa)->distinct()->pluck('kode_bs4');
        return response()->json($data, 200);
    }
    public function fetch_nks(Request $request)
    {

        $kode_kabkot = $request->query('kodeKabkot');
        $kode_kec = $request->query('kodeKec');
        $kode_desa = $request->query('kodeDesa');
        $kode_bs4 = $request->query('kodeBs4');
        // $semester = $request->query('semester');

        if (strlen($kode_kec) < 1) {
            $data = MasterWilayah::where('kode_kabkot', $kode_kabkot)->distinct()->pluck('nks');
        } else {
            $data = MasterWilayah::where('kode_kabkot', $kode_kabkot)->where('kode_kec', $kode_kec)->where('kode_desa', $kode_desa)->where('kode_bs4', $kode_bs4)->distinct()->pluck('nks');
        }
        return response()->json($data, 200);
    }
    public function fetch_kabkot(Request $request)
    {
        $kode_kabkot = $request->input('kode_kabkot');
        $data = MasterWilayah::distinct()->get(['kode_kabkot', 'kabkot']);
        if ($kode_kabkot !== "00") {
            $data = MasterWilayah::where('kode_kabkot', $kode_kabkot)->distinct()->get(['kode_kabkot', 'kabkot']);
        }
        // return response()->json($kode_kabkot, 200);
        $user = auth()->user();

        return response()->json(['data' => $data, 'kode_kabkot' => $user->kode_kabkot]);
    }
}
