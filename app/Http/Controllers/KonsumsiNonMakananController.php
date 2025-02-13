<?php

namespace App\Http\Controllers;

use App\Http\Requests\KonsumsiNonMakanan\StoreRequest;
use App\Models\KonsumsiNonMakanan;

class KonsumsiNonMakananController extends Controller
{
    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();
        try {
            //code...
            KonsumsiNonMakanan::upsert($validatedData, ["id_ruta", "id_komoditas"], ["harga"]);
            return response()->json(["status" => "Berhasil menyimpan data"], 200);
        } catch (\Throwable $th) {
            return response()->json(["status" => "Gagal menyimpan data"], 422);
            //throw $th;
        }
    }
    public function sum_konsumsi_by_ruta($id_ruta)
    {
        return KonsumsiNonMakanan::where("id_ruta",$id_ruta)->sum("harga");
    }
}
