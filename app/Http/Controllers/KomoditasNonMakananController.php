<?php

namespace App\Http\Controllers;

use App\Models\KomoditasNonMakanan;
use App\Models\KonsumsiNonMakanan;
use Illuminate\Http\Request;

class KomoditasNonMakananController extends Controller
{
    public function list()
    {
        $daftar_komoditas = KomoditasNonMakanan::orderBy("nomor_urut")->get();
        return response()->json($daftar_komoditas, 200);
    }
    public function fetch($id_ruta)
    {
        $data_non_makanan = KonsumsiNonMakanan::with(["komoditas"])
        ->where("id_ruta", $id_ruta)
        ->get();
        return response()->json($data_non_makanan, 200);
    }
}
