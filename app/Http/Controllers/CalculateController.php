<?php

namespace App\Http\Controllers;

use App\Models\SusenasMak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CalculateController extends Controller
{
    public function index()
    {

        $daftar_ruta = SusenasMak::whereIn('status_dok', ['clean', 'warning'])->pluck('id');
        // return response()->json(['daftar_ruta' => $daftar_ruta], 200);
        return Inertia::render('Provinsi/Calculate/index', ['data' => $daftar_ruta]);
    }
    public function export($table_name)
    {
        // Disable the execution time limit for this request
        set_time_limit(0);

        $filename = $table_name . '_' . date('Ymd_His') . '.csv';
        $headers = [
            "Content-Type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
        ];

        $callback = function () use ($table_name) {
            if (ob_get_level()) {
                ob_end_clean();
            }
            $file = fopen('php://output', 'w');

            // Get Column Names Dynamically
            $firstRow = DB::table($table_name)->first();
            if ($firstRow) {
                $columns = array_keys((array) $firstRow); // Convert object to array
                fputcsv($file, $columns, ";"); // Write header once
            }
            $firstColumn = $columns[0] ?? null;
            // Stream Data in Chunks
            DB::table($table_name)
                ->orderBy($firstColumn)
                ->chunk(1000, function ($rows) use ($file) {
                    foreach ($rows as $row) {
                        fputcsv($file, (array) $row, ";"); // Convert object to array
                    }
                    flush();
                });


            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
