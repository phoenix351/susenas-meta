<?php

namespace Database\Seeders;

use App\Models\DaftarValidasiModel;
use App\Models\Nks;
use Illuminate\Database\Seeder;


class DaftarValidasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = [
            'blok' => 'Quality Control',
            'nama_variabel' => 'blokqc_3',
            'deskripsi_variabel' => 'Jumlah Komoditas Non Makanan',
            'nama_rule' => 'min',
            'value' => 1
        ];

        DaftarValidasiModel::create($data);
    }
}