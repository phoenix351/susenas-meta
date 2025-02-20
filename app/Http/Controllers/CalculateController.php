<?php

namespace App\Http\Controllers;

use App\Models\SusenasMak;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculateController extends Controller
{
    public function index()
    {

        $daftar_ruta = SusenasMak::whereIn('status_dok', ['clean', 'warning'])->pluck('id');
        // return response()->json(['daftar_ruta' => $daftar_ruta], 200);
        return Inertia::render('Calculate', ['data' => $daftar_ruta]);
    }
}
