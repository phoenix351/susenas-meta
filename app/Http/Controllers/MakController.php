<?php

namespace App\Http\Controllers;

use App\Models\AnggotaRuta;
use App\Models\Kabkot;
use App\Models\Komoditas;
use App\Models\Konsumsi;
use App\Models\KonsumsiArt;
use App\Models\SusenasMak;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class MakController extends Controller
{
    public function store(Request $request)
    {
        try {
            //code...
            $input = $request->all();
            $created_mak = SusenasMak::create($input);
            return response()->json($created_mak, 201);
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

        $query = SusenasMak::where('vsusenas_mak.kode_kabkot', $kabkot)->where('semester', $semester)->where('vsusenas_mak.nks', $nks)
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
    public function konsumsi_art_fetch($id_art)
    {
        // $konsumsi_ruta = KonsumsiArt::where('id_art', $id_art)->join('komoditas', 'komoditas.id', 'konsumsi_art.id_komoditas')->select('konsumsi.*', 'komoditas.id_kelompok')->get();
        $data = KonsumsiArt::where('id_art', $id_art)->get();
        return response()->json($data, 200);
    }
    public function edit($id)
    {
        // $id = $request->query('id');


        // $data = Inti::where('kode_id', $id)->where('semester', $semester)->get();
        $data = SusenasMak::where('vsusenas_mak.id', $id)->join('master_wilayah', function ($join) {
            $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
                ->on('master_wilayah.kode_kec', '=', 'vsusenas_mak.kode_kec')
                ->on('master_wilayah.kode_desa', '=', 'vsusenas_mak.kode_desa');
        })
            ->select('vsusenas_mak.*', 'master_wilayah.kec', 'master_wilayah.desa', 'master_wilayah.klas')->distinct()->first();
        $konsumsi_ruta = Konsumsi::where('id_ruta', $id)->join('komoditas', 'komoditas.id', 'konsumsi.id_komoditas')->select('konsumsi.*', 'komoditas.id_kelompok')->get();
        $garis_kemiskinan = Kabkot::where('kode', $data->kode_kabkot)->pluck('garis_kemiskinan');
        $art = AnggotaRuta::where('id_ruta', $id)->get();
        // $konsumsi_ruta = DB::table('konsumsi')->where('id_ruta', $id)->get();

        // dd($konsumsi_ruta);
        return Inertia::render("Entri/EditMak", ['data' => $data, 'konsumsi_ruta' => $konsumsi_ruta, 'art' => $art, 'garis_kemiskinan' => $garis_kemiskinan]);
    }
    public function update(Request $request)
    {
        try {
            //code...
            $data = $request->all();
            $data_update = SusenasMak::findOrFail($data['id']);
            $data_update->update($data);
            $data_update->save();
            // update konsumsi art rekap
            $rekap_art = [];
            foreach ($data as $key => $value) {
                # code...
                if (Str::contains($key, 'jumlah')) {
                    continue;
                }
                if (strlen($key) > 13 && Str::startsWith($key, 'blok4_31_')) {

                    $nama_var = substr($key, 11);
                    $nomor_art = explode("_", $key)[2];
                    $existingIndex = array_search($nomor_art, array_column($rekap_art, 'nomor_art'));
                    if ($nama_var == "id_art") {
                        $nama_var = "id";
                    }
                    if ($existingIndex !== false) {
                        // If exists, append data to the existing array
                        $rekap_art[$existingIndex][$nama_var] = $value;
                    } else {
                        // If doesn't exist, create a new array

                        $rekap_art[] = [
                            'nomor_art' => $nomor_art,
                            $nama_var => $value,
                        ];
                    }
                }
            }
            foreach ($rekap_art as $key => $value) {
                # code...
                AnggotaRuta::where('id', $value['id'])->update($value);
            }
            SusenasMak::where('id', $data['id'])->update(['updated_at' => Date::now()]);

            return response()->json($rekap_art, 200);
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

                $splitted = explode('_', $key);
                if ($key == "id_ruta") continue;
                if (sizeof($splitted) == 2) {
                    $nama_var = $splitted[1];
                } else {
                    $nama_var = implode("_", [preg_replace("/[0-9]/", "", $splitted[2]), $splitted[1]]);
                }
                $id_komoditas = preg_replace("/[a-z]/", "", $splitted[0]);

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
                $item['satuan'] = isset($item['satuan']) ? $item['satuan'] : '';
                $item['item'] = isset($item['item']) ? $item['item'] : '';
                $item['volume_beli'] = isset($item['volume_beli']) ? $item['volume_beli'] : 0;
                $item['volume_produksi'] = isset($item['volume_produksi']) ? $item['volume_produksi'] : 0;
                $item['volume_total'] = isset($item['volume_total']) ? $item['volume_total'] : 0;
                $item['harga_beli'] = isset($item['harga_beli']) ? $item['harga_beli'] : 0;
                $item['harga_produksi'] = isset($item['harga_produksi']) ? $item['harga_produksi'] : 0;
                $item['harga_total'] = isset($item['harga_total']) ? $item['harga_total'] : 0;
                // $baru[] = $item;
                $baru[] = $item;
            }

            Konsumsi::upsert($baru, ['id_komoditas', 'id_ruta']);
            SusenasMak::where('id', $id_ruta)->update(['updated_at' => Date::now()]);
            // 
            return response()->json($baru, 201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function konsumsi_art_store(Request $request)
    {
        try {
            $input = $request->all();
            $converted = [];
            $id_ruta = $input['id_ruta'];
            $id_art = $input['id_art'];
            foreach ($input as $key => $value) {

                $splitted = explode('_', $key);
                if ($key == "id_ruta" || $key == "id_art") continue;
                if (sizeof($splitted) == 2) {
                    $nama_var = $splitted[1];
                } else {
                    $nama_var = implode("_", [preg_replace("/[0-9]/", "", $splitted[2]), $splitted[1]]);
                }
                $id_komoditas = preg_replace("/[a-z]/", "", $splitted[0]);

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
                // $item['id_ruta'] = $id_ruta;
                $item['id_art'] = $id_art;
                $item['satuan'] = isset($item['satuan']) ? $item['satuan'] : '';
                $item['item'] = isset($item['item']) ? $item['item'] : '';
                $item['volume_beli'] = isset($item['volume_beli']) ? $item['volume_beli'] : 0;
                $item['volume_produksi'] = isset($item['volume_produksi']) ? $item['volume_produksi'] : 0;
                $item['volume_total'] = isset($item['volume_total']) ? $item['volume_total'] : 0;
                $item['harga_beli'] = isset($item['harga_beli']) ? $item['harga_beli'] : 0;
                $item['harga_produksi'] = isset($item['harga_produksi']) ? $item['harga_produksi'] : 0;
                $item['harga_total'] = isset($item['harga_total']) ? $item['harga_total'] : 0;
                // $baru[] = $item;
                $baru[] = $item;
            }

            KonsumsiArt::upsert($baru, 'id');
            SusenasMak::where('id', $id_ruta)->update(['updated_at' => Date::now()]);
            // 
            return response()->json($baru, 201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function create()
    {
        // $data = Inti::where('kode_kabkot', $kabkot)->where('semester', $semester)->get();
        return Inertia::render("Entri/CreateMak");
    }
    public function calculate_qc($id_ruta)
    {
        try {
            //code...
            // get all konsumsi
            $kalori_total = 0;

            $konsumsi_ruta = Konsumsi::where('id_ruta', $id_ruta)->get(['id_komoditas', 'volume_beli', 'volume_produksi']);
            $konsumsi_art = KonsumsiArt::where('anggota_ruta.id_ruta', $id_ruta)
                ->join('anggota_ruta', 'anggota_ruta.id', 'konsumsi_art.id_art')
                ->get(['id_komoditas', 'volume_beli', 'volume_produksi']);
            foreach ($konsumsi_ruta as $key => $value) {
                # code...
                // ambil kalori dari tabel 
                $kalori = Komoditas::where('id', $value['id_komoditas'])->value('kalori');
                $kalori_total += $kalori * ($value['volume_beli'] + $value['volume_produksi']);
            }
            foreach ($konsumsi_art as $key => $value) {
                # code...
                // ambil kalori dari tabel 
                $kalori = Komoditas::where('id', $value['id_komoditas'])->value('kalori');
                $kalori_total += $kalori * ($value['volume_beli'] + $value['volume_produksi']);
            }
            $data = [
                'konsumsi_ruta' => $konsumsi_ruta,
                'konsumsi_art' => $konsumsi_art,
                'kalori_total' => $kalori_total,
                'id_ruta' => $id_ruta,
            ];
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            throw $th;

            // return response()->json(['id_ruta' => $id_ruta,], 404);
        }
    }
}
