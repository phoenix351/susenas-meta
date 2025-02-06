<?php

namespace App\Http\Controllers;

use App\Jobs\UpdateDashboardJob;
use App\Models\Kabkot;
use App\Models\Konsumsi;
use App\Models\KonsumsiArt;
use App\Models\SusenasMak;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;

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

    public function get_rekap_kabkot($kode_kabkot)
    {
        $rekap_kabkot = DB::table('kabkot_summary')
            ->join("kabkot", "kode_kabkot", "=", "kode")
            ->select("kabkot_summary.*", "kabkot.garis_kemiskinan")
            ->where("kode_kabkot", "like", $kode_kabkot)
            ->first();

        return response()->json($rekap_kabkot, 200);
    }
    public function get_rekap_komoditas($kode_kabkot)
    {
        $rekap_komoditas = DB::table('komoditas_kabkot_summary')
            ->join("komoditas", "id_komoditas", "=", "id")
            ->where("kode_kabkot", "like", $kode_kabkot)
            ->orderBy("id_komoditas", "asc")
            ->get();
        return response()->json($rekap_komoditas, 200);
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

    private function get_total_kapita($kode_kabkot)
    {
        $total_kapita = SusenasMak::where("status_dok", "like", "clean")
            ->where("kode_kabkot", $kode_kabkot)
            ->selectRaw("sum(wtf_1) as jumlah_kapita")
            ->first();
        return $total_kapita ? (float)$total_kapita->jumlah_kapita : (float)0;
    }

    private function get_konsumsi_total($model, $relationship, $kode_kabkot, $nestedRelationship = null)
    {
        $query = $model::with(["komoditas"])
            ->whereHas($relationship, function (Builder $query_) use ($kode_kabkot, $nestedRelationship) {
                if ($nestedRelationship) {
                    $query_->whereHas($nestedRelationship, function (Builder $query__) use ($kode_kabkot) {
                        $query__->where("status_dok", "like", "clean")
                            ->where("kode_kabkot", $kode_kabkot);
                    });
                } else {
                    $query_->where("status_dok", "like", "clean")
                        ->where("kode_kabkot", $kode_kabkot);
                }
            })
            ->where("volume_total", ">", "0");
        $total_kalori = $query->get()->sum(function ($konsumsi) {
            return $konsumsi->volume_total * $konsumsi->komoditas->kalori;
        });

        $total_kalori_basket = $query->clone()
            ->whereHas("komoditas", function (Builder $query) {
                $query->where("flag_basket", true);
            })
            ->get()
            ->sum(function ($konsumsi) {
                return $konsumsi->volume_total * $konsumsi->komoditas->kalori;
            });
        return [
            "total" => $total_kalori,
            "basket" => $total_kalori_basket
        ];
    }
    private function get_konsumsi_ruta_total($kode_kabkot)
    {
        $total_konsumsi_ruta_kalori = Konsumsi::with(["komoditas"])
            ->whereHas("ruta", function (Builder $query) use ($kode_kabkot) {
                $query->where("status_dok", "like", "clean")
                    ->where("kode_kabkot", $kode_kabkot);
            })
            ->where("volume_total", ">", 0)
            ->get()
            ->sum(function ($konsumsi) {
                return $konsumsi->volume_total * $konsumsi->komoditas->kalori;
            });
        $total_konsumsi_ruta_kalori_basket = Konsumsi::with(["komoditas"])
            ->whereHas("ruta", function (Builder $query) use ($kode_kabkot) {
                $query->where("status_dok", "like", "clean")
                    ->where("kode_kabkot", $kode_kabkot);
            })
            ->where("volume_total", ">", 0)
            ->whereHas("komoditas", function (Builder $query) {
                $query->where("flag_basket", true);
            })
            ->get()
            ->sum(function ($konsumsi) {
                return $konsumsi->volume_total * $konsumsi->komoditas->kalori;
            });


        return ["total" => $total_konsumsi_ruta_kalori, "basket" => $total_konsumsi_ruta_kalori_basket];
    }

    private function get_konsumsi_art_total($kode_kabkot)
    {
        $total_konsumsi_art_kalori = KonsumsiArt::with(["komoditas"])
            ->whereHas("anggota_ruta", function (Builder $query) use ($kode_kabkot) {
                $query->whereHas("ruta", function (Builder $query_2) use ($kode_kabkot) {
                    $query_2->where("status_dok", "like", "clean")
                        ->where("kode_kabkot", $kode_kabkot);
                });
            })
            ->where("volume_total", ">", 0)
            ->get()
            ->sum(function ($konsumsi) {
                return $konsumsi->volume_total * $konsumsi->komoditas->kalori;
            });
        $total_konsumsi_art_kalori_basket = KonsumsiArt::with(["komoditas"])
            ->whereHas("anggota_ruta", function (Builder $query) use ($kode_kabkot) {
                $query->whereHas("ruta", function (Builder $query_2) use ($kode_kabkot) {
                    $query_2->where("status_dok", "like", "clean")
                        ->where("kode_kabkot", $kode_kabkot);
                });
            })
            ->where("volume_total", ">", 0)
            ->whereHas("komoditas", function (Builder $query) {
                $query->where("flag_basket", true);
            })
            ->get()
            ->sum(function ($konsumsi) {
                return $konsumsi->volume_total * $konsumsi->komoditas->kalori;
            });

        return ["total" => $total_konsumsi_art_kalori, "basket" => $total_konsumsi_art_kalori_basket];
    }

    private function konsumsi_perkapita_total($kode_kabkot)
    {
        $jumlah_kapita = $this->get_total_kapita($kode_kabkot);

        // get konsumsi total

        $total_konsumsi_ruta_kalori = $this->get_konsumsi_ruta_total($kode_kabkot);
        $total_konsumsi_art_kalori = $this->get_konsumsi_art_total($kode_kabkot);
        $konsumsi_kalori_perkapita_total = ($total_konsumsi_art_kalori["total"] + $total_konsumsi_ruta_kalori["total"]) * 30 / 7 / $jumlah_kapita;
        $konsumsi_kalori_perkapita_basket_komoditas = ($total_konsumsi_art_kalori["basket"] + $total_konsumsi_ruta_kalori["basket"]) * 30 / 7 / $jumlah_kapita;
        // hitung konsumsi total per kapita
        return [
            "total" => $konsumsi_kalori_perkapita_total,
            "basket" => $konsumsi_kalori_perkapita_basket_komoditas,
            "jumlah_individu" => $jumlah_kapita
        ];
    }

    private function komoditas_summary_c($kode_kabkot)
    {
        // volume, 
        // kalori
        // harga per satuan
        $komoditas_summary_ruta = Konsumsi::with("komoditas")
            ->join('komoditas', 'konsumsi.id_komoditas', '=', 'komoditas.id') // Join with the komoditas table
            ->whereHas("ruta", function (Builder $query) use ($kode_kabkot) {
                $query->where("status_dok", "like", "clean")
                    ->where("kode_kabkot", "like", $kode_kabkot);
            })
            ->where("konsumsi.volume_total", ">", 0) // Specify the table name for clarity
            ->selectRaw("
        konsumsi.id_komoditas,
        sum(konsumsi.volume_total) as sum_volume,
        sum(komoditas.kalori * konsumsi.volume_total) as sum_kalori, 
        avg(konsumsi.harga_total / konsumsi.volume_total) as average_harga_satuan
    ")
            ->groupBy("konsumsi.id_komoditas")
            ->get();

        $komoditas_summary_art = KonsumsiArt::with("komoditas")
            ->join('komoditas', 'konsumsi_art.id_komoditas', '=', 'komoditas.id') // Join with the komoditas table
            ->whereHas("anggota_ruta", function (Builder $query) use ($kode_kabkot) {
                $query->whereHas("ruta", function (Builder $query_2) use ($kode_kabkot) {
                    $query_2->where("status_dok", "like", "clean")
                        ->where("kode_kabkot", $kode_kabkot);
                });
            })
            ->where("konsumsi_art.volume_total", ">", 0) // Specify the table name for clarity
            ->selectRaw("
        konsumsi_art.id_komoditas,
        sum(konsumsi_art.volume_total) as sum_volume,
        sum(komoditas.kalori * konsumsi_art.volume_total) as  sum_kalori, 
        avg(konsumsi_art.harga_total / konsumsi_art.volume_total) as average_harga_satuan
    ")
            ->groupBy("konsumsi_art.id_komoditas")
            ->get();
        // dd($komoditas_summary_ruta);
        // return response()->json($komoditas_summary_ruta, 200);
        dd([$komoditas_summary_ruta, $komoditas_summary_art]);
        return [$komoditas_summary_ruta, $komoditas_summary_art];
    }
    private function komoditas_summary($kode_kabkot)
    {
        $komoditas_summary = DB::table(function ($query) use ($kode_kabkot) {
            $query->selectRaw("
            konsumsi.id_komoditas,
            sum(konsumsi.volume_total) as sum_volume,
            sum(komoditas.kalori * konsumsi.volume_total) as sum_kalori, 
            avg(konsumsi.harga_total / konsumsi.volume_total) as average_harga_satuan
        ")
                ->from("konsumsi")
                ->join("komoditas", "konsumsi.id_komoditas", "=", "komoditas.id")
                ->whereExists(function ($subquery) use ($kode_kabkot) {
                    $subquery->select(DB::raw(1))
                        ->from("vsusenas_mak")
                        ->whereColumn("vsusenas_mak.id", "konsumsi.id_ruta")
                        ->where("vsusenas_mak.status_dok", "clean")
                        ->where("vsusenas_mak.kode_kabkot", $kode_kabkot);
                })
                ->where("konsumsi.volume_total", ">", 0)
                ->groupBy("konsumsi.id_komoditas")

                ->unionAll(
                    DB::table("konsumsi_art")
                        ->selectRaw("
                    konsumsi_art.id_komoditas,
                    sum(konsumsi_art.volume_total) as sum_volume,
                    sum(komoditas.kalori * konsumsi_art.volume_total) as sum_kalori, 
                    avg(konsumsi_art.harga_total / konsumsi_art.volume_total) as average_harga_satuan
                ")
                        ->join("komoditas", "konsumsi_art.id_komoditas", "=", "komoditas.id")
                        ->whereExists(function ($subquery) use ($kode_kabkot) {
                            $subquery->select(DB::raw(1))
                                ->from("anggota_ruta")
                                ->whereColumn("anggota_ruta.id", "konsumsi_art.id_art")
                                ->whereExists(function ($subquery2) use ($kode_kabkot) {
                                    $subquery2->select(DB::raw(1))
                                        ->from("vsusenas_mak")
                                        ->whereColumn("vsusenas_mak.id", "anggota_ruta.id_ruta")
                                        ->where("vsusenas_mak.status_dok", "clean")
                                        ->where("vsusenas_mak.kode_kabkot", $kode_kabkot);
                                });
                        })
                        ->where("konsumsi_art.volume_total", ">", 0)
                        ->groupBy("konsumsi_art.id_komoditas")
                );
        }, 'komoditas_summary')
            ->selectRaw("
        id_komoditas,
        sum(sum_volume) as sum_volume,
        sum(sum_kalori) as sum_kalori,
        avg(average_harga_satuan) as average_harga_satuan
    ")
            ->groupBy("id_komoditas")
            ->get();
        // dd($komoditas_summary);
        return $komoditas_summary;
    }

    public function hitung_summary_kabupaten_kota($kode_kabkot)
    {
        $jumlah_ruta = SusenasMak::selectRaw("count(id) as jumlah_ruta")
            ->where("kode_kabkot", $kode_kabkot)
            ->first()->toArray()["jumlah_ruta"];
        // dd($jumlah_ruta);
        $konsumsi_perkapita = $this->konsumsi_perkapita_total($kode_kabkot);
        $konsumsi_perkapita_total = $konsumsi_perkapita["total"];
        $konsumsi_perkapita_basket_komoditas = $konsumsi_perkapita["basket"];
        DB::table("kabkot_summary")->where("kode_kabkot", "like", $kode_kabkot)->update([
            "konsumsi_perkapita_total" => round($konsumsi_perkapita_total, 3),
            "konsumsi_perkapita_basket_komoditas" => round($konsumsi_perkapita_basket_komoditas, 3),
            "jumlah_individu" => $konsumsi_perkapita["jumlah_individu"],
            "jumlah_ruta" => $jumlah_ruta
        ]);
        $upsertData = [];
        $komoditas_summary = $this->komoditas_summary($kode_kabkot);
        foreach ($komoditas_summary as $komoditas) {
            # code...
            $upsertData[] = [
                "kode_kabkot" => $kode_kabkot,
                "id_komoditas" => $komoditas->id_komoditas,
                "sum_volume" => $komoditas->sum_volume,
                "sum_kalori" => $komoditas->sum_kalori,
                "average_harga" => $komoditas->average_harga_satuan,
                "created_at" => now(),
                "updated_at" => now(),
            ];
        }
        // Perform bulk upsert
        DB::table('komoditas_kabkot_summary')->upsert(
            $upsertData,
            ['kode_kabkot', 'id_komoditas'], // Unique constraints for conflict resolution
            ['sum_volume', 'sum_kalori', 'average_harga', 'updated_at'] // Fields to update if conflict occurs
        );
    }

    public function update_dashboard()
    {
        // $daftar_kabkot = Kabkot::where("kode", "<>", "00")->get();
        // foreach ($daftar_kabkot as $kabkot) {
        //     # code...
        //     $kode_kabkot = $kabkot->kode;
        //     $this->hitung_summary_kabupaten_kota($kode_kabkot);
        // }
        // return response()->json([
        //     "message" => "selesai menghitung summary"
        // ], 200);
        $job = new UpdateDashboardJob();
        $jobId = Queue::push($job);
        return response()->json([
            "message" => "Summary update started",
            "job_id" => $jobId // Return job ID for frontend tracking
        ], 200);
    }
    public function check_job_status($jobId)
    {
        $jobExists = DB::table("jobs")->where("id", $jobId)->exists();
        return response()->json(["status" => $jobExists ? "processing" : "completed"], 200);
    }
}
