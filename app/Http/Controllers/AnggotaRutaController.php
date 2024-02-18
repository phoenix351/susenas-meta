<?php

namespace App\Http\Controllers;

use App\Models\AnggotaRuta;
use Illuminate\Http\Request;

class AnggotaRutaController extends Controller
{
    public function store(Request $request)
    {
        $data_received = $request->all();
        $converted = [];
        foreach ($data_received as $key => $value) {
            $splitted = explode('-', $key);
            if ($key == "id_ruta") continue;
            $nama_var = $splitted[1];
            $nomor_art = $splitted[0];

            // Check if the id_komoditas already exists in $converted
            $existingIndex = array_search($nomor_art, array_column($converted, 'nomor_art'));

            if ($existingIndex !== false) {
                // If exists, append data to the existing array
                $converted[$existingIndex][$nama_var] = $value;
            } else {
                // If doesn't exist, create a new array
                $converted[] = [
                    'nomor_art' => $nomor_art,
                    $nama_var => $value,
                ];
            }
        }
        $converted = array_values($converted);
        $baru = [];
        foreach ($converted as $item) {
            $new_item = [];
            $new_item['id_ruta'] = $data_received['id_ruta'];
            // $new_item['id'] = isset($item['id_art']) ? $item['id_art'] : null;
            $new_item['nomor_art'] = isset($item['nomor_art']) ? $item['nomor_art'] : '';
            $new_item['nama'] = isset($item['nama']) ? $item['nama'] : 0;
            // $baru[] = $item;
            $baru[] = $new_item;
        }
        AnggotaRuta::upsert($baru, 'id');

        return response()->json($baru, 201);
    }
}
