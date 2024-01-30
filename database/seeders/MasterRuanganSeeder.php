<?php

namespace Database\Seeders;

use App\Models\MasterRuangan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterRuanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['id' => 27, 'nama' => 'IPDS-Ruang Koordinator'],
            ['id' => 28, 'nama' => 'IPDS-Ruang Pegawai'],
            ['id' => 29, 'nama' => 'IPDS-Ruang Pengolahan'],
            ['id' => 30, 'nama' => 'Umum-Ruang Pegawai Umum'],
            ['id' => 31, 'nama' => 'Umum-Lobby'],
            ['id' => 32, 'nama' => 'IPDS-Pelayanan Statistik Terpadu'],
            ['id' => 33, 'nama' => 'Umum-Ruang Pegawai Perencanaan'],
            ['id' => 34, 'nama' => 'Umum-Ruang Pegawai PBJ'],
            ['id' => 35, 'nama' => 'Umum-Ruang Pegawai Keuangan'],
            ['id' => 36, 'nama' => 'Umum-Ruang Kepala Bagian'],
            ['id' => 37, 'nama' => 'Umum-Ruang Arsip'],
            ['id' => 38, 'nama' => 'Umum-Ruang Pegawai SDM'],
            ['id' => 39, 'nama' => 'Statistik Produksi-Ruang Koordinator'],
            ['id' => 40, 'nama' => 'Statistik Produksi-Ruang Pegawai'],
            ['id' => 41, 'nama' => 'Statistik Sosial-Ruang Koordinator'],
            ['id' => 42, 'nama' => 'Statistik Sosial-Ruang Pegawai'],
            ['id' => 43, 'nama' => 'Ruang Mako SP2020'],
            ['id' => 44, 'nama' => 'Aula'],
            ['id' => 45, 'nama' => 'Ruang Kepala BPS'],
            ['id' => 46, 'nama' => 'Umum-Ruang Sekretaris'],
            ['id' => 47, 'nama' => 'Ruang Vicon'],
            ['id' => 48, 'nama' => 'Nerwilis-Ruang Koordinator'],
            ['id' => 49, 'nama' => 'Nerwilis-Ruang Pegawai'],
            ['id' => 50, 'nama' => 'Statistik Distribusi-Ruang Koordinator'],
            ['id' => 51, 'nama' => 'Statistik Distribusi-Ruang Pegawai'],
            ['id' => 52, 'nama' => 'Lainnya'],
        ];

        MasterRuangan::insert($data);
    }
}
