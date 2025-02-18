<?php

namespace App\Http\Controllers;

use App\Models\AnggotaRuta;
use App\Models\KonsumsiArt;
use Illuminate\Http\Request;

class KonsumsiArtController extends Controller
{
    public function fetch(AnggotaRuta $id_art)
    {
        // $konsumsi_ruta = KonsumsiArt::where('id_art', $id_art)->join('komoditas', 'komoditas.id', 'konsumsi_art.id_komoditas')->select('konsumsi.*', 'komoditas.id_kelompok')->get();
        $konsumsi = $id_art->konsumsi()->with(["komoditas"])->get();
        return response()->json($konsumsi, 200);
    }
}
