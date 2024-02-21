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
    public function list_komoditas(Request $request)
    {
        try {
            //code...
            $from = $request->input('from');
            $to = $request->input('to');
            $data = Komoditas::where('id', '>=', $from)->where('id', '<=', $to)->get();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
