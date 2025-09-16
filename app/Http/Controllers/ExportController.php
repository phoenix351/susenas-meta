<?php

namespace App\Http\Controllers;

use App\Models\KonsumsiArt;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    public function konsumsi_art()
    {
        // Implement export logic here
        set_time_limit(0);

        $table_name = 'konsumsi_art';
        $filename = $table_name . '_' . date('Ymd_His') . '.csv';

        $headers = [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => "attachment; filename={$filename}",
        ];

        $columns = [
            'kode_kabkot',
            'nks',
            'nus',
            'jumlah_art',
            'ID Ruta',
            'ID ART',
            'Nama ART',
            'Kode Komoditas',
            'Komoditas',
            'Satuan',
            'Volume Beli',
            'Volume Produksi',
            'Volume Total',
            'Harga Beli',
            'Harga Produksi',
            'Harga Total',
        ];

        $callback = function () use ($columns) {
            if (ob_get_level()) {
                ob_end_clean();
            }

            $file = fopen('php://output', 'w');

            // (Optional) add BOM for Excel compatibility
            // fwrite($file, "\xEF\xBB\xBF");

            // write header
            fputcsv($file, $columns, ';');

            // stream rows in chunks to avoid high memory usage
            $page    = 1;
            $perPage = 1000;

            do {
                $rows = \App\Models\KonsumsiArt::with(['anggota_ruta.ruta', 'komoditas'])
                    ->orderBy('id_art')
                    ->orderBy('id_komoditas')
                    ->forPage($page, $perPage)
                    ->get();

                foreach ($rows as $item) {
                    $ruta      = $item->anggota_ruta->ruta ?? null;
                    $anggota   = $item->anggota_ruta ?? null;
                    $komoditas = $item->komoditas ?? null;

                    $row = [
                        $ruta->kode_kabkot ?? '',
                        $ruta->nks ?? '',
                        $ruta->r109 ?? '',
                        $ruta->wtf_1 ?? '',
                        $anggota->id_ruta ?? '',
                        $anggota->id ?? '',
                        $anggota->nama ?? '',
                        $komoditas->id ?? '',
                        $komoditas->nama ?? '',
                        $item->satuan ?? ($komoditas->satuan ?? ''),
                        $item->volume_beli ?? '',
                        $item->harga_beli ?? '',
                        $item->volume_produksi ?? '',
                        $item->harga_produksi ?? '',
                        $item->volume_total ?? '',
                        $item->harga_total ?? '',
                    ];

                    fputcsv($file, $row, ';');
                }

                fflush($file); // flush each page

                $page++;
            } while ($rows->isNotEmpty());

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
