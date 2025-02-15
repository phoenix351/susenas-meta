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
        $daftar_konsumsi_tahunan = [6, 7, 12, 13, 15,];
        $daftar_konsumsi = KonsumsiNonMakanan::where("id_ruta", $id_ruta)
            ->get();
        $total_harga = 0;
        foreach ($daftar_konsumsi as  $konsumsi) {
            # code...
            if (in_array($konsumsi->id_komoditas, $daftar_konsumsi_tahunan) || $konsumsi->id_komoditas >= 17) {
                $konsumsi->harga = $konsumsi->harga / 12;
            }
            $total_harga += $konsumsi->harga;
        }
        // $total_harga = number_format($total_harga, 2);
        // dd(["before" => KonsumsiNonMakanan::where("id_ruta", $id_ruta)->sum("harga"), "after" => $total_harga]);
        // return KonsumsiNonMakanan::where("id_ruta", $id_ruta)->sum("harga");
        return $total_harga;
    }
}
