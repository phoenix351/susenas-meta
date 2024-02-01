<?php

namespace Database\Seeders;

use App\Models\Kabkot;
use Illuminate\Database\Seeder;


class KabkotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['kode_provinsi' => '71', 'kode' =>    '01',    'nama' => "BOLAANG MONGONDOW"],
            ['kode_provinsi' => '71', 'kode' =>    '02',    'nama' => "MINAHASA"],
            ['kode_provinsi' => '71', 'kode' =>    '03',    'nama' => "KEPULAUAN SANGIHE"],
            ['kode_provinsi' => '71', 'kode' =>    '04',    'nama' => "KEPULAUAN TALAUD"],
            ['kode_provinsi' => '71', 'kode' =>    '05',    'nama' => "MINAHASA SELATAN"],
            ['kode_provinsi' => '71', 'kode' =>    '06',    'nama' => "MINAHASA UTARA"],
            ['kode_provinsi' => '71', 'kode' =>    '07',    'nama' => "BOLAANG MONGONDOW UTARA"],
            ['kode_provinsi' => '71', 'kode' =>    '08',    'nama' => "SIAU TAGULANDANG BIARO"],
            ['kode_provinsi' => '71', 'kode' =>    '09',    'nama' => "MINAHASA TENGGARA"],
            ['kode_provinsi' => '71', 'kode' =>    '10',    'nama' => "BOLAANG MONGONDOW SELATAN"],
            ['kode_provinsi' => '71', 'kode' =>    '11',    'nama' => "BOLAANG MONGONDOW TIMUR"],
            ['kode_provinsi' => '71', 'kode' =>    '72',    'nama' => "BITUNG"],
            ['kode_provinsi' => '71', 'kode' =>    '71',    'nama' => "MANADO"],
            ['kode_provinsi' => '71', 'kode' =>    '73',    'nama' => "TOMOHON"],
            ['kode_provinsi' => '71', 'kode' =>    '74',    'nama' => "KOTAMOBAGU"],

        ];
        Kabkot::insert($data);
    }
}
