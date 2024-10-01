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
        $variable = [
            'blok_1' => [
                'kode_prov',
                'kode_kabkot',
                'kode_kec',
                'kode_desa',
                'kode_bs4',
                'nks',
                'semester',
                'r108',
                'r109',
                'r110',
                'r111',
            ],
            'blok_2' => [
                'r201_nama',
                'r202_nama',
                'r201_jabatan',
                'r202_jabatan',
                'r203'
            ],
            'wtf' => [
                'wtf_2',
                'wtf_3',
                'wtf_4',
                'wtf_5',
                'wtf_6',
                'wtf_7',
                'wtf_8',
                'wtf_9',
                'wtf_10',
                'wtf_11',
                'wtf_12',
                'wtf_13',
                'wtf_14',
                'wtf_15',
                'wtf_16',
                'wtf_17',
                'wtf_18',
                'wtf_19',
                'wtf_20',
                'wtf_21',
                'wtf_22',
                'wtf_23',
                'wtf_24',
            ],
            'blok_qc' => [
                "blokqc_0",
                "blokqc_1",
                "blokqc_2",
                "blokqc_3",
                "blokqc_4",
                "blokqc_5",
                "blokqc_6",
            ],
            'blok4_31' => [
                "blok4_31_jumlah_mak_beli",
                "blok4_31_jumlah_mak_produksi",
                "blok4_31_jumlah_rokok_beli",
                "blok4_31_jumlah_rokok_produksi",
            ],
            'art' => [
                "nama",
                "mak_beli",
                "mak_produksi",
                "rokok_beli",
                "rokok_produksi",
            ],
            'blok4_32' => [
                "blok4_32_0_beli",
                "blok4_32_0_produksi",
                "blok4_32_0_total",
                "blok4_32_1_beli",
                "blok4_32_1_produksi",
                "blok4_32_1_total",
                "blok4_32_2_beli",
                "blok4_32_2_produksi",
                "blok4_32_2_total",
                "blok4_32_3_beli",
                "blok4_32_3_produksi",
                "blok4_32_3_total",
                "blok4_32_4_beli",
                "blok4_32_4_produksi",
                "blok4_32_4_total",
                "blok4_32_5_beli",
                "blok4_32_5_produksi",
                "blok4_32_5_total",
                "blok4_32_6_beli",
                "blok4_32_6_produksi",
                "blok4_32_6_total",
                "blok4_32_7_beli",
                "blok4_32_7_produksi",
                "blok4_32_7_total",
                "blok4_32_8_beli",
                "blok4_32_8_produksi",
                "blok4_32_8_total",
                "blok4_32_9_beli",
                "blok4_32_9_produksi",
                "blok4_32_9_total",
                "blok4_32_10_beli",
                "blok4_32_10_produksi",
                "blok4_32_10_total",
                "blok4_32_11_beli",
                "blok4_32_11_produksi",
                "blok4_32_11_total",
                "blok4_32_12_beli",
                "blok4_32_12_produksi",
                "blok4_32_12_total",
                "blok4_32_13_beli",
                "blok4_32_13_produksi",
                "blok4_32_13_total",
                "blok4_32_14_beli",
                "blok4_32_14_produksi",
                "blok4_32_14_total",
                "blok4_32_15_total",
                "blok4_32_16_total",
                "blok4_32_17_total",
            ]
        ];
        $data = [];
        foreach ($variable as $blok => $daftar) {
            foreach ($daftar as $nama_var) {
                $data[] = [
                    'blok' => $blok,
                    'nama_variabel' => $nama_var,
                    'deskripsi_variabel' => '',
                    'nama_rule' => 'required',
                    'value' => ''
                ];
            }
        }
        DaftarValidasiModel::insert($data);
    }
}