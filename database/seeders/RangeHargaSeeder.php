<?php

namespace Database\Seeders;

use App\Models\RangeHarga;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class RangeHargaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file_name = 'public/seeder/range_harga.csv';
        if (Storage::exists($file_name)) {
            $csv_data = Storage::get($file_name);
        } else {
            $csv_data = file_get_contents($file_name);
        }
        $lines = preg_split("/\r\n|\n|\r/", $csv_data);
        $rows = array_map('str_getcsv', $lines);
        $headers = array_shift($rows);
        // dd($lines);
        $daftar_range_harga = [];
        foreach ($rows as $index => $row) {
            if ($index == 0) {
                continue;
            }
            $daftar_range_harga[] =
                [
                    'kode_kabkot' => $row[0],
                    'id_komoditas' => $row[1],
                    'min' => $row[2],
                    'max' => $row[3],
                ];
        }
        RangeHarga::upsert($daftar_range_harga, uniqueBy: ['kode_kabkot',"id_komoditas"], update: ['min','max']);
    }
}
