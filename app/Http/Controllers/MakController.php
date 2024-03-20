<?php

namespace App\Http\Controllers;

use App\Models\AnggotaRuta;
use App\Models\DaftarValidasiModel;
use App\Models\Kabkot;
use App\Models\Komoditas;
use App\Models\Konsumsi;
use App\Models\KonsumsiArt;
use App\Models\MasterWilayah;
use App\Models\SusenasMak;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPSTORM_META\type;

class MakController extends Controller
{
    private $wtfDependecies = [
        [
            'target' => 'wtf_3',
            'fields' => ['wtf_3c1'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_5',
            'fields' => ['wtf_5c1'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_6',
            'fields' => ['wtf_6c1'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_7',
            'fields' => ['wtf_6c2'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_8',
            'fields' => ['wtf_8c1'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_10',
            'fields' => ['wtf_10c1'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_14',
            'fields' => ['wtf_14c1'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_15',
            'fields' => ['wtf_15c1'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_16',
            'fields' => ['wtf_16c1'],
            "dependentValues" => ['1', '3']
        ],
        [
            'target' => 'wtf_16',
            'fields' => ['wtf_16c2'],
            "dependentValues" => ['2']
        ],
        [
            'target' => 'wtf_16',
            'fields' => ['wtf_16c3'],
            "dependentValues" => ['4', '5']
        ],

        [
            'target' => 'wtf_23',
            'fields' => ['wtf_23c1'],
            "dependentValues" => ['1']
        ],
        [
            'target' => 'wtf_24',
            'fields' => ['wtf_24c1'],
            "dependentValues" => ['1']
        ],
    ];
    public function is_any_zero($a, $b)
    {
        if (!isset($a)) {
            $a = 0;
        }
        if (!isset($b)) {
            $b = 0;
        }
        $a = (float)$a;
        $b = (float)$b;
        if ($a == 0 && $b == 0) {
            return false;
        }

        return ($a != 0 && $b == 0) || ($b != 0 && $a == 0);
    }
    public function cek_nomor_sampel(Request $request)
    {
        $value = $request->input('value');
        $kode_kabkot = $request->input('kode_kabkot');
        $nks = $request->input('nks');
        $id = $request->input('currentRecordId');
        // dd($id);

        $exists = SusenasMak::where('r109', $value)
            ->where('id', '<>', $id)
            ->where('kode_kabkot', $kode_kabkot)
            ->where('nks', $nks)
            ->exists();
        // dd($exists);

        return response()->json(['exists' => $exists]);
    }
    private function get_konsumsi_ruta($id_ruta)
    {
        return Konsumsi::where('id_ruta', $id_ruta)
            ->join('komoditas', 'komoditas.id', 'konsumsi.id_komoditas')
            // ->selectRaw('komoditas.id_kelompok', 'count(*) as jumlah')
            ->selectRaw('komoditas.id_kelompok, sum(konsumsi.harga_beli) as beli,sum(konsumsi.harga_produksi) as produksi')
            ->where('type', '<>', 'sub')
            ->groupBy('komoditas.id_kelompok')
            ->get();
    }

    private function get_konsumsi_art($id_ruta)
    {
        return KonsumsiArt::where('id_ruta', $id_ruta)
            ->join('anggota_ruta', 'anggota_ruta.id', 'konsumsi_art.id_art')
            ->join('komoditas', 'komoditas.id', 'konsumsi_art.id_komoditas')
            ->selectRaw('id_art,komoditas.id_kelompok,sum(konsumsi_art.harga_beli) as beli,sum(konsumsi_art.harga_produksi) as produksi')
            ->where('type', '<>', 'sub')
            ->groupBy('id_art', 'komoditas.id_kelompok')
            ->get();
    }
    //* @param Type var Description
    private function get_ruta($kode_kabkot, $nks, $semester = '1', $id_ruta = '-1')
    {
        if ($id_ruta == '-1') {
            return SusenasMak::where('vsusenas_mak.kode_kabkot', $kode_kabkot)->where('vsusenas_mak.nks', $nks)->where('vsusenas_mak.semester', $semester)
                ->join('master_wilayah', function ($join) {
                    $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                        ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
                        ->on('master_wilayah.kode_kec', '=', 'vsusenas_mak.kode_kec')
                        ->on('master_wilayah.kode_desa', '=', 'vsusenas_mak.kode_desa');
                })
                ->leftJoin('users', 'vsusenas_mak.users_id', 'users.id')
                ->select('vsusenas_mak.*', 'master_wilayah.kec', 'master_wilayah.desa', 'master_wilayah.klas', 'users.nama_lengkap')->distinct()->get();
        }

        return SusenasMak::where('vsusenas_mak.id', $id_ruta)
            ->join('master_wilayah', function ($join) {
                $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                    ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
                    ->on('master_wilayah.kode_kec', '=', 'vsusenas_mak.kode_kec')
                    ->on('master_wilayah.kode_desa', '=', 'vsusenas_mak.kode_desa');
            })
            ->leftJoin('users', 'vsusenas_mak.users_id', 'users.id')
            ->select('vsusenas_mak.*', 'master_wilayah.kec', 'master_wilayah.desa', 'master_wilayah.klas', 'users.nama_lengkap')->distinct()->first();
    }
    public function entri(Request $request)
    {

        try {
            //code...
            $kode_kabkot = $request->kode_kabkot;
            $nks = $request->nks;
            $semester = $request->semester;
            if (isset($semester)) {
                $semester = '1';
            }
            $data = $this->get_ruta($kode_kabkot, $nks, $semester);
            // dd([$data, $kode_kabkot, $nks, $semester]);
            //  return response()->json($data, 200);
            return Inertia::render('Entri/Inti', ['data_susenas' => $data, 'kode_kabkot' => $kode_kabkot, 'nks' => $nks]);
        } catch (\Throwable $th) {
            //throw $th;
        }

        return Inertia::render('Entri/Inti');
    }
    public function kelola_entri(Request $request)
    {

        try {
            //code...
            $kode_kabkot = $request->kode_kabkot;
            $nks = $request->nks;
            $semester = $request->semester;
            if (isset($semester)) {
                $semester = '1';
            }
            $data = $this->get_ruta($kode_kabkot, $nks, $semester);

            //  return response()->json($data, 200);
            return Inertia::render('Kelola Entri/Main', ['data_susenas' => $data, 'kode_kabkot' => $kode_kabkot, 'nks' => $nks]);
        } catch (\Throwable $th) {
            //throw $th;
        }

        return Inertia::render('Kelola Entri/Main');
    }
    public function dashboard()
    {


        $rekap_nks = DB::table('nks_summary')->get();
        $rekap_kabkot = DB::table('kabkot_summary')->get();
        $rekap_user = DB::table('user_summary')->get();

        $data = [
            'data' => $rekap_nks,
            'rekap_kabkot' => $rekap_kabkot,
            'users' => $rekap_user

        ];

        // $kondisi_total = 100;
        return Inertia::render('Dashboard', $data);
    }

    public function store(Request $request)
    {
        try {
            //code...
            $input = $request->all();
            $input['users_id'] = auth()->user()->id;
            $is_exist = SusenasMak::where('kode_kabkot', $input['kode_kabkot'])
                ->where('nks', $input['nks'])
                ->where('r109', $input['r109'])->first();
            if ($is_exist) {
                $response = [
                    'message' => 'nomor  urut sampel dalam satu NKS sudah terdaftar !',
                    'status' => 'error'
                ];
                return response()->json($response, 200);
            }
            // return response()->json(['asu'], 200);
            // create mak
            DB::beginTransaction();
            $created_mak = SusenasMak::create($input);
            // create default art
            $art = AnggotaRuta::create([
                'id_ruta' => $created_mak->id,
                'nama' => 'art default',
                'nomor_art' => 0,
            ]);
            DB::commit();

            return response()->json($created_mak, 201);
        } catch (\Throwable $th) {
            // throw $th;
            DB::rollBack();
            return response()->json(['error' => 'Error processing data'], 500);
        }
    }

    public function fetch(Request $request)
    {
        $kode_kabkot = $request->query('kode_kabkot');
        $semester = $request->query('semester');
        $provinsi = $request->query('kode_prov');
        $nks = $request->query('nks');

        $data = $this->get_ruta($kode_kabkot, $nks, $semester);

        // $data = $query->get();
        return response()->json([
            'data' => $data, 'semester' => $semester,
            'kabkot' => $kode_kabkot, 'provinsi' => $provinsi, 'nks' => $nks
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
        $data = $this->get_ruta('00', '00', '1', $id);
        // dd($data);

        $konsumsi_ruta = Konsumsi::where('id_ruta', $id)->join('komoditas', 'komoditas.id', 'konsumsi.id_komoditas')->select('konsumsi.*', 'komoditas.id_kelompok')->get();

        $garis_kemiskinan = Kabkot::where('kode', $data->kode_kabkot)->pluck('garis_kemiskinan');

        $art = AnggotaRuta::where('id_ruta', $id)->get();

        $rekap_konsumsi = $this->get_konsumsi_ruta($id);

        $rekap_konsumsi_art = $this->get_konsumsi_art($id);
        // $konsumsi_ruta = DB::table('konsumsi')->where('id_ruta', $id)->get();

        // dd($konsumsi_ruta);
        return Inertia::render("Entri/EditMak", [
            'data' => $data,
            'konsumsi_ruta' => $konsumsi_ruta,
            'art' => $art,
            'garis_kemiskinan' => $garis_kemiskinan,
            'rekap_konsumsi' => $rekap_konsumsi,
            'rekap_konsumsi_art' => $rekap_konsumsi_art,
        ]);
    }
    public function view($id)
    {
        // $id = $request->query('id');


        // $data = Inti::where('kode_id', $id)->where('semester', $semester)->get();
        $data = $this->get_ruta('00', '00', '1', $id);
        // dd($data);

        $konsumsi_ruta = Konsumsi::where('id_ruta', $id)->join('komoditas', 'komoditas.id', 'konsumsi.id_komoditas')->select('konsumsi.*', 'komoditas.id_kelompok')->get();

        $garis_kemiskinan = Kabkot::where('kode', $data->kode_kabkot)->pluck('garis_kemiskinan');

        $art = AnggotaRuta::where('id_ruta', $id)->get();

        $rekap_konsumsi = $this->get_konsumsi_ruta($id);

        $rekap_konsumsi_art = $this->get_konsumsi_art($id);
        // $konsumsi_ruta = DB::table('konsumsi')->where('id_ruta', $id)->get();

        // dd($konsumsi_ruta);
        return Inertia::render("Entri/View", [
            'data' => $data,
            'konsumsi_ruta' => $konsumsi_ruta,
            'art' => $art,
            'garis_kemiskinan' => $garis_kemiskinan,
            'rekap_konsumsi' => $rekap_konsumsi,
            'rekap_konsumsi_art' => $rekap_konsumsi_art,
        ]);
    }
    public function update(Request $request)
    {
        try {

            // }
            $data = $request->all();

            // Columns to check and their corresponding form fields
            $columnsToCheck = $this->wtfDependecies;
            $fields_check = [];
            foreach ($columnsToCheck as $column) {
                if (isset($column['fields'])) {
                    $fields_check = array_merge($fields_check, $column['fields']);
                }
            }
            if (isset($data['id'])) {
                $currentWtf = SusenasMak::where('id', $data['id'])->first($fields_check);
                // dd($currentWtf);

                foreach ($columnsToCheck as $dependency) {

                    foreach ($dependency['fields'] as $dependentField) {
                        // Check if the field exists in $currentWtf and condition is met
                        if (isset($currentWtf[$dependentField]) && (isset($data[$dependency['target']]) && !in_array($data[$dependency['target']], $dependency['dependentValues']))) {
                            $data[$dependentField] = null;
                        }
                    }
                }
            }            // second check 


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
            DB::beginTransaction();
            foreach ($rekap_art as $key => $value) {
                # code...
                $id = $value['id'];
                $current = $value;
                unset($current['id']);
                unset($current['nomor_art']);

                AnggotaRuta::where('id', $value['id'])->update($current);
                // DB::commit();
            }
            SusenasMak::where('id', $data['id'])->update(['updated_at' => Date::now()]);

            DB::commit();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
            return response()->json(['error' => 'Error processing data'], 500);
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
            DB::beginTransaction();
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
            DB::commit();
            // 
            return response()->json([
                'message' => "Berhasil menyimpan perubahan",
                'status' => 'success'
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['error' => 'Error processing data'], 500);
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
            DB::beginTransaction();
            KonsumsiArt::upsert($baru, 'id');
            SusenasMak::where('id', $id_ruta)->update(['updated_at' => Date::now()]);
            // 
            DB::commit();
            return response()->json($baru, 201);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json(['error' => 'Error processing data'], 500);
        }
    }
    public function create(Request $request)
    {
        // $data = Inti::where('kode_kabkot', $kabkot)->where('semester', $semester)->get();
        $identitas_wilayah = $request->all();
        $master_wilayah = MasterWilayah::where('kode_kabkot', $identitas_wilayah['kode_kabkot'])->where('nks', $identitas_wilayah['nks'])->first();
        return Inertia::render("Entri/CreateMak", ['identitas_wilayah' => $master_wilayah]);
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




            // $konsumsi_ruta = Konsumsi::with('komoditas')
            //     ->where('id_ruta', $id_ruta)
            //     ->where(function ($query) {
            //         $query->where('volume_beli', '>', '0')
            //             ->orWhere('volume_produksi', '>', '0');
            //     })
            //     ->get(['id_komoditas', 'volume_beli', 'volume_produksi', 'harga_beli', 'harga_produksi']);


            // $konsumsi_art = KonsumsiArt::with(['anggota_ruta', 'komoditas'])
            //     ->join('anggota_ruta', 'anggota_ruta.id', 'konsumsi_art.id_art')
            //     ->where('anggota_ruta.id_ruta', $id_ruta)
            //     ->where(function ($query) {
            //         $query->where('volume_beli', '>', 0)
            //             ->orWhere('volume_produksi', '>', 0);
            //     })
            //     ->get(['id_komoditas', 'volume_beli', 'volume_produksi', 'harga_beli', 'harga_produksi']);

            // $all_konsumsi = $konsumsi_ruta->merge($konsumsi_art);
            // dd([sizeof($konsumsi_art), sizeof($konsumsi_ruta)]);

            // $kalori_ruta = $konsumsi_ruta->sum(function ($value) {
            //     return $value->komoditas->kalori * ($value->volume_beli + $value->volume_produksi);
            // });
            // $kalori_art = $konsumsi_art->sum(function ($value) {
            //     return $value->komoditas->kalori * ($value->volume_beli + $value->volume_produksi);
            // });

            // $kalori_basket_art = $konsumsi_art->filter(function ($value) use ($komoditas_basket) {
            //     return $komoditas_basket->contains($value->komoditas->id);
            // })->sum(function ($value) {
            //     return $value->komoditas->kalori * ($value->volume_beli + $value->volume_produksi);
            // });
            // $kalori_basket_ruta = $konsumsi_ruta->filter(function ($value) use ($komoditas_basket) {
            //     return $komoditas_basket->contains($value->komoditas->id);
            // })->sum(function ($value) {
            //     return $value->komoditas->kalori * ($value->volume_beli + $value->volume_produksi);
            // });
            // $kalori_basket = $kalori_basket_art + $kalori_basket_ruta;
            // $kalori_total = $kalori_ruta + $kalori_art;
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
            $pengeluaran_non_makanan = SusenasMak::where('id', $id_ruta)->value('blok4_32_16_total');
            $komoditas_non_makanan = SusenasMak::where('id', $id_ruta)->value('blokqc_3');
            $art = AnggotaRuta::where('id_ruta', $id_ruta)->pluck('id');
            $pengeluaran = $pengeluaran * 30 / 7;
            $pengeluaran = $pengeluaran + $pengeluaran_non_makanan;
            $data_update = [
                'blokqc_0' => $kalori_total / sizeof($art) / 7,
                'blokqc_6' => $kalori_basket / sizeof($art) / 7,
                'blokqc_1' => sizeof($konsumsi_ruta),
                'blokqc_2' => sizeof($konsumsi_art),
                'blokqc_4' => $komoditas_non_makanan + sizeof($konsumsi_art) + sizeof($konsumsi_ruta),
                'blokqc_5' => round($pengeluaran / sizeof($art)),
            ];
            DB::beginTransaction();
            SusenasMak::find($id_ruta)->update($data_update);
            DB::commit();
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
            DB::rollBack();
            throw $th;

            return response()->json(['error' => 'Error processing data'], 500);
        }
    }
    public function recalculate_qc()
    {
        $daftar_ruta = SusenasMak::whereIn('status_dok', ['clean', 'warning'])->pluck('id');
        // return response()->json(['daftar_ruta' => $daftar_ruta], 200);
        return Inertia::render('Calculate', ['data' => $daftar_ruta]);
    }
    public function revalidasi($id_ruta)
    {
        try {
            //code...
            $evaluasi_rh  = $this->range_harga($id_ruta);
            $evaluasi_isian = $this->cek_isian_new($id_ruta);
            $daftar_error = $evaluasi_isian['daftar_error'];
            $daftar_warning = $evaluasi_isian['daftar_warning'];

            $status_dok = 'entri';
            if (sizeof($daftar_error) > 0) {
                // set dokumen error
                $status_dok = 'error';
            } else if (sizeof($evaluasi_rh) > 0 || sizeof($daftar_warning) > 0) {
                // set dokumen warning
                $status_dok = 'warning';
            } else {
                // set dokumen clean
                $status_dok = 'clean';
            }
            if (strlen($id_ruta) > 10) {
                DB::beginTransaction();
                SusenasMak::where('id', $id_ruta)->update([
                    'status_dok' => $status_dok
                ]);
                DB::commit();
            }
            $data = [
                'evaluasi_rh' => $evaluasi_rh,
                'daftar_error' => $daftar_error,
                'daftar_warning' => $daftar_warning,

            ];


            return response()->json($data, 200);
        } catch (\Throwable $th) {
            throw $th;
            DB::rollBack();
            return response()->json(['error' => 'Error processing data'], 500);
        }
    }
    // Helper function to create error array
    private function createKomoditasError($rincian, $konsumsi)
    {
        return [
            'rincian' => $rincian,
            'variable' => "[{$konsumsi['id_komoditas']}] {$konsumsi['nama_komoditas']}",
        ];
    }

    // Helper function to check consistency between price and volume
    private function checkConsistency(&$daftar_error, $konsumsi, $hargaKey, $volumeKey, $nomor = -1)
    {
        if ($this->is_any_zero($konsumsi[$hargaKey], $konsumsi[$volumeKey])) {
            // dd($konsumsi);
            if ($nomor > 0) {
                $daftar_error[] = $this->createKomoditasError("ART nomor " . $nomor . " - Isian $hargaKey, bernilai 0 tetapi $volumeKey > 0 atau sebaliknya", $konsumsi);
            } else {

                $daftar_error[] = $this->createKomoditasError("Isian $hargaKey, bernilai 0 tetapi $volumeKey > 0 atau sebaliknya", $konsumsi);
            }
        }
    }
    private function cek_isian_new($id_ruta)
    {
        $daftar_error = [];
        $daftar_warning = [];
        $daftar_rule = new DaftarValidasiModel();
        $data_mak = SusenasMak::where('id', $id_ruta)->first()->toArray();
        $jumlah_art = AnggotaRuta::where('id_ruta', $id_ruta)->count();
        $daftar_art = AnggotaRuta::where('id_ruta', $id_ruta)->get();

        if (sizeof($data_mak) > 0) {
            // loop each var
            foreach ($data_mak as $nama_var => $value) {
                // each var find rules 
                // except for status 3,4,5
                if ($nama_var == 'r203' && $value > 2) {
                    break;
                }

                $current_rules = $daftar_rule->where('nama_variabel', '=', $nama_var)->get();

                foreach ($current_rules as $rule) {
                    $pesan = [
                        'variable' => $rule['deskripsi_variabel'],
                        'type' => $rule['type'],
                    ];
                    if ($rule['nama_rule'] == 'required' && !isset($value)) {
                        $pesan['rincian'] = "Isian ini harus diisi";
                        if ($rule['type'] == 'error') {

                            $daftar_error[] = $pesan;
                        } else {
                            $daftar_warning[] = $pesan;
                        }
                    } else {

                        if ($rule['nama_rule'] == 'min' && $value < $rule['value']) {
                            $pesan['rincian'] = "Isian ini bernilai < " . $rule['value'];
                            if ($rule['type'] == 'error') {

                                $daftar_error[] = $pesan;
                            } else {
                                $daftar_warning[] = $pesan;
                            }
                        }
                        if ($rule['nama_rule'] == 'max' && $value > $rule['value']) {
                            $pesan['rincian'] = "Isian ini bernilai > " . $rule['value'];

                            if ($rule['type'] == 'error') {

                                $daftar_error[] = $pesan;
                            } else {
                                $daftar_warning[] = $pesan;
                            }
                        }
                    }
                }
            }
            // cek konsumsi rt dan art 
            if ($data_mak['r203'] < 3) {
                $konsumsi_ruta = Konsumsi::where('konsumsi.id_ruta', $id_ruta)
                    ->join('komoditas', 'konsumsi.id_komoditas', 'komoditas.id')
                    ->select('konsumsi.*', 'komoditas.id_kelompok', 'komoditas.type', 'komoditas.nama_komoditas')
                    ->where('komoditas.type', '<>', 'sub')
                    ->get();
                foreach ($konsumsi_ruta as $key => $konsumsi) {
                    if ($konsumsi["type"] == "sub") {
                        $daftar_warning[] = $this->createKomoditasError("Isian harga pembelian/produksi, pemberian dsb harus ada (tidak boleh 0 semua)", $konsumsi);
                        continue;
                    }

                    // Check for consistency between price and volume
                    $this->checkConsistency($daftar_error, $konsumsi, 'harga_produksi', 'volume_produksi');
                    $this->checkConsistency($daftar_error, $konsumsi, 'harga_beli', 'volume_beli');
                    $this->checkConsistency($daftar_error, $konsumsi, 'harga_total', 'volume_total');

                    // kesesuaian total 
                }
                $nomor = 1;
                foreach ($daftar_art as $key => $art) {
                    # code...
                    $nilai_mak = 0;
                    $konsumsi_art = KonsumsiArt::join('komoditas', 'konsumsi_art.id_komoditas', 'komoditas.id')
                        ->select('konsumsi_art.*', 'komoditas.id_kelompok', 'komoditas.type', 'komoditas.nama_komoditas')
                        ->where('konsumsi_art.id_art', $art['id'])
                        ->where(function ($query) {
                            $query->where('harga_produksi', '>', 0)
                                ->orWhere('harga_beli', '>', 0)
                                ->orWhere('komoditas.type', 'sub');
                        })
                        ->get();
                    // dd($konsumsi_art);

                    foreach ($konsumsi_art as $key => $konsumsi) {

                        // if ($konsumsi["type"] == "sub" && $konsumsi['id_kelompok'] == 12 && $konsumsi['harga_beli'] == 0 && $konsumsi['harga_produksi'] == 0) {
                        //     $daftar_warning[] = $this->createKomoditasError("ART nomor " . $nomor . " - Isian harga pembelian/produksi, pemberian dsb harus ada (tidak boleh 0 semua)", $konsumsi);
                        //     continue;
                        // }
                        if ($konsumsi['type'] == 'sub') {
                            if ($konsumsi['id_kelompok'] == 12) {
                                $nilai_mak = $nilai_mak + $konsumsi['harga_beli'] + $konsumsi['harga_produksi'];
                            }
                            continue;
                        }

                        // Check for consistency between price and volume
                        $this->checkConsistency($daftar_error, $konsumsi, 'harga_produksi', 'volume_produksi', $nomor);
                        $this->checkConsistency($daftar_error, $konsumsi, 'harga_beli', 'volume_beli', $nomor);
                        $this->checkConsistency($daftar_error, $konsumsi, 'harga_total', 'volume_total', $nomor);

                        // kesesuaian total 
                    }
                    if ($nilai_mak == 0) {

                        $daftar_warning[] = $this->createKomoditasError("ART nomor " . $nomor . " - Isian harga pembelian/produksi, pemberian dsb harus ada (tidak boleh 0 semua)", $konsumsi);
                    }
                    $nomor++;
                }
                // cek kesesuaian rekap dengan isian
                $rincian15 = [
                    'beli' => 0,
                    'produksi' => 0,
                    'total' => 0,
                ];
                $rekap_art = [
                    'mak_beli' => 0,
                    'mak_produksi' => 0,
                    'rokok_beli' => 0,
                    'rokok_produksi' => 0,
                ];

                $rekap_konsumsi_art = $this->get_konsumsi_art($id_ruta);
                $rekap_konsumsi_ruta = $this->get_konsumsi_ruta($id_ruta);



                foreach ($rekap_konsumsi_art as $key => $value) {
                    $rincian15['beli'] += $value['beli'];
                    $rincian15['produksi'] += $value['produksi'];
                    if ($value['id_kelompok'] == '12') {
                        $rekap_art['mak_beli'] += $value['beli'];
                        $rekap_art['mak_produksi'] += $value['produksi'];
                    } else {
                        $rekap_art['rokok_beli'] += $value['beli'];
                        $rekap_art['rokok_produksi'] += $value['produksi'];
                    }
                }
                foreach ($rekap_konsumsi_ruta as $key => $value) {
                    $rincian15['beli'] += $value['beli'];
                    $rincian15['produksi'] += $value['produksi'];
                }
                $rincian15['total'] = $rincian15['beli'] + $rincian15['produksi'];
                $rincian16 = $rincian15['total'] * 30 / 7;
                $blok4_32_15 = [
                    'beli' => $data_mak['blok4_32_14_beli'],
                    'produksi' => $data_mak['blok4_32_14_produksi'],
                    'total' => $data_mak['blok4_32_14_total'],
                ];

                // nilai inputan user

                // rekap 4.3.1
                $blok4_31_jumlah_mak_beli = $data_mak['blok4_31_jumlah_mak_beli'];
                $blok4_31_jumlah_mak_produksi = $data_mak['blok4_31_jumlah_mak_produksi'];
                $blok4_31_jumlah_rokok_beli = $data_mak['blok4_31_jumlah_rokok_beli'];
                $blok4_31_jumlah_rokok_produksi = $data_mak['blok4_31_jumlah_rokok_produksi'];

                // rekap 4.3.2
                $blok4_32_16 = $data_mak['blok4_32_15_total'];
                $blok4_32_17 = $data_mak['blok4_32_16_total'];
                $blok4_32_18 = $data_mak['blok4_32_17_total'];

                // dd([$rekap_art, $blok4_31_jumlah_mak_beli, $blok4_31_jumlah_mak_produksi, $blok4_31_jumlah_rokok_beli, $blok4_31_jumlah_rokok_produksi]);
                // dd([$blok4_32_15, $blok4_32_17, (int)$rincian16, $rincian15]);

                foreach ($rincian15 as $key => $value) {
                    if ($value != $blok4_32_15[$key]) {
                        // add warning
                        $pesan = [
                            'variable' => "Blok IV.3.2 Rekapitulasi Rincian Nomor 15 " . $key,
                            'type' => 'warning',

                        ];
                        $pesan['rincian'] = "Isian ini berbeda dengan yang dihitung oleh sistem, mohon dicek kembali";
                        $daftar_warning[] = $pesan;
                    }
                }

                if (round($blok4_32_16) != round($rincian16)) {
                    $pesan = [
                        'variable' => "Blok IV.3.2 Rekapitulasi Rincian Nomor 16",
                        'type' => 'warning',

                    ];
                    $pesan['rincian'] = "Isian ini berbeda dengan yang dihitung oleh sistem, mohon dicek kembali";
                    $daftar_warning[] = $pesan;
                }

                if (round($blok4_31_jumlah_mak_produksi) != round($rekap_art['mak_produksi'])) {
                    $pesan = [
                        'variable' => "Blok IV.3.1 Rekapitulasi Jumlah Makanan dan Minuman Jadi (Produksi sendiri, Pemberian, dsb)",
                        'type' => 'warning',

                    ];
                    $pesan['rincian'] = "Isian ini berbeda dengan yang dihitung oleh sistem, mohon dicek kembali";
                    $daftar_warning[] = $pesan;
                }

                if (round($blok4_31_jumlah_mak_beli) != round($rekap_art['mak_beli'])) {
                    $pesan = [
                        'variable' => "Blok IV.3.1 Rekapitulasi Jumlah Makanan dan Minuman Jadi (Pembelian)",
                        'type' => 'warning',

                    ];
                    $pesan['rincian'] = "Isian ini berbeda dengan yang dihitung oleh sistem, mohon dicek kembali";
                    $daftar_warning[] = $pesan;
                }

                if (round($blok4_31_jumlah_rokok_produksi) != round($rekap_art['rokok_produksi'])) {
                    $pesan = [
                        'variable' => "Blok IV.3.1 Rekapitulasi Jumlah Rokok dan Tembakau (Produksi sendiri, Pemberian, dsb)",
                        'type' => 'warning',

                    ];
                    $pesan['rincian'] = "Isian ini berbeda dengan yang dihitung oleh sistem, mohon dicek kembali";
                    $daftar_warning[] = $pesan;
                }

                if (round($blok4_31_jumlah_rokok_beli) != round($rekap_art['rokok_beli'])) {
                    $pesan = [
                        'variable' => "Blok IV.3.1 Rekapitulasi Jumlah Rokok dan Tembakau (Pembelian)",
                        'type' => 'warning',

                    ];
                    $pesan['rincian'] = "Isian ini berbeda dengan yang dihitung oleh sistem, mohon dicek kembali";
                    $daftar_warning[] = $pesan;
                }

                if (round($blok4_32_18) != round($rincian16 + $blok4_32_17)) {
                    $pesan = [
                        'variable' => "Blok IV.3.2 Rekapitulasi Rincian Nomor 18",
                        'type' => 'warning',

                    ];
                    $pesan['rincian'] = "Isian ini berbeda dengan yang dihitung oleh sistem, mohon dicek kembali";
                    $daftar_warning[] = $pesan;
                }


                // cek isisan wtf
                $columnsToCheck = $this->wtfDependecies;
                $fields_check = [];
                $currentWtf = [];
                foreach ($columnsToCheck as $column) {
                    if (isset($column['fields'])) {
                        $fields_check = array_merge($fields_check, $column['fields']);
                    }
                }
                foreach ($fields_check as $key => $value) {
                    if (isset($data_mak[$value])) {
                        $currentWtf[$value] =  $data_mak[$value];
                    }
                }

                // dd($currentWtf);

                if ($jumlah_art != $data_mak['wtf_2']) {
                    $warning = [
                        'rincian' => "Jumlah Art pada Blok IV.1 tidak sama dengan Rincian Worksheet",
                        'variable' => "Pertanyaan worksheet Nomor 2",
                        'type' => 'warning'
                    ];
                    $daftar_warning[] = $warning;
                }

                foreach ($columnsToCheck as $dependency) {

                    foreach ($dependency['fields'] as $dependentField) {
                        // Check if the field exists in $currentWtf and condition is met
                        if (isset($data_mak[$dependency['target']]) && in_array($data_mak[$dependency['target']], $dependency['dependentValues'])) {
                            // if (isset($currentWtf[$dependentField]) && isset($mak[$dependency['target']])) {
                            // dd([$dependentField, $currentWtf]);
                            if (!isset($currentWtf[$dependentField])) {
                                // return value tidak sesuai
                                $error = [
                                    'rincian' => "Isian ini harus diisi",
                                    'variable' => "Pertanyaan tambahan worksheet " . $dependentField,
                                ];
                                $daftar_error[] = $error;
                            } elseif ($currentWtf[$dependentField] < 1) {
                                $warning = [
                                    'rincian' => "Isian ini harus bernilai > 0",
                                    'variable' => "Pertanyaan tambahan worksheet " . $dependentField,
                                    'type' => 'warning'
                                ];
                                $daftar_warning[] = $warning;
                            }
                        } else {
                            // return value null tetapi dependency terisi
                        }
                    }
                }
            }
        }
        return [
            'daftar_warning' => $daftar_warning,
            'daftar_error' => $daftar_error,
        ];
        // return false
    }

    private function validateRangeKonsumsi($value, $range_harga, $feedback, $nomor_art = 0)
    {
        $evaluasi_rh = [];
        if ($nomor_art > 0) {
            if ($value['harga_beli'] > 0 && $value['volume_beli'] > 0) {
                $harga_satuan = $value['harga_beli'] / $value['volume_beli'];
                if ($harga_satuan > $range_harga->max) {
                    $feedback['rincian'] = "ART nomor " . $nomor_art . " - harga satuan komoditas dari pembelian diatas range";
                    $feedback['harga'] = $harga_satuan;
                    $evaluasi_rh[] = $feedback;
                } else if ($harga_satuan < $range_harga->min) {
                    $feedback['rincian'] = "ART nomor " . $nomor_art . " - harga satuan komoditas dari pembelian dibawah range";
                    $feedback['harga'] = $harga_satuan;
                    $evaluasi_rh[] = $feedback;
                }
            }
            if ($value['harga_produksi'] > 0 && $value['volume_produksi'] > 0) {
                $harga_satuan = $value['harga_produksi'] / $value['volume_produksi'];
                if ($harga_satuan > $range_harga->max) {
                    $feedback['rincian'] = "ART nomor " . $nomor_art . " - harga satuan komoditas dari produksi sendiri, pemberian, dsb. diatas range";
                    $feedback['harga'] = $harga_satuan;
                    $evaluasi_rh[] = $feedback;
                } else if ($harga_satuan < $range_harga->min) {
                    $feedback['rincian'] = "ART nomor " . $nomor_art . " - harga satuan komoditas dari produksi sendiri, pemberian, dsb. dibawah range";
                    $feedback['harga'] = $harga_satuan;
                    $evaluasi_rh[] = $feedback;
                }
            }
        } else {
            if ($value['harga_beli'] > 0 && $value['volume_beli'] > 0) {
                $harga_satuan = $value['harga_beli'] / $value['volume_beli'];
                if ($harga_satuan > $range_harga->max) {
                    $feedback['rincian'] = "Harga satuan komoditas dari pembelian diatas range";
                    $feedback['harga'] = $harga_satuan;
                    $evaluasi_rh[] = $feedback;
                } else if ($harga_satuan < $range_harga->min) {
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
                } else if ($harga_satuan < $range_harga->min) {
                    $feedback['rincian'] = "Harga satuan komoditas dari produksi sendiri, pemberian, dsb. dibawah range";
                    $feedback['harga'] = $harga_satuan;
                    $evaluasi_rh[] = $feedback;
                }
            }
        }
        return $evaluasi_rh;
    }

    private function range_harga($id_ruta)
    {
        try {
            //code...
            // evaluasi Range harga
            $evaluasi_rh = [];
            // evaluasi basket komoditas kemiskinan
            $evaluasi_basket = [];


            $komoditas_basket = Komoditas::where('flag_basket', 1)->pluck('id')->toArray();



            $kode_kabkot = SusenasMak::where('id', $id_ruta)->value('kode_kabkot');

            // $kode_kabkot->value('kode_kabkot');


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
            $daftar_art = AnggotaRuta::where('id_ruta', $id_ruta)->get();
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
                $validasi = $this->validateRangeKonsumsi($value, $range_harga, $feedback);
                foreach ($validasi as $key => $value) {
                    # code...
                    $evaluasi_rh[] = $value;
                }
            }
            $nomor_art = 1;
            foreach ($daftar_art as $key => $value) {
                # code...
                $konsumsi_art = KonsumsiArt::where('id_art', $value['id'])
                    ->where(function ($query) {
                        $query->where('harga_beli', '>', '0')
                            ->orWhere('harga_produksi', '>', '0');
                    })
                    ->join('komoditas', 'komoditas.id', 'konsumsi_art.id_komoditas')
                    ->get(['id_komoditas', 'harga_beli', 'harga_produksi', 'volume_beli', 'volume_produksi', 'nama_komoditas']);
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
                    $validasi = $this->validateRangeKonsumsi($value, $range_harga, $feedback, $nomor_art);
                    foreach ($validasi as $key => $value) {
                        # code...
                        $evaluasi_rh[] = $value;
                    }
                }
                $nomor_art++;
            }

            $feedback_basket = [];

            foreach ($komoditas_basket as $key => $value) {
                # code...
                $feedback = [
                    'id_komoditas' => $value,
                    'rincian' => "Komoditas termasuk 52 Basket komoditas pembentuk kemiskinan, tetapi tidak terisi"
                ];
                $feedback_basket[] = $feedback;
            }



            return $evaluasi_rh;
        } catch (\Exception $ex) {
            throw new \Exception($ex);
            return response()->json(['error' => 'Error processing data'], 500);


            // return response()->json(['id_ruta' => $id_ruta,], 404);
        }
    }
    public function delete($id_ruta)
    {
        try {
            //code...
            DB::beginTransaction();
            $mak = SusenasMak::where('id', $id_ruta);
            $mak->delete();
            DB::commit();
            return response()->json([
                'message' => 'berhasil menghapus satu ruta',
                'status' => 'success'
            ], 204);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['error' => 'Error processing data'], 500);
        }
    }
    public function maintenance()
    {
        return Inertia::render('Maintenance');
    }
    public function change_nks($id_ruta, $nks_baru)
    {
        try {
            //validate input 
            if (strlen($id_ruta) != 36 || strlen($nks_baru) != 6) {
                return false;
            }
            $mak = SusenasMak::findOrFail($id_ruta);
            // dd($mak);
            // handle mak 
            if ($mak) {
                // get kabkot
                $kode_kabkot = $mak->kode_kabkot;
                $wilayah_baru = MasterWilayah::where('kode_kabkot', $kode_kabkot)->where('nks', $nks_baru)->first();
                // handle wilayah baru
                // dd([$wilayah_baru, $kode_kabkot, $nks_baru]);
                if ($wilayah_baru) {
                    $mak->kode_desa = $wilayah_baru->kode_desa;
                    $mak->kode_bs4 = $wilayah_baru->kode_bs4;
                    // $mak->klas = $wilayah_baru->klas;
                    $mak->kode_kec = $wilayah_baru->kode_kec;
                    $mak->nks = $wilayah_baru->nks;
                    $mak->save();
                    // dd($mak->changes);
                    return true;
                } else {
                    // return exception 
                    // no data wilayah found
                    return false;
                }
            }
            // return exception 
            // no data susenas mak found
            return false;
        } catch (\Throwable $th) {
            //throw $th;
            return false;
        }
    }
    // public function unduh_raw()
    // {
    //     $ruta = SusenasMak::get();
    //     $art = AnggotaRuta::get();
    //     $konsumsi_ruta = Konsumsi::get();
    //     $konsumsi_art = KonsumsiArt::get();
    //     $data = [
    //         'ruta' => $ruta,
    //         'art' => $art,
    //         'konsumsi_ruta' => $konsumsi_ruta,
    //         'konsumsi_art' => $konsumsi_art
    //     ];
    //     return response()->json($data, 200);
    // }
}
