<?php

namespace App\Http\Controllers;

use App\Models\SusenasMak;
use Illuminate\Http\Request;

class KonsumsiMakananController extends Controller
{
    public function fetch_konsumsi_ruta(SusenasMak $ruta){
        $konsumsi = $ruta->konsumsi_ruta()->with(["komoditas"])->get();
        return response()->json($konsumsi, 200,);
    }
}
