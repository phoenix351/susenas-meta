<?php

namespace App\Http\Controllers;

use App\Models\Konsumsi;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class MonitoringController extends Controller
{


    public function index()
    {
        return Inertia::render('Progress/index');
    }
    public function dashboard()
    {
        return Inertia::render('Provinsi/Dashboard/index');
    }
    public function get_rekap_nks()
    {
        $kode_kabkot = auth()->user()->kode_kabkot;
        $rekap_nks = DB::table('nks_summary');
        if ($kode_kabkot != '00') {
            $rekap_nks = $rekap_nks->where('kode_kabkot', $kode_kabkot);
        }
        $rekap_nks = $rekap_nks->get();
        return response()->json(['rekap_nks' => $rekap_nks], 200);
    }
    public function get_rekap_kabkot()
    {
        $this->update();
        $rekap_kabkot = DB::table('kabkot_summary');

        $rekap_kabkot = $rekap_kabkot->get();

        return response()->json(['rekap_kabkot' => $rekap_kabkot], 200);
    }
    public function get_rekap_user()
    {
        $kode_kabkot = auth()->user()->kode_kabkot;

        $rekap_user = DB::table('user_summary');
        if ($kode_kabkot != '00') {
            $rekap_user = $rekap_user->where('kode_kabkot', $kode_kabkot);
        }
        $rekap_user = $rekap_user->get();

        return response()->json(['rekap_user' => $rekap_user], 200);
    }
    public function update()
    {
        $last_update = DB::table('monitoring_update')->latest('created_at')->first();
        if (is_null($last_update)) {
        } else {
            $minutes = Carbon::parse($last_update->created_at)->diffInMinutes();
            if ($minutes < 30) {
                return;
            }
        }
        try {
            // penghitungan rekap kabkot
            $rekap_kabkot = DB::table('master_wilayah')
                ->select(
                    'master_wilayah.kode_prov',
                    'master_wilayah.kode_kabkot',
                    'master_wilayah.kabkot',
                    DB::raw('COALESCE(COUNT(DISTINCT master_wilayah.nks), 0) as target_nks'),
                    DB::raw('COALESCE(COUNT(DISTINCT vsusenas_mak.id), 0) as jumlah_dok'),
                    // DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "entri" THEN vsusenas_mak.id END) as dok_entri'),
                    DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "error" THEN vsusenas_mak.id END) as dok_error'),
                    DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "warning" THEN vsusenas_mak.id END) as dok_warning'),
                    DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "clean" THEN vsusenas_mak.id END) as dok_clean'),
                )
                ->leftJoin('vsusenas_mak', function ($join) {
                    $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                        ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot');
                })
                ->groupBy(
                    'master_wilayah.kode_prov',
                    'master_wilayah.kode_kabkot',
                    'master_wilayah.kabkot'
                )
                ->get()->toArray();
            $rekap_kabkot = array_map(function ($item) {
                return (array) $item;
            }, $rekap_kabkot);
            // dd($rekap_kabkot);
            $rekap_nks = DB::table('master_wilayah')
                ->select(
                    'master_wilayah.kode_prov',
                    'master_wilayah.kode_kabkot',
                    'master_wilayah.nks',
                    'master_wilayah.kabkot',
                    DB::raw('COALESCE(COUNT(DISTINCT vsusenas_mak.id), 0) as jumlah_dok'),
                    DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "error" THEN vsusenas_mak.id END) as dok_error'),
                    DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "warning" THEN vsusenas_mak.id END) as dok_warning'),
                    DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "clean" THEN vsusenas_mak.id END) as dok_clean'),
                )
                ->leftJoin('vsusenas_mak', function ($join) {
                    $join->on('master_wilayah.kode_prov', '=', 'vsusenas_mak.kode_prov')
                        ->on('master_wilayah.kode_kabkot', '=', 'vsusenas_mak.kode_kabkot')
                        ->on('master_wilayah.nks', '=', 'vsusenas_mak.nks');
                })
                ->groupBy(
                    'master_wilayah.kode_prov',
                    'master_wilayah.kode_kabkot',
                    'master_wilayah.kabkot',
                    'master_wilayah.desa',
                    'master_wilayah.nks',

                )
                // ->where('master_wilayah.kode_kabkot', $kode_kabkot)

                ->distinct()
                ->get()->toArray();
            $rekap_nks = array_map(function ($item) {
                return (array) $item;
            }, $rekap_nks);
            // dd($rekap_nks);

            //rekap user
            $usersQuery = User::join('vsusenas_mak', 'vsusenas_mak.users_id', 'users.id')->join('master_wilayah', 'master_wilayah.kode_kabkot', 'users.kode_kabkot');

            // Add the condition only if $kode_kabkot is not "00"

            // Select the columns
            $rekap_user = $usersQuery->select(
                'users.id',
                'users.nama_lengkap',
                'users.username',
                'users.kode_kabkot',
                'master_wilayah.kabkot',
                DB::raw('count(distinct vsusenas_mak.id) as jumlah_dokumen'),
                DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "error" THEN vsusenas_mak.id END) as dok_error'),
                DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "warning" THEN vsusenas_mak.id END) as dok_warning'),
                DB::raw('COUNT(DISTINCT CASE WHEN vsusenas_mak.status_dok = "clean" THEN vsusenas_mak.id END) as dok_clean'),
            )

                ->groupBy('users.id', 'users.nama_lengkap', 'users.username', 'users.kode_kabkot', 'master_wilayah.kabkot')
                ->get()->toArray();
            if (sizeof($rekap_user) > 0) {
                // insert
                DB::beginTransaction();
                DB::table('user_summary')->delete();
                DB::table('user_summary')->insert($rekap_user);
                DB::commit();
            }
            // dd($rekap_user);
            if (sizeof($rekap_kabkot) > 0) {
                // insert
                DB::beginTransaction();
                DB::table('kabkot_summary')->delete();
                DB::table('kabkot_summary')->insert($rekap_kabkot);
                DB::commit();
            }
            if (sizeof($rekap_nks) > 0) {
                // insert
                DB::beginTransaction();
                DB::table('nks_summary')->delete();
                DB::table('nks_summary')->insert($rekap_nks);
                DB::table('monitoring_update')->insert([
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
                DB::commit();
            }
            return response()->json(['message' => 'Berhasil mengupdate data pada monitoring'], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
    public function get_rekap_wilayah($tipe, $kode)
    {

        if ($tipe == "kabkot") {
            $rekap_kabkot = DB::table('kabkot_summary')->get();
            $data = [];
            foreach ($rekap_kabkot as  $kabkot) {
                # code...
                $data[] = [
                    "name" => $kabkot->kabkot,
                    "error" => $kabkot->dok_error,
                    "warning" => $kabkot->dok_warning,
                    "clean" => $kabkot->dok_clean,
                    "target" => $kabkot->jumlah_dok,
                    "tipe" => "nks",
                    "kode" => $kabkot->kode_kabkot,
                    "fullcode" => "71" . $kabkot->kode_kabkot,
                ];
            }
            return response()->json($data, 200);
        }
        if ($tipe == "nks") {
            $rekap_nks = DB::table('nks_summary');
            if ($kode != '00') {
                $rekap_nks = $rekap_nks->where('kode_kabkot', $kode);
            }
            $rekap_nks = $rekap_nks->get();
            $data = [];
            foreach ($rekap_nks as  $nks) {
                # code...
                $temp = [
                    "name" => $nks->nks,
                    "error" => $nks->dok_error,
                    "warning" => $nks->dok_warning,
                    "clean" => $nks->dok_clean,
                    "target" => $nks->jumlah_dok,
                    "tipe" => "null",
                    "kode" => $kode,
                ];
                $temp["fullcode"] = $temp["name"];
                $data[] = $temp;
            }
            return response()->json($data, 200);
        }

        return response()->json([], 200);
    }
    private function konsumsi_perkapita_total($kode_kabkot)
    {
        $konsumsi_ruta = Konsumsi::with(["komoditas"])->whereHas("ruta", function (Builder $query) use ($kode_kabkot) {
            $query->where("status_dok", "like", "clean")
                ->where("kode_kabkot", $kode_kabkot);
        })
            
            ->where("volume_total",">",0)
            ->get();

        return $konsumsi_ruta;
    }
    public function update_dashboard()
    {
        $konsumsi_perkapita = $this->konsumsi_perkapita_total("08");
        return response()->json($konsumsi_perkapita, 200);
    }
}
