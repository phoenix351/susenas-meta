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
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MakController extends Controller
{
    public function entri(Request $request)
    {

        try {
            //code...
            $kabkot = $request->kode_kabkot;
            $nks = $request->nks;
            $data = SusenasMak::where('vsusenas_mak.kode_kabkot', $kabkot)->where('vsusenas_mak.nks', $nks)
                ->join('master_wilayah', function ($join) {
                    $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                        ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
                        ->on('master_wilayah.kode_kec', '=', 'vsusenas_mak.kode_kec')
                        ->on('master_wilayah.kode_desa', '=', 'vsusenas_mak.kode_desa');
                })
                ->select('vsusenas_mak.*', 'master_wilayah.kec', 'master_wilayah.desa', 'master_wilayah.klas')->distinct()->get();

            //  return response()->json($data, 200);
            return Inertia::render('Entri/Inti', ['data_susenas' => $data, 'kode_kabkot' => $kabkot, 'nks' => $nks]);
        } catch (\Throwable $th) {
            //throw $th;
        }

        return Inertia::render('Entri/Inti');
    }
    public function dashboard()
    {
        // $rekap = SusenasMak::select(
        //     'vsusenas_mak.kode_prov',
        //     'vsusenas_mak.kode_kabkot',
        //     'vsusenas_mak.kode_kec',
        //     'vsusenas_mak.kode_desa',
        //     'vsusenas_mak.kode_bs4',
        //     'master_wilayah.kec',
        //     'master_wilayah.kabkot',
        //     'master_wilayah.desa',
        //     'master_wilayah.klas'
        // )
        //     ->join('master_wilayah', function ($join) {
        //         $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
        //             ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
        //             ->on('master_wilayah.kode_kec', '=', 'vsusenas_mak.kode_kec')
        //             ->on('master_wilayah.kode_desa', '=', 'vsusenas_mak.kode_desa');
        //     })
        //     ->where('vsusenas_mak.kode_kabkot', '01')
        //     ->groupBy(
        //         'vsusenas_mak.kode_prov',
        //         'vsusenas_mak.kode_kabkot',
        //         'vsusenas_mak.kode_kec',
        //         'vsusenas_mak.kode_desa',
        //         'vsusenas_mak.kode_bs4',
        //         'master_wilayah.kec',
        //         'master_wilayah.kabkot',
        //         'master_wilayah.desa',
        //         'master_wilayah.klas'
        //     )
        //     ->selectRaw('count(distinct vsusenas_mak.id) as jumlah_dok')
        //     ->get();
        $kode_kabkot = auth()->user()->kode_kabkot;


        $rekap = DB::table('master_wilayah')
            ->select(
                'master_wilayah.kode_prov',
                'master_wilayah.kode_kabkot',
                'master_wilayah.kode_kec',
                'master_wilayah.kode_desa',
                'master_wilayah.kode_bs4',
                'master_wilayah.kec',
                'master_wilayah.kabkot',
                'master_wilayah.desa',
                'master_wilayah.klas',
                DB::raw('COALESCE(COUNT(DISTINCT vsusenas_mak.id), 0) as jumlah_dok')
            )
            ->leftJoin('vsusenas_mak', function ($join) {
                $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                    ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
                    ->on('master_wilayah.kode_kec', '=', 'vsusenas_mak.kode_kec')
                    ->on('master_wilayah.kode_desa', '=', 'vsusenas_mak.kode_desa')
                    ->on('master_wilayah.kode_bs4', '=', 'vsusenas_mak.kode_bs4');
            })
            ->groupBy(
                'master_wilayah.kode_prov',
                'master_wilayah.kode_kabkot',
                'master_wilayah.kode_kec',
                'master_wilayah.kode_desa',
                'master_wilayah.kode_bs4',
                'master_wilayah.kec',
                'master_wilayah.kabkot',
                'master_wilayah.desa',
                'master_wilayah.klas'
            )
            // ->where('master_wilayah.kode_kabkot', $kode_kabkot)
            ->when($kode_kabkot !== "00", function ($query) use ($kode_kabkot) {
                $query->where('master_wilayah.kode_kabkot', $kode_kabkot);
            })
            ->get();

        $data = ['data' => $rekap];

        // $kondisi_total = 100;
        return Inertia::render('Dashboard', $data);
    }
    public function store(Request $request)
    {
        try {
            //code...
            $input = $request->all();
            $input['users_id'] = auth()->user()->id;
            // create mak
            $created_mak = SusenasMak::create($input);
            // create default art
            $art = AnggotaRuta::create([
                'id_ruta' => $created_mak->id,
                'nama' => 'art default',
                'nomor_art' => 0,
            ]);

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
        $data = KonsumsiArt::where('id_art', $id_art)->join('komoditas', 'komoditas.id', 'konsumsi_art.id_komoditas')->select('konsumsi_art.*', 'komoditas.id_kelompok')->get();
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
            // $data = $request->all();
            // // cek nilai wtf
            // $currentWtf = SusenasMak::where('id', $data['id'])->first([
            //     'wtf_3c1',
            //     'wtf_5c1',
            //     'wtf_6c1',
            //     'wtf_8c1',
            //     'wtf_14c1',
            //     'wtf_15c1',
            //     'wtf_16c1',
            //     'wtf_16c2',
            //     'wtf_16c3',
            //     'wtf_23c1',
            // ]);

            // // if nilai == 5 set dependency into null 
            // if (isset($currentWtf['wtf_3c1']) && $data['wtf_3'] == "5") {
            //     $data['wtf_3c1'] = null;
            // }
            // if (isset($currentWtf['wtf_5c1']) && $data['wtf_5'] == "5") {
            //     $data['wtf_5c1'] = null;
            // }
            // if (isset($currentWtf['wtf_6c1']) && $data['wtf_6'] == "5") {
            //     $data['wtf_6c1'] = null;
            // }
            // if (isset($currentWtf['wtf_8c1']) && $data['wtf_8'] == "5") {
            //     $data['wtf_8c1'] = null;
            // }
            // if (isset($currentWtf['wtf_14c1']) && $data['wtf_14'] == "5") {
            //     $data['wtf_14c1'] = null;
            // }
            // if (isset($currentWtf['wtf_15c1']) && $data['wtf_15'] != "1") {
            //     $data['wtf_15c1'] = null;
            // }
            // if (isset($currentWtf['wtf_16c1']) && ($data['wtf_16'] != "1" && $data['wtf_16'] != "3")) {
            //     $data['wtf_16c1'] = null;
            // }
            // if (isset($currentWtf['wtf_16c2']) && $data['wtf_16'] != "2") {
            //     $data['wtf_16c2'] = null;
            // }
            // if (isset($currentWtf['wtf_16c3']) && ($data['wtf_16'] != "5" && $data['wtf_16'] != "4")) {
            //     $data['wtf_16c3'] = null;
            // }
            // if (isset($currentWtf['wtf_23c1']) && $data['wtf_23'] == "5") {
            //     $data['wtf_23c1'] = null;
            // }
            $data = $request->all();

            // Columns to check and their corresponding form fields
            $columnsToCheck = [
                'wtf_3' => 'wtf_3c1',
                'wtf_5' => 'wtf_5c1',
                'wtf_6' => 'wtf_6c1',
                'wtf_8' => 'wtf_8c1',
                'wtf_14' => 'wtf_14c1',
                'wtf_15' => 'wtf_15c1',
                'wtf_16' => 'wtf_16c1',
                'wtf_16' => 'wtf_16c2',
                'wtf_16' => 'wtf_16c3',
                'wtf_23' => 'wtf_23c1',
                'wtf_24' => 'wtf_24c1',
            ];

            $currentWtf = SusenasMak::where('id', $data['id'])->first($columnsToCheck);

            foreach ($columnsToCheck as $inputField => $dependentField) {
                try {
                    //code...
                    if (isset($currentWtf[$dependentField]) && $data[$inputField] == "5") {
                        $data[$dependentField] = null;
                    }
                } catch (\Throwable $th) {
                    //throw $th;
                }
                continue;
            }

            // Continue with the rest of your code...


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
                $id = $value['id'];
                $current = $value;
                unset($current['id']);
                unset($current['nomor_art']);


                AnggotaRuta::where('id', $value['id'])->update($current);
            }
            SusenasMak::where('id', $data['id'])->update(['updated_at' => Date::now()]);

            return response()->json($data, 200);
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
                if (strpos($key, "komoditas")) continue;
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
            $newMak = [
                'hal10_jml_komoditas' => isset($input['hal10_jml_komoditas']) ? $input['hal10_jml_komoditas'] : null,
                'hal8_jml_komoditas' => isset($input['hal8_jml_komoditas']) ? $input['hal8_jml_komoditas'] : null,
                'hal6_jml_komoditas' => isset($input['hal6_jml_komoditas']) ? $input['hal6_jml_komoditas'] : null,
                'hal4_jml_komoditas' => isset($input['hal4_jml_komoditas']) ? $input['hal4_jml_komoditas'] : null,
                'hal2_jml_komoditas' => isset($input['hal2_jml_komoditas']) ? $input['hal2_jml_komoditas'] : null,
                'updated_at' => Date::now()
            ];
            SusenasMak::where('id', $id_ruta)->update($newMak);
            // 
            return response()->json($newMak, 201);
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
            $komoditas_basket = Komoditas::where('flag_basket', 1)->pluck('id');
            $kalori_total = 0;
            $kalori_basket = 0;
            $pengeluaran = 0;



            $konsumsi_ruta = Konsumsi::where('id_ruta', $id_ruta)->where(function ($query) {
                $query->where('volume_beli', '>', '0')
                    ->orWhere('volume_produksi', '>', '0');
            })->get(['id_komoditas', 'volume_beli', 'volume_produksi', 'harga_beli', 'harga_produksi']);

            $konsumsi_art = KonsumsiArt::where('anggota_ruta.id_ruta', $id_ruta)
                ->join('anggota_ruta', 'anggota_ruta.id', 'konsumsi_art.id_art')
                ->where(function ($query) {
                    $query->where('volume_beli', '>', '0')
                        ->orWhere('volume_produksi', '>', '0');
                })
                ->get(['id_komoditas', 'volume_beli', 'volume_produksi', 'harga_beli', 'harga_produksi']);
            foreach ($konsumsi_ruta as $key => $value) {
                # code...
                // ambil kalori dari tabel 
                $kalori = Komoditas::where('id', $value['id_komoditas'])->value('kalori');
                $kalori_total += $kalori * ($value['volume_beli'] + $value['volume_produksi']);
                $pengeluaran += ($value['harga_beli'] + $value['harga_produksi']);

                $is_basket = $komoditas_basket->contains($value['id_komoditas']);
                if ($is_basket) {
                    $kalori_basket += $kalori;
                }
            }
            foreach ($konsumsi_art as $key => $value) {
                # code...
                // ambil kalori dari tabel 
                $kalori = Komoditas::where('id', $value['id_komoditas'])->value('kalori');
                $kalori_total += $kalori * ($value['volume_beli'] + $value['volume_produksi']);
                $is_basket = $komoditas_basket->contains($value['id_komoditas']);
                $pengeluaran += ($value['harga_beli'] + $value['harga_produksi']);

                if ($is_basket) {
                    $kalori_basket += $kalori;
                }
            }
            $data = [
                // 'konsumsi_ruta' => $konsumsi_ruta,
                // 'konsumsi_art' => $konsumsi_art,
                'kalori_total' => $kalori_total,
                'kalori_basket' => $kalori_basket,
                'pengeluaran' => $pengeluaran,
                'jumlah_komoditas_bahan_makanan' => sizeof($konsumsi_ruta),
                'jumlah_komoditas_makanan_jadi_rokok' => sizeof($konsumsi_art),
                'id_ruta' => $id_ruta,
            ];
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            throw $th;

            // return response()->json(['id_ruta' => $id_ruta,], 404);
        }
    }

    public function revalidasi($id_ruta)
    {
        try {
            //code...
            // evaluasi Range harga
            $evaluasi_rh = [];
            // evaluasi basket komoditas kemiskinan
            $evaluasi_basket = [];


            $komoditas_basket = Komoditas::where('flag_basket', 1)->pluck('id')->toArray();



            $kode_kabkot = SusenasMak::where('id', $id_ruta)->value('kode_kabkot');


            $konsumsi_ruta = Konsumsi::where('id_ruta', $id_ruta)->where(function ($query) {
                $query->where('harga_beli', '>', '0')
                    ->orWhere('harga_produksi', '>', '0');
            })
                ->join('komoditas', 'komoditas.id', 'konsumsi.id_komoditas')
                ->get(['konsumsi.id_komoditas', 'harga_beli', 'harga_produksi', 'volume_beli', 'volume_produksi', 'nama_komoditas']);

            $konsumsi_art = KonsumsiArt::where('anggota_ruta.id_ruta', $id_ruta)
                ->join('anggota_ruta', 'anggota_ruta.id', 'konsumsi_art.id_art')
                ->where(function ($query) {
                    $query->where('harga_beli', '>', '0')
                        ->orWhere('harga_produksi', '>', '0');
                })
                ->join('komoditas', 'komoditas.id', 'konsumsi_art.id_komoditas')
                ->get(['id_komoditas', 'harga_beli', 'harga_produksi', 'volume_beli', 'volume_produksi', 'nama_komoditas']);
            foreach ($konsumsi_ruta as $key => $value) {
                // ketika ada komoditas basket maka unset komdoditas dari array
                $id_komoditas = $value['id_komoditas'];
                $nama_komoditas = $value['nama_komoditas'];
                if (in_array($id_komoditas, $komoditas_basket)) {
                    $key = array_search($id_komoditas, $komoditas_basket);

                    // Check if the key is valid before unsetting
                    if ($key !== false) {
                        // Remove the element from $komoditas_basket
                        unset($komoditas_basket[$key]);
                    }
                }
                # code...


                $range_harga = DB::table('range_harga_komoditas')->where('id_komoditas', $id_komoditas)->where('kode_kabkot', $kode_kabkot)->first(['min', 'max']);
                $feedback = [
                    'id_komoditas' => $id_komoditas,
                    'nama_komoditas' => $nama_komoditas,
                    'rincian' => '',
                    'min' => $range_harga->min,
                    'max' => $range_harga->max,
                ];
                if ($range_harga->max == 0 && $range_harga->min == 0) {
                    continue;
                }
                if ($value['harga_beli'] > 0 && $value['volume_beli'] > 0) {
                    $harga_satuan = $value['harga_beli'] / $value['volume_beli'];
                    if ($harga_satuan > $range_harga->max) {
                        $feedback['rincian'] = "Harga satuan komoditas dari pembelian diatas range";
                        $feedback['harga'] = $harga_satuan;
                        $evaluasi_rh[] = $feedback;
                    }
                    if ($harga_satuan < $range_harga->min) {
                        $feedback['rincian'] = "Harga satuan komoditas dari pembelian dibawah range";
                        $feedback['harga'] = $harga_satuan;
                        $evaluasi_rh[] = $feedback;
                    }
                }
                if ($value['harga_produksi'] > 0 && $value['volume_produksi'] > 0) {
                    $harga_satuan = $value['harga_produksi'] / $value['volume_produksi'];
                    if ($harga_satuan > $range_harga->max) {
                        $feedback['rincian'] = "Harga satuan komoditas dari produksi sendiri, pemberian, dsb. diatas range";
                        $feedback['harga'] = $harga_satuan;
                        $evaluasi_rh[] = $feedback;
                    }
                    if ($harga_satuan < $range_harga->min) {
                        $feedback['rincian'] = "Harga satuan komoditas dari produksi sendiri, pemberian, dsb. dibawah range";
                        $feedback['harga'] = $harga_satuan;
                        $evaluasi_rh[] = $feedback;
                    }
                }
            }
            foreach ($konsumsi_art as $key => $value) {
                # code...
                // ambil kalori dari tabel 
                $id_komoditas = $value['id_komoditas'];
                $nama_komoditas = $value['nama_komoditas'];


                if (in_array($id_komoditas, $komoditas_basket)) {
                    $key = array_search($id_komoditas, $komoditas_basket);

                    // Check if the key is valid before unsetting
                    if ($key !== false) {
                        // Remove the element from $komoditas_basket
                        unset($komoditas_basket[$key]);
                    }
                }

                $range_harga = DB::table('range_harga_komoditas')->where('id_komoditas', $id_komoditas)->where('kode_kabkot', $kode_kabkot)->first(['min', 'max']);
                $feedback = [
                    'id_komoditas' => $id_komoditas,
                    'nama_komoditas' => $nama_komoditas,
                    'rincian' => '',
                    'min' => $range_harga->min,
                    'max' => $range_harga->max,

                ];
                if ($range_harga->max == 0 && $range_harga->min == 0) {
                    continue;
                }
                if ($value['harga_beli'] > 0 && $value['volume_beli'] > 0) {
                    $harga_satuan = $value['harga_beli'] / $value['volume_beli'];
                    if ($harga_satuan > $range_harga->max) {
                        $feedback['rincian'] = "Harga satuan komoditas dari pembelian diatas range";
                        $feedback['harga'] = $harga_satuan;
                        $evaluasi_rh[] = $feedback;
                    }
                    if ($harga_satuan < $range_harga->min) {
                        $feedback['rincian'] = "Harga satuan komoditas dari pembelian dibawah range";
                        $feedback['harga'] = $harga_satuan;
                        $evaluasi_rh[] = $feedback;
                    }
                }
                if ($value['harga_produksi'] > 0 && $value['volume_produksi'] > 0) {
                    $harga_satuan = $value['harga_produksi'] / $value['volume_produksi'];
                    if ($harga_satuan > $range_harga->max) {
                        $feedback['rincian'] = "Harga satuan komoditas dari produksi sendiri, pemberian, dsb. diatas range";
                        $feedback['harga'] = $harga_satuan;
                        $evaluasi_rh[] = $feedback;
                    }
                    if ($harga_satuan < $range_harga->min) {
                        $feedback['rincian'] = "Harga satuan komoditas dari produksi sendiri, pemberian, dsb. dibawah range";
                        $feedback['harga'] = $harga_satuan;
                        $evaluasi_rh[] = $feedback;
                    }
                }
            }
            // $komoditas_basket = json_decode(json_encode($komoditas_basket), true);
            $feedback_basket = [];

            foreach ($komoditas_basket as $key => $value) {
                # code...
                $feedback = [
                    'id_komoditas' => $value,
                    'rincian' => "Komoditas termasuk 52 Basket komoditas pembentuk kemiskinan, tetapi tidak terisi"
                ];
                $feedback_basket[] = $feedback;
            }


            $data = [
                // 'konsumsi_ruta' => $konsumsi_ruta,
                // 'konsumsi_art' => $konsumsi_art,
                'evaluasi_rh' => $evaluasi_rh,
                'evaluasi_basket' => [],
                'id_ruta' => $id_ruta,
            ];
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            throw $th;

            // return response()->json(['id_ruta' => $id_ruta,], 404);
        }
    }
}
