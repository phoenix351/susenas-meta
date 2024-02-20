<?php

namespace App\Http\Controllers;

use App\Models\Komoditas;
use Illuminate\Http\Request;

class KomoditasController extends Controller
{
    public function fetch_kalori($id)
    {

        try {
            //code...
            $komoditas = Komoditas::where('id', $id)->value('kalori');
            return response()->json($komoditas, 200);
        } catch (\Throwable $th) {
            return response()->json([], 404);
        }
    }
}
