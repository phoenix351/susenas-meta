<?php

namespace App\Http\Controllers;

use App\Models\AnggotaRuta;
use App\Models\KonsumsiArt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnggotaRutaController extends Controller
{
    public function store(Request $request)
    {
        try {
            //code...
            $data = $request->all();
            DB::beginTransaction();
            $new_ruta = AnggotaRuta::create($data);
            $data['id'] = $new_ruta->id;

            DB::commit();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json(['error' => 'Error processing data'], 500);
        }
    }
    public function fetch(Request $request)
    {
        $data_received = $request->all();
        $data = AnggotaRuta::where('id_ruta', $data_received['id_ruta'])->get();

        return response()->json($data, 200);
    }
    public function update(Request $request)
    {
        try {
            //code...
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
            DB::beginTransaction();
            foreach ($converted as $item) {
                if (!isset($item['id_art'])) {
                    continue;
                }
                $new_item = [];
                $new_item['id_ruta'] = $data_received['id_ruta'];
                // $new_item['id'] = isset($item['id_art']) ? $item['id_art'] : null;
                // $new_item['nomor_art'] = isset($item['nomor_art']) ? $item['nomor_art'] : '';
                $new_item['nama'] = isset($item['nama']) ? $item['nama'] : 0;
                $new_item['id_art'] = $item['id_art'];
                // $baru[] = $item;
                $baru[] = $new_item;
                $art = AnggotaRuta::where('id', $new_item['id_art']);
                unset($new_item['id_art']);
                $art->update($new_item);
            }
            DB::commit();

            return response()->json($baru, 201);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollback();
            return response()->json(['error' => 'Error processing data'], 500);
        }
    }
    public function delete($id_art)
    {
        try {
            //delete konsumsi art
            $konsumsi_art = KonsumsiArt::where('id_art', $id_art);
            $konsumsi_art->delete();
            // delete instance anggota ruta
            DB::beginTransaction();
            $art = AnggotaRuta::where('id', $id_art);
            $art->delete();
            DB::commit();
            $data_deleted = [
                'konsumsi_art' => $konsumsi_art,
                'art' => $art
            ];

            return response()->json($data_deleted, 204);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json(['error' => 'Error processing data'], 500);
        }
    }
}
