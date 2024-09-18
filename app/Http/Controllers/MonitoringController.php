<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MonitoringController extends Controller
{


    public function index()
    {

        return Inertia::render('Dashboard');
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
                DB::commit();
            }
            return response()->json(['message' => 'Berhasil mengupdate data pada monitoring'], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
