<?php

namespace Database\Seeders;

use App\Models\MasterWilayah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MasterWilayahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file_name = 'database\seeders\master_wilayah.csv';
        if (Storage::exists($file_name)) {
            $csv_data = Storage::get($file_name);
        } else {
            $csv_data = file_get_contents($file_name);
        }
        $lines = preg_split("/\r\n|\n|\r/", $csv_data);
        $rows = array_map('str_getcsv', $lines);
        $headers = array_shift($rows);
        // dd($lines);
        foreach ($rows as $index => $row) {
            $wilayah = new MasterWilayah(
                [
                    'kode_prov' => $row[0],
                    'kode_kabkot' => $row[2],
                    'kode_kec' => $row[4],
                    'kode_desa' => $row[6],

                    'prov' => $row[1],
                    'kabkot' => $row[3],
                    'kec' => $row[5],
                    'desa' => $row[7],
                    'klas' => $row[8],
                    'kode_bs4' => $row[9],
                    'nks' => $row[10],

                ]
            );
            $wilayah->save();
        }
    }
}
