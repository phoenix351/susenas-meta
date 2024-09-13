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
            ['kode_provinsi' => '71', 'kode' =>    '01',    'nama' => "BOLAANG MONGONDOW", 'garis_kemiskinan' => 415628],
            ['kode_provinsi' => '71', 'kode' =>    '02',    'nama' => "MINAHASA", 'garis_kemiskinan' => 352693],
            ['kode_provinsi' => '71', 'kode' =>    '03',    'nama' => "KEPULAUAN SANGIHE", 'garis_kemiskinan' => 328431],
            ['kode_provinsi' => '71', 'kode' =>    '04',    'nama' => "KEPULAUAN TALAUD", 'garis_kemiskinan' => 364581],
            ['kode_provinsi' => '71', 'kode' =>    '05',    'nama' => "MINAHASA SELATAN", 'garis_kemiskinan' => 435428],
            ['kode_provinsi' => '71', 'kode' =>    '06',    'nama' => "MINAHASA UTARA", 'garis_kemiskinan' => 427412],
            ['kode_provinsi' => '71', 'kode' =>    '07',    'nama' => "BOLAANG MONGONDOW UTARA", 'garis_kemiskinan' => 334448],
            ['kode_provinsi' => '71', 'kode' =>    '08',    'nama' => "SIAU TAGULANDANG BIARO", 'garis_kemiskinan' => 388056],
            ['kode_provinsi' => '71', 'kode' =>    '09',    'nama' => "MINAHASA TENGGARA", 'garis_kemiskinan' => 402654],
            ['kode_provinsi' => '71', 'kode' =>    '10',    'nama' => "BOLAANG MONGONDOW SELATAN", 'garis_kemiskinan' => 419865],
            ['kode_provinsi' => '71', 'kode' =>    '11',    'nama' => "BOLAANG MONGONDOW TIMUR", 'garis_kemiskinan' => 433873],
            ['kode_provinsi' => '71', 'kode' =>    '72',    'nama' => "BITUNG", 'garis_kemiskinan' => 540888],
            ['kode_provinsi' => '71', 'kode' =>    '71',    'nama' => "MANADO", 'garis_kemiskinan' => 518405],
            ['kode_provinsi' => '71', 'kode' =>    '73',    'nama' => "TOMOHON", 'garis_kemiskinan' => 530321],
            ['kode_provinsi' => '71', 'kode' =>    '74',    'nama' => "KOTAMOBAGU", 'garis_kemiskinan' => 452245],
            ['kode_provinsi' => '71', 'kode' =>    '00',    'nama' => "PROVINSI SULAWESI UTARA", 'garis_kemiskinan' => 490719],

        ];
        Kabkot::insert($data);
    }
}
