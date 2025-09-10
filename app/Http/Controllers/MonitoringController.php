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
            ->join("komoditas", "id_komoditas", "=", "id");
        if ($kode_kabkot != "00") {
            $rekap_komoditas = $rekap_komoditas
                ->where("kode_kabkot", "like", $kode_kabkot);
        }

        $rekap_komoditas = $rekap_komoditas
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
        // Cooldown: skip heavy work if recently updated
        $last = DB::table('monitoring_update')->latest('created_at')->first();
        if ($last) {
            $minutes = Carbon::parse($last->created_at)->diffInMinutes(now());
            if ($minutes < 30) {
                return response()->json(["status" => "Sudah diupdate dalam 30 menit terakhir"], 200);
            }
        }

        // ---- Build fast, pre-aggregated sources --------------------------------

        // Target & name per kab/kot taken from master_wilayah
        $mwKabkot = DB::table('master_wilayah')
            ->select(
                'kode_prov',
                'kode_kabkot',
                DB::raw('MAX(kabkot) as kabkot'),
                DB::raw('COUNT(DISTINCT nks) as target_nks')
            )
            ->groupBy('kode_prov', 'kode_kabkot');

        // Documents summary per kab/kot from vsusenas_mak
        $makKabkot = DB::table('vsusenas_mak')
            ->select(
                'kode_prov',
                'kode_kabkot',
                DB::raw('COUNT(DISTINCT id) as jumlah_dok'),
                DB::raw('COUNT(DISTINCT CASE WHEN status_dok = "error" THEN id END) as dok_error'),
                DB::raw('COUNT(DISTINCT CASE WHEN status_dok = "warning" THEN id END) as dok_warning'),
                DB::raw('COUNT(DISTINCT CASE WHEN status_dok = "clean" THEN id END) as dok_clean')
            )
            ->groupBy('kode_prov', 'kode_kabkot');

        // Join the two pre-aggregations
        $rekap_kabkot = DB::query()
            ->fromSub($mwKabkot, 'mw')
            ->leftJoinSub($makKabkot, 'mk', function ($j) {
                $j->on('mw.kode_prov', '=', 'mk.kode_prov')
                    ->on('mw.kode_kabkot', '=', 'mk.kode_kabkot');
            })
            ->select(
                'mw.kode_prov',
                'mw.kode_kabkot',
                'mw.kabkot',
                DB::raw('mw.target_nks'),
                DB::raw('COALESCE(mk.jumlah_dok, 0) as jumlah_dok'),
                DB::raw('COALESCE(mk.dok_error, 0) as dok_error'),
                DB::raw('COALESCE(mk.dok_warning, 0) as dok_warning'),
                DB::raw('COALESCE(mk.dok_clean, 0) as dok_clean')
            )
            ->get()
            ->map(fn($r) => (array) $r)
            ->all();

        // NKS-level: target “universe” from master_wilayah (distinct NKS with a kabkot name)
        $mwNks = DB::table('master_wilayah')
            ->select(
                'kode_prov',
                'kode_kabkot',
                'nks',
                DB::raw('MAX(kabkot) as kabkot')
            )
            ->groupBy('kode_prov', 'kode_kabkot', 'nks');

        // NKS-level documents summary
        $makNks = DB::table('vsusenas_mak')
            ->select(
                'kode_prov',
                'kode_kabkot',
                'nks',
                DB::raw('COUNT(DISTINCT id) as jumlah_dok'),
                DB::raw('COUNT(DISTINCT CASE WHEN status_dok = "error" THEN id END) as dok_error'),
                DB::raw('COUNT(DISTINCT CASE WHEN status_dok = "warning" THEN id END) as dok_warning'),
                DB::raw('COUNT(DISTINCT CASE WHEN status_dok = "clean" THEN id END) as dok_clean')
            )
            ->groupBy('kode_prov', 'kode_kabkot', 'nks');

        $rekap_nks = DB::query()
            ->fromSub($mwNks, 'mw')
            ->leftJoinSub($makNks, 'mk', function ($j) {
                $j->on('mw.kode_prov', '=', 'mk.kode_prov')
                    ->on('mw.kode_kabkot', '=', 'mk.kode_kabkot')
                    ->on('mw.nks', '=', 'mk.nks');
            })
            ->select(
                'mw.kode_prov',
                'mw.kode_kabkot',
                'mw.nks',
                'mw.kabkot',
                DB::raw('COALESCE(mk.jumlah_dok, 0) as jumlah_dok'),
                DB::raw('COALESCE(mk.dok_error, 0) as dok_error'),
                DB::raw('COALESCE(mk.dok_warning, 0) as dok_warning'),
                DB::raw('COALESCE(mk.dok_clean, 0) as dok_clean')
            )
            ->get()
            ->map(fn($r) => (array) $r)
            ->all();

        // ---- Persist atomically --------------------------------------------------

        // Helper: chunked upsert
        $upsertChunked = function (string $table, array $rows, array $uniqueBy, array $updateCols, int $size = 1000) {
            foreach (array_chunk($rows, $size) as $chunk) {
                DB::table($table)->upsert($chunk, $uniqueBy, $updateCols);
            }
        };
        // ---- Normalize helpers (NO LPAD in SQL) -----------------------------------
        $normalizeKabkotRow = function (array $r): array {
            // prov -> 2 digits; kabkot -> last 2 digits, then left-pad to 2
            $r['kode_prov']   = str_pad(trim((string)$r['kode_prov']), 2, '0', STR_PAD_LEFT);
            $kab              = substr(trim((string)$r['kode_kabkot']), -2);  // '0001' -> '01'
            $r['kode_kabkot'] = str_pad($kab, 2, '0', STR_PAD_LEFT);          // '1' -> '01'
            $r['kabkot']      = isset($r['kabkot']) ? trim((string)$r['kabkot']) : null;
            // numeric defaults
            foreach (['target_nks', 'jumlah_dok', 'dok_error', 'dok_warning', 'dok_clean'] as $c) {
                $r[$c] = (float)($r[$c] ?? 0);
            }
            return $r;
        };

        $normalizeNksRow = function (array $r): array {
            $r['kode_prov']   = str_pad(trim((string)$r['kode_prov']), 2, '0', STR_PAD_LEFT);
            $kab              = substr(trim((string)$r['kode_kabkot']), -2);
            $r['kode_kabkot'] = str_pad($kab, 2, '0', STR_PAD_LEFT);
            $r['nks']         = trim((string)$r['nks']);
            $r['kabkot']      = isset($r['kabkot']) ? trim((string)$r['kabkot']) : null;
            foreach (['jumlah_dok', 'dok_error', 'dok_warning', 'dok_clean'] as $c) {
                $r[$c] = (float)($r[$c] ?? 0);
            }
            return $r;
        };

        // Collapse rows that became identical after normalization (sum the metrics)
        $collapse = function (array $rows, array $keys, array $sumCols): array {
            $acc = [];
            foreach ($rows as $r) {
                $k = implode('|', array_map(fn($c) => $r[$c], $keys));
                if (!isset($acc[$k])) {
                    $acc[$k] = $r;
                } else {
                    foreach ($sumCols as $c) {
                        $acc[$k][$c] += (float)$r[$c];
                    }
                    // keep the first kabkot name (or choose MAX/trim if you prefer)
                    if (isset($r['kabkot']) && $r['kabkot'] && empty($acc[$k]['kabkot'])) {
                        $acc[$k]['kabkot'] = $r['kabkot'];
                    }
                }
            }
            return array_values($acc);
        };

        // ---- Apply normalization + collapse before UPSERT --------------------------
        $rekap_kabkot = array_map($normalizeKabkotRow, $rekap_kabkot);
        $rekap_kabkot = $collapse(
            $rekap_kabkot,
            ['kode_prov', 'kode_kabkot'],
            ['target_nks', 'jumlah_dok', 'dok_error', 'dok_warning', 'dok_clean']
        );

        $rekap_nks = array_map($normalizeNksRow, $rekap_nks);
        $rekap_nks = $collapse(
            $rekap_nks,
            ['kode_prov', 'kode_kabkot', 'nks'],
            ['jumlah_dok', 'dok_error', 'dok_warning', 'dok_clean']
        );


        try {
            DB::transaction(function () use ($rekap_kabkot, $rekap_nks, $upsertChunked) {
                // Ensure you have UNIQUE indexes that match the keys below
                // kabkot_summary UNIQUE (kode_prov, kode_kabkot)
                // nks_summary    UNIQUE (kode_prov, kode_kabkot, nks)

                $upsertChunked(
                    'kabkot_summary',
                    $rekap_kabkot,
                    ['kode_prov', 'kode_kabkot'],
                    ['kabkot', 'target_nks', 'jumlah_dok', 'dok_error', 'dok_warning', 'dok_clean']
                );

                $upsertChunked(
                    'nks_summary',
                    $rekap_nks,
                    ['kode_prov', 'kode_kabkot', 'nks'],
                    ['kabkot', 'jumlah_dok', 'dok_error', 'dok_warning', 'dok_clean']
                );

                DB::table('monitoring_update')->insert([
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }, 3); // up to 3 retries on deadlocks

            return response()->json(['message' => 'Berhasil mengupdate data pada monitoring'], 201);
        } catch (\Throwable $e) {
            // If anything fails, the transaction is rolled back automatically
            report($e);
            return response()->json(['message' => 'Gagal mengupdate monitoring', 'error' => $e->getMessage()], 500);
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
                    "target" => $kabkot->target_nks * 10,
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

    private function get_total_kapita(string $kode_kabkot): float
    {
        $query = SusenasMak::where('status_dok', 'clean');

        if ($kode_kabkot !== '00') {
            $query->where('kode_kabkot', $kode_kabkot);
        }

        return (float) $query->sum('wtf_1');
    }



    private function get_konsumsi_ruta_total(string $kode_kabkot): array
    {
        // Resolve table names from models to avoid hardcoding
        $konsumsiTbl = (new \App\Models\Konsumsi)->getTable();   // e.g. 'konsumsi'
        $komoditasTbl = (new \App\Models\Komoditas)->getTable(); // e.g. 'komoditas'
        $rutaTbl      = (new \App\Models\SusenasMak())->getTable();      // e.g. 'ruta' / 'susenas_mak'

        $row = DB::table("$konsumsiTbl as k")
            ->join("$komoditasTbl as m", 'm.id', '=', 'k.id_komoditas')
            ->join("$rutaTbl as r", 'r.id', '=', 'k.id_ruta')
            ->where('k.volume_total', '>', 0)
            ->where('r.status_dok', 'clean')               // exact match (faster than LIKE)
            ->when($kode_kabkot !== '00', fn($q) => $q->where('r.kode_kabkot', $kode_kabkot))
            ->selectRaw('
            COALESCE(SUM(k.volume_total * m.kalori), 0) AS total,
            COALESCE(SUM(CASE WHEN m.flag_basket = 1 THEN k.volume_total * m.kalori ELSE 0 END), 0) AS basket
        ')
            ->first();

        return [
            'total'  => (float) ($row->total ?? 0),
            'basket' => (float) ($row->basket ?? 0),
        ];
    }



    private function get_konsumsi_art_total(string $kode_kabkot): array
    {
        // Resolve actual table names from the models
        $kaTbl = (new \App\Models\KonsumsiArt)->getTable();   // e.g. 'konsumsi_art'
        $komTbl = (new \App\Models\Komoditas)->getTable();    // e.g. 'komoditas'
        $angTbl = (new \App\Models\AnggotaRuta)->getTable();  // e.g. 'anggota_ruta'
        $rutaTbl = (new \App\Models\SusenasMak())->getTable();        // e.g. 'ruta' / 'susenas_mak'

        $row = DB::table("$kaTbl as k")
            ->join("$komTbl as m", 'm.id', '=', 'k.id_komoditas')
            ->join("$angTbl as a", 'a.id', '=', 'k.id_art')
            ->join("$rutaTbl as r", 'r.id', '=', 'a.id_ruta')
            ->where('k.volume_total', '>', 0)
            ->where('r.status_dok', 'clean') // exact match lets indexes work
            ->when($kode_kabkot !== '00', fn($q) => $q->where('r.kode_kabkot', $kode_kabkot))
            ->selectRaw('
            COALESCE(SUM(k.volume_total * m.kalori), 0) AS total,
            COALESCE(SUM(CASE WHEN m.flag_basket = 1 THEN k.volume_total * m.kalori ELSE 0 END), 0) AS basket
        ')
            ->first();

        return [
            'total'  => (float) ($row->total ?? 0),
            'basket' => (float) ($row->basket ?? 0),
        ];
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



    private function komoditas_summary(string $kode_kabkot)
    {
        // ---- Subquery 1: konsumsi (per-Ruta) -----------------------------------
        $qKonsumsi = DB::table('konsumsi as k')
            ->join('komoditas as m', 'm.id', '=', 'k.id_komoditas')
            ->join('vsusenas_mak as r', 'r.id', '=', 'k.id_ruta')
            ->where('k.volume_total', '>', 0)
            ->where('r.status_dok', '=', 'clean')
            ->when($kode_kabkot !== '00', fn($q) => $q->where('r.kode_kabkot', $kode_kabkot))
            ->groupBy('k.id_komoditas')
            ->selectRaw('
            k.id_komoditas,
            SUM(k.volume_total)                                 AS sum_volume,
            SUM(m.kalori * k.volume_total)                      AS sum_kalori,
            SUM(k.harga_total)                                  AS sum_harga_total
        ');

        // ---- Subquery 2: konsumsi_art (per-Anggota) -----------------------------
        $qKonsumsiArt = DB::table('konsumsi_art as ka')
            ->join('komoditas as m', 'm.id', '=', 'ka.id_komoditas')
            ->join('anggota_ruta as a', 'a.id', '=', 'ka.id_art')
            ->join('vsusenas_mak as r', 'r.id', '=', 'a.id_ruta')
            ->where('ka.volume_total', '>', 0)
            ->where('r.status_dok', '=', 'clean')
            ->when($kode_kabkot !== '00', fn($q) => $q->where('r.kode_kabkot', $kode_kabkot))
            ->groupBy('ka.id_komoditas')
            ->selectRaw('
            ka.id_komoditas,
            SUM(ka.volume_total)                                AS sum_volume,
            SUM(m.kalori * ka.volume_total)                     AS sum_kalori,
            SUM(ka.harga_total)                                 AS sum_harga_total
        ');

        // ---- Union + final aggregation with weighted avg ------------------------
        $rows = DB::query()
            ->fromSub(
                $qKonsumsi->unionAll($qKonsumsiArt),
                'u'
            )
            ->groupBy('u.id_komoditas')
            ->selectRaw('
            u.id_komoditas,
            SUM(u.sum_volume)                        AS sum_volume,
            SUM(u.sum_kalori)                        AS sum_kalori,
            CASE WHEN SUM(u.sum_volume) > 0
                 THEN SUM(u.sum_harga_total) / SUM(u.sum_volume)
                 ELSE 0 END                          AS average_harga_satuan
        ')
            ->get();

        return $rows;
    }


    public function hitung_summary_kabupaten_kota(string $kode_kabkot)
    {
        // 1) Count clean docs
        $jumlah_ruta = DB::table('vsusenas_mak')
            ->where('status_dok', 'clean')
            ->when($kode_kabkot !== '00', fn($q) => $q->where('kode_kabkot', $kode_kabkot))
            ->count('id');

        if ($jumlah_ruta === 0) {
            return; // nothing to update
        }

        // 2) Per-kapita metrics
        $konsumsi            = $this->konsumsi_perkapita_total($kode_kabkot);

        // dd($konsumsi);
        $konsumsi_total      = round((float)($konsumsi['total']  ?? 0), 3);
        $konsumsi_basket     = round((float)($konsumsi['basket'] ?? 0), 3);
        $jumlah_individu     = (int)  ($konsumsi['jumlah_individu'] ?? 0);
        // dd([
        //     $kode_kabkot,
        //     $jumlah_ruta,
        //     $jumlah_individu,
        //     $konsumsi_total,
        //     $konsumsi_basket
        // ]);

        // 3) Aggregate row (id_komoditas = 0 sentinel)
        $aggRow = [
            'kode_kabkot'                           => $kode_kabkot,
            'id_komoditas'                          => 0, // sentinel for TOTAL row
            'sum_volume'                            => 0,  // keep numeric defaults; optional
            'sum_kalori'                            => 0,
            'average_harga'                         => 0,
            'created_at'                            => now(),
            'updated_at'                            => now(),
        ];

        // 4) Per-komoditas rows
        $komoditas_summary = $this->komoditas_summary($kode_kabkot);
        // dd($komoditas_summary);
        $now = now();
        $detailRows = [];
        foreach ($komoditas_summary as $k) {
            $detailRows[] = [
                'kode_kabkot'   => $kode_kabkot,
                'id_komoditas'  => (int)$k->id_komoditas,
                'sum_volume'    => (float)$k->sum_volume,
                'sum_kalori'    => (float)$k->sum_kalori,
                'average_harga' => (float)$k->average_harga_satuan,
                'created_at'    => $now,
                'updated_at'    => $now,
            ];
        }

        // 5) Optionally mirror headline numbers to kabkot_summary (non-"00")
        $kabkotRow = [
            'konsumsi_perkapita_total'            => $konsumsi_total,
            'konsumsi_perkapita_basket_komoditas' => $konsumsi_basket,
            'jumlah_individu'                     => $jumlah_individu,
            'jumlah_ruta'                         => $jumlah_ruta,
        ];

        // 6) Atomic save
        DB::transaction(function () use ($kode_kabkot, $aggRow, $detailRows, $kabkotRow) {
            // Upsert TOTAL row (id_komoditas = 0) into komoditas_kabkot_summary
            DB::table('komoditas_kabkot_summary')->upsert(
                [$aggRow],
                ['kode_kabkot', 'id_komoditas'],
                [
                    'sum_volume',
                    'sum_kalori',
                    'average_harga',
                    'updated_at'
                ]
            );

            // Upsert per-komoditas rows (chunked)
            if (!empty($detailRows)) {
                foreach (array_chunk($detailRows, 1000) as $chunk) {
                    DB::table('komoditas_kabkot_summary')->upsert(
                        $chunk,
                        ['kode_kabkot', 'id_komoditas'],
                        ['sum_volume', 'sum_kalori', 'average_harga', 'updated_at']
                    );
                }
            }

            // Mirror to kabkot_summary (optional, only if kab/kot != "00")
            if ($kode_kabkot !== '00') {
                // dd($kabkotRow);
                DB::table('kabkot_summary')
                    ->where('kode_kabkot', $kode_kabkot)
                    ->update($kabkotRow);
            }
        });
    }


    public function update_dashboard()
    {
        // Disable the execution time limit for this request
        set_time_limit(0);

        // $this->hitung_summary_kabupaten_kota("06");
        $daftar_kabkot = DB::table('kabkot')
            ->selectRaw("LPAD(kode, 2, '0') as kode")
            ->where('kode', '!=', '00') // exclude "00" (Provinsi)
            ->get();
        // dd($daftar_kabkot[0]->kode);
        $up = [];
        foreach ($daftar_kabkot as $kabkot) {
            # code...
            // if (!$kabkot->kode == "06") {
            //     continue;
            // }


            $this->hitung_summary_kabupaten_kota($kabkot->kode);
            $up[] = $kabkot->kode;
            // continue;
        }
        return response()->json([
            "message" => "selesai menghitung summary",
            "updated" => $up
        ], 200);
    }
}
