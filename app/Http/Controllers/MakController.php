<?php

namespace App\Http\Controllers;

use App\Models\Konsumsi;
use App\Models\SusenasMak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MakController extends Controller
{
    public function store(Request $request)
    {
        try {
            //code...
            $input = $request->all();
            SusenasMak::create($input);
            return response()->json($input, 201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function fetch(Request $request)
    {
        $kabkot = $request->query('kode_kabkot');
        $semester = $request->query('semester');
        $provinsi = $request->query('kode_prov');
        $nks = $request->query('nks');

        $query = SusenasMak::where('vsusenas_mak.kode_kabkot', $kabkot)->where('semester', $semester)
            ->join('master_wilayah', function ($join) {
                $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                    ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
                    ->on('master_wilayah.kode_kec', '=', 'vsusenas_mak.kode_kec')
                    ->on('master_wilayah.kode_desa', '=', 'vsusenas_mak.kode_desa');
            })
            ->select('vsusenas_mak.*', 'master_wilayah.kec', 'master_wilayah.desa', 'master_wilayah.klas')->distinct();

        $data = $query->get();
        return response()->json([
            'data' => $data, 'semester' => $semester,
            'kabkot' => $kabkot, 'provinsi' => $provinsi, 'nks' => $nks
        ]);
    }
    public function edit(Request $request)
    {
        $id = $request->query('id');


        // $data = Inti::where('kode_id', $id)->where('semester', $semester)->get();
        $data = SusenasMak::where('vsusenas_mak.id', $id)->join('master_wilayah', function ($join) {
            $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
                ->on('master_wilayah.kode_kec', '=', 'vsusenas_mak.kode_kec')
                ->on('master_wilayah.kode_desa', '=', 'vsusenas_mak.kode_desa');
        })
            ->select('vsusenas_mak.*', 'master_wilayah.kec', 'master_wilayah.desa', 'master_wilayah.klas')->distinct()->first();
        $data_komoditas = [];

        return Inertia::render("Entri/EditMak", ['data' => $data]);
    }
    public function update(Request $request)
    {
        try {
            //code...
            $data = $request->all();
            $data_update = SusenasMak::findOrFail($data['id']);
            $data_update->update($data);
            $data_update->save();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function konsumsi_store(Request $request)
    {
        try {
            $input = $request->all();
            $converted = [];
            $id_ruta = $input['id_ruta'];
            foreach ($input as $key => $value) {
                if ($key == "id_ruta") continue;

                $splitted = explode('_', $key);
                $nama_var = implode("_", [preg_replace("/[0-9]/", "", $splitted[2]), $splitted[1]]);
                $id_komoditas = $splitted[0];

                // Check if the id_komoditas already exists in $converted
                $existingIndex = array_search($id_komoditas, array_column($converted, 'id_komoditas'));

                if ($existingIndex !== false) {
                    // If exists, append data to the existing array
                    $converted[$existingIndex][$nama_var] = $value;
                } else {
                    // If doesn't exist, create a new array
                    $converted[] = [
                        'id_komoditas' => $id_komoditas,
                        $nama_var => $value,
                    ];
                }
            }


            // Reset array keys to start from 0
            $converted = array_values($converted);
            $baru = [];
            foreach ($converted as $item) {
                $item['id_ruta'] = $id_ruta;
                $baru[] = $item;
            }


            // Konsumsi::upsert($baru, ['id_komoditas', 'id_ruta']);
            return response()->json($baru, 201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
