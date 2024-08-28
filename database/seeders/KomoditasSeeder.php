<?php

namespace Database\Seeders;

use App\Models\Komoditas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class KomoditasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file_name = 'database\seeders\komoditas.csv';
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
            $komoditas = new Komoditas(
                [
                    'id' => $row[0],
                    'nama_komoditas' => $row[1],
                    'id_kelompok' => $row[2],
                    'nama_kelompok' => $row[3],
                    'satuan' => $row[4],
                    'kode_coicop' => $row[5],
                    'kalori' => $row[6],
                    'flag_basket' => $row[7],
                    'type' => $row[8],

                ]
            );
            $komoditas->save();
        }
    }
}
