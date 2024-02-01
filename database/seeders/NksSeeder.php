<?php

namespace Database\Seeders;

use App\Models\Nks;
use Illuminate\Database\Seeder;


class NksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['kode_kabkot' =>    '01',    'kode_nks' => "010000", 'semester'=>'1'],
            ['kode_kabkot' =>    '01',    'kode_nks' => "100305", 'semester'=>'1'],
            ['kode_kabkot' =>    '02',    'kode_nks' => "020000", 'semester'=>'1'],
            ['kode_kabkot' =>    '03',    'kode_nks' => "030000", 'semester'=>'1'],
            ['kode_kabkot' =>    '04',    'kode_nks' => "040000", 'semester'=>'1'],
            ['kode_kabkot' =>    '05',    'kode_nks' => "050000", 'semester'=>'1'],
            ['kode_kabkot' =>    '06',    'kode_nks' => "060000", 'semester'=>'1'],
            ['kode_kabkot' =>    '07',    'kode_nks' => "070000", 'semester'=>'1'],
            ['kode_kabkot' =>    '08',    'kode_nks' => "080000", 'semester'=>'1'],
            ['kode_kabkot' =>    '09',    'kode_nks' => "090000", 'semester'=>'1'],
            ['kode_kabkot' =>    '10',    'kode_nks' => "100000", 'semester'=>'1'],
            ['kode_kabkot' =>    '11',    'kode_nks' => "110000", 'semester'=>'1'],
            ['kode_kabkot' =>    '71',    'kode_nks' => "150000", 'semester'=>'1'],
            ['kode_kabkot' =>    '73',    'kode_nks' => "170000", 'semester'=>'1'],
            ['kode_kabkot' =>    '72',    'kode_nks' => "120000", 'semester'=>'1'],
            ['kode_kabkot' =>    '74',    'kode_nks' => "130000", 'semester'=>'1'],
            ['kode_kabkot' =>    '01',    'kode_nks' => "010000", 'semester'=>'2'],
            ['kode_kabkot' =>    '01',    'kode_nks' => "100305", 'semester'=>'2'],
            ['kode_kabkot' =>    '02',    'kode_nks' => "020000", 'semester'=>'2'],
            ['kode_kabkot' =>    '03',    'kode_nks' => "030000", 'semester'=>'2'],
            ['kode_kabkot' =>    '04',    'kode_nks' => "040000", 'semester'=>'2'],
            ['kode_kabkot' =>    '05',    'kode_nks' => "050000", 'semester'=>'2'],
            ['kode_kabkot' =>    '06',    'kode_nks' => "060000", 'semester'=>'2'],
            ['kode_kabkot' =>    '07',    'kode_nks' => "070000", 'semester'=>'2'],
            ['kode_kabkot' =>    '08',    'kode_nks' => "080000", 'semester'=>'2'],
            ['kode_kabkot' =>    '09',    'kode_nks' => "090000", 'semester'=>'2'],
            ['kode_kabkot' =>    '10',    'kode_nks' => "100000", 'semester'=>'2'],
            ['kode_kabkot' =>    '11',    'kode_nks' => "110000", 'semester'=>'2'],
            ['kode_kabkot' =>    '71',    'kode_nks' => "150000", 'semester'=>'2'],
            ['kode_kabkot' =>    '73',    'kode_nks' => "170000", 'semester'=>'2'],
            ['kode_kabkot' =>    '72',    'kode_nks' => "120000", 'semester'=>'2'],
            ['kode_kabkot' =>    '74',    'kode_nks' => "130000", 'semester'=>'2'],

        ];
        Nks::insert($data);
    }
}