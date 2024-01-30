<?php

namespace Database\Seeders;

use App\Models\MasterJabatan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterJabatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'nama' => 'Kepala Badan Pusat Statistik Provinsi',
                'tingkat' => 'Eselon II',
                'jenis' => 'Struktural',
            ],
            [
                'id' => 2,
                'nama' => 'Kepala Bagian Umum',
                'tingkat' => 'Eselon III',
                'jenis' => 'Struktural',
            ],
            [
                'id' => 3,
                'nama' => 'Pranata Komputer',
                'tingkat' => 'Ahli Pertama',
                'jenis' => 'Fungsional',
            ],
            [
                'id' => 4,
                'nama' => 'Pranata Komputer',
                'tingkat' => 'Ahli Muda',
                'jenis' => 'Fungsional',
            ],
            [
                'id' => 5,
                'nama' => 'Statistisi',
                'tingkat' => 'Ahli Pertama',
                'jenis' => 'Fungsional',
            ],
            [
                'id' => 6,
                'nama' => 'Statistisi',
                'tingkat' => 'Ahli Muda',
                'jenis' => 'Fungsional',
            ],
            [
                'id' => 7,
                'nama' => 'Statistisi',
                'tingkat' => 'Ahli Madya',
                'jenis' => 'Fungsional',
            ],
            [
                'id' => 8,
                'nama' => 'Pranata Komputer',
                'tingkat' => 'Ahli Madya',
                'jenis' => 'Fungsional',
            ],
            [
                'id' => 9,
                'nama' => 'Arsiparis',
                'tingkat' => 'Ahli Muda',
                'jenis' => 'Fungsional',
            ],
            [
                'id' => 10,
                'nama' => 'Pelaksana',
                'tingkat' => '-',
                'jenis' => 'Pelaksana',
            ],
        ];

        MasterJabatan::insert($data);
    }
}
