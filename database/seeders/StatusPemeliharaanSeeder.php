<?php

namespace Database\Seeders;

use App\Models\StatusPemeliharaan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusPemeliharaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $status_pemeliharaan = [
            ['kode_status' => 0, 'deskripsi' => 'Barang Diserahkan kepada Tim BMN'],
            ['kode_status' => 1, 'deskripsi' => 'Sedang Diperiksa oleh Tim BMN'],
            ['kode_status' => 2, 'deskripsi' => 'Sedang Diperiksa oleh Tim IPDS'],
            ['kode_status' => 3, 'deskripsi' => 'Menunggu Barang Diambil Penyedia'],
            ['kode_status' => 4, 'deskripsi' => 'Sedang Diproses pada Penyedia'],
            ['kode_status' => 5, 'deskripsi' => 'Selesai Perbaikan, Barang Sedang Diperiksa oleh Tim IPDS'],
            ['kode_status' => 6, 'deskripsi' => 'Barang sudah Dikembalikan kepada Pegawai'],
            ['kode_status' => 7, 'deskripsi' => 'Barang Rusak Berat'],
        ];
        StatusPemeliharaan::insert($status_pemeliharaan);
    }
}
