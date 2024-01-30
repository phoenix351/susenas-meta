<?php

namespace Database\Seeders;

use App\Models\MaintenanceSequence;
use Illuminate\Database\Seeder;

class MaintenanceSequenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $maintenance_sequences = array(
            0 =>
            array(
                'id' => 1,
                'barang_id' => 531,

                'keluhan' => 'Tiba-tiba tidak bisa masuk pada OSnya, stuck di BIOS',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2021-10-08',
                'updated_at' => '2021-10-08',
                'users_id' => 274,
            ),
            1 =>
            array(
                'id' => 2,
                'barang_id' => 533,

                'keluhan' => 'Tidak bisa menyala',
                'biaya' => 50000,
                'kondisi_final' => 'Rusak Berat',
                'catatan_admin' => 'Tidak bisa diselamatkan',
                'bukti_rusak_berat' => '1655682557_f9dbc16fe8cbf469caa2.pdf',
                'created_at' => '2021-10-08',
                'updated_at' => '2021-10-08',
                'users_id' => 274,
            ),
            2 =>
            array(
                'id' => 3,
                'barang_id' => 469,

                'keluhan' => 'Komputer sudah sangat lemot dan lambat untuk dipakai sebagai operasional pekerjaan, sudah out of date.',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Cleaning dan maintenace OS',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2021-10-15',
                'updated_at' => '2021-10-15',
                'users_id' => 247,
            ),
            3 =>
            array(
                'id' => 4,
                'barang_id' => 502,

                'keluhan' => 'Tidak bisa digunakan',
                'biaya' => 50000,
                'kondisi_final' => 'Rusak Berat',
                'catatan_admin' => 'Tidak bisa diselamatkan',
                'bukti_rusak_berat' => '1655682212_9375fecc0fce09ede5d8.pdf',
                'created_at' => '2021-10-15',
                'updated_at' => '2021-10-15',
                'users_id' => 212,
            ),
            4 =>
            array(
                'id' => 5,
                'barang_id' => 582,

                'keluhan' => 'Printer tidak bisa menarik kertas, selalu tertahan disebelah kanan, mengakibatkan printer sudah tidak bisa digunakan, printer hanya merespon kertas yang diletakkan diatas, tidak merespon pada kertas yang diletakkan pada tray bawah. Hasil print-nanya membekas hitam dipinggir kanan dari atas sampai bawah, atau dibawah. Berharap bisa diperbaiki dan digunakan lagi.',
                'biaya' => 500000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2021-10-25',
                'updated_at' => '2021-10-25',
                'users_id' => 219,
            ),
            5 =>
            array(
                'id' => 6,
                'barang_id' => 527,

                'keluhan' => 'Laptop tidak mau nyala lagi...huhuhu',
                'biaya' => 600000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Sudah baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-03-04',
                'updated_at' => '2022-03-04',
                'users_id' => 179,
            ),
            6 =>
            array(
                'id' => 7,
                'barang_id' => 555,

                'keluhan' => 'Harddisk PC sudah full, kapasitasnya hanya 209 GB, kebutuhan penyimpanan neraca sangat besar sehingga butuh tempat penyimpanan tambahan.',
                'biaya' => 750000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-03-21',
                'updated_at' => '2022-03-21',
                'users_id' => 191,
            ),
            7 =>
            array(
                'id' => 8,
                'barang_id' => 573,

                'keluhan' => 'pc kena virus maql',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-05',
                'updated_at' => '2022-04-05',
                'users_id' => 267,
            ),
            8 =>
            array(
                'id' => 9,
                'barang_id' => 571,

                'keluhan' => 'Mati Total',
                'biaya' => 50000,
                'kondisi_final' => 'Rusak Berat',
                'catatan_admin' => 'Tidak bisa diselamatkan',
                'bukti_rusak_berat' => '1655682272_be1b151907a19d60e67c.pdf',
                'created_at' => '2022-04-05',
                'updated_at' => '2022-04-05',
                'users_id' => 5,
            ),
            9 =>
            array(
                'id' => 10,
                'barang_id' => 528,

                'keluhan' => 'Tidak bisa booting',
                'biaya' => 240000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-05',
                'updated_at' => '2022-04-05',
                'users_id' => 235,
            ),
            10 =>
            array(
                'id' => 11,
                'barang_id' => 683,

                'keluhan' => 'hang, sering muncul page checking drive',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-05',
                'updated_at' => '2022-04-05',
                'users_id' => 271,
            ),
            11 =>
            array(
                'id' => 12,
                'barang_id' => 511,

                'keluhan' => 'PC dapat menyala namun gangguan pada monitor sehingga gambar tidak jelas. Selain itu PC lemot',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-06',
                'updated_at' => '2022-04-06',
                'users_id' => 209,
            ),
            12 =>
            array(
                'id' => 13,
                'barang_id' => 351,

                'keluhan' => 'Sering Hang',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-06',
                'updated_at' => '2022-04-06',
                'users_id' => 205,
            ),
            13 =>
            array(
                'id' => 14,
                'barang_id' => 613,

                'keluhan' => 'Rusak Berat',
                'biaya' => 240000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-06',
                'updated_at' => '2022-04-06',
                'users_id' => 198,
            ),
            14 =>
            array(
                'id' => 15,
                'barang_id' => 627,

                'keluhan' => 'Tiba-tiba mati total saat digunakan Zoom Meeting Pelatihan SPAK 2022',
                'biaya' => 0,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-07',
                'updated_at' => '2022-04-07',
                'users_id' => 274,
            ),
            15 =>
            array(
                'id' => 16,
                'barang_id' => 503,

                'keluhan' => 'PC DELL kondisinya rusak berat sehingga tidak dapat digunakan/berfungsi lagi',
                'biaya' => 185000,
                'kondisi_final' => 'Rusak Berat',
                'catatan_admin' => 'Masih Rusak',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-12',
                'updated_at' => '2022-04-12',
                'users_id' => 212,
            ),
            16 =>
            array(
                'id' => 17,
                'barang_id' => 505,

                'keluhan' => 'Rusak berat disebakan tidak ada cartridge drum',
                'biaya' => 320000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Ganti catridge drum dan cleaning',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-04-12',
                'updated_at' => '2022-04-12',
                'users_id' => 212,
            ),
            17 =>
            array(
                'id' => 18,
                'barang_id' => 688,

                'keluhan' => 'Rusaks',
                'biaya' => 50000,
                'kondisi_final' => 'Rusak Berat',
                'catatan_admin' => 'Tidak bisa diselamatkan',
                'bukti_rusak_berat' => '1655682446_96fb1b87867662ccfafb.pdf',
                'created_at' => '2022-04-13',
                'updated_at' => '2022-04-13',
                'users_id' => 180,
            ),
            18 =>
            array(
                'id' => 19,
                'barang_id' => 603,

                'keluhan' => 'Status Health HDD "Caution", sering crash dan hang. Mohon ditambahkan SSD, HDD biarkan tetap terpasang (tidak perlu diformat), cukup instal windows pada SSD.',
                'biaya' => 800000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Sudah ditambahkan',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-06-08',
                'updated_at' => '2022-06-08',
                'users_id' => 260,
            ),
            19 =>
            array(
                'id' => 20,
                'barang_id' => 475,

                'keluhan' => 'Lemot Loading Lambat,',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-06-09',
                'updated_at' => '2022-06-09',
                'users_id' => 206,
            ),
            20 =>
            array(
                'id' => 21,
                'barang_id' => 473,

                'keluhan' => 'PC AIO Asus Black Screen, tidak bisa masuk windows,',
                'biaya' => 3000000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Ganti chip Power dan IO',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-06-09',
                'updated_at' => '2022-06-09',
                'users_id' => 289,
            ),
            21 =>
            array(
                'id' => 22,
                'barang_id' => 685,

                'keluhan' => 'Sering not responding dan lemot kemudian tidak mendukung utk pekerjaan',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-06-10',
                'updated_at' => '2022-06-10',
                'users_id' => 258,
            ),
            22 =>
            array(
                'id' => 23,
                'barang_id' => 506,

                'keluhan' => 'Setiap kali mencetak dengan jumlah banyak, kertas yang keluar tidak satu-satu tapi sekaligus banyak dan berlanjut kertas tersebut tersangkut di printer',
                'biaya' => 300000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-06-10',
                'updated_at' => '2022-06-10',
                'users_id' => 209,
            ),
            23 =>
            array(
                'id' => 24,
                'barang_id' => 591,

                'keluhan' => 'lambat sering not responding',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Instal ulang windows',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-06-10',
                'updated_at' => '2022-06-10',
                'users_id' => 5,
            ),
            24 =>
            array(
                'id' => 25,
                'barang_id' => 486,

                'keluhan' => 'Mohon untuk diperbaiki monitornya sering berkedip dan loading nya lama',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Sudah baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-06-10',
                'updated_at' => '2022-06-10',
                'users_id' => 182,
            ),
            25 =>
            array(
                'id' => 26,
                'barang_id' => 363,

                'keluhan' => 'OS sudah outdate, loading lama',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-06-13',
                'updated_at' => '2022-06-13',
                'users_id' => 273,
            ),
            26 =>
            array(
                'id' => 27,
                'barang_id' => 454,

                'keluhan' => 'tidak mau nyala',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Sudah baik',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-08-08',
                'updated_at' => '2022-08-08',
                'users_id' => 180,
            ),
            27 =>
            array(
                'id' => 28,
                'barang_id' => 516,

                'keluhan' => 'Tidak bisa booting dan baterai bermasalah',
                'biaya' => 985000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Instal ulang dan ganti baterai',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-08-19',
                'updated_at' => '2022-08-19',
                'users_id' => 5,
            ),
            28 =>
            array(
                'id' => 29,
                'barang_id' => 556,

                'keluhan' => 'Baterai tidak bisa dicharge. Sudah mencoba tukar baterai tapi sepertinya rusak di mesinnya.',
                'biaya' => 390000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Ganti baterai',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-08-19',
                'updated_at' => '2022-08-19',
                'users_id' => 5,
            ),
            29 =>
            array(
                'id' => 30,
                'barang_id' => 488,

                'keluhan' => 'Sering mati sendiri',
                'biaya' => 935000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Ganti HDD dan instal Windows',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-08-19',
                'updated_at' => '2022-08-19',
                'users_id' => 5,
            ),
            30 =>
            array(
                'id' => 31,
                'barang_id' => 548,

                'keluhan' => 'Tidak mau nyala / booting',
                'biaya' => 185000,
                'kondisi_final' => 'Baik',
                'catatan_admin' => 'Install ulang',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2022-08-25',
                'updated_at' => '2022-08-25',
                'users_id' => 269,
            ),
            31 =>
            array(
                'id' => 32,
                'barang_id' => 532,

                'keluhan' => 'Tidak bisa menyala dan Tidak berfungsi sudah lebih dari setahun',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-01-06',
                'updated_at' => '2023-01-06',
                'users_id' => 5,
            ),
            32 =>
            array(
                'id' => 33,
                'barang_id' => 699,

                'keluhan' => 'layar jadi warna hijau/blur',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-06',
                'updated_at' => '2023-02-06',
                'users_id' => 256,
            ),
            33 =>
            array(
                'id' => 34,
                'barang_id' => 594,

                'keluhan' => 'Lemot, untuk  buka awal aja lama banget',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-06',
                'updated_at' => '2023-02-06',
                'users_id' => 234,
            ),
            34 =>
            array(
                'id' => 35,
                'barang_id' => 547,

                'keluhan' => 'Monitor tidak dapat digunakan dengan layak, layar sering mati, tidak bisa mengeluarkan audio sehingga tidak dapat digunakan untuk beraktivitas',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-06',
                'updated_at' => '2023-02-06',
                'users_id' => 246,
            ),
            35 =>
            array(
                'id' => 36,
                'barang_id' => 351,

                'keluhan' => 'Tidak bisa Hidup Lagi',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-06',
                'updated_at' => '2023-02-06',
                'users_id' => 205,
            ),
            36 =>
            array(
                'id' => 37,
                'barang_id' => 351,

                'keluhan' => 'Tidak bisa Hidup Lagi',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-06',
                'updated_at' => '2023-02-06',
                'users_id' => 205,
            ),
            37 =>
            array(
                'id' => 38,
                'barang_id' => 547,

                'keluhan' => 'Hardware monitor sering mati, windows sering bluescreen dan sangat lambat memproses aplikasi yang dibuka',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-06',
                'updated_at' => '2023-02-06',
                'users_id' => 246,
            ),
            38 =>
            array(
                'id' => 39,
                'barang_id' => 682,

                'keluhan' => 'Ganti SSD (Sudah pernah install ulang, tapi tetap lemot/hang/blue screen)',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-06',
                'updated_at' => '2023-02-06',
                'users_id' => 271,
            ),
            39 =>
            array(
                'id' => 40,
                'barang_id' => 683,

                'keluhan' => 'sudah pernah diinstall ulang tapi tetap lemot/sering hang',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-06',
                'updated_at' => '2023-02-06',
                'users_id' => 271,
            ),
            40 =>
            array(
                'id' => 41,
                'barang_id' => 700,

                'keluhan' => 'masih bisa dipakai untuk scanner,
          tapi printer tidak bisa karena MAINTANCE BOX perlu diganti',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-07',
                'updated_at' => '2023-02-07',
                'users_id' => 267,
            ),
            41 =>
            array(
                'id' => 42,
                'barang_id' => 700,

                'keluhan' => 'masih bisa dipakai untuk scanner, tapi printer tidak bisa karena MAINTENANCE BOX perlu diganti',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-07',
                'updated_at' => '2023-02-07',
                'users_id' => 267,
            ),
            42 =>
            array(
                'id' => 43,
                'barang_id' => 679,

                'keluhan' => 'LCD mulai rusak sebagian dan wifi kadang-kadang tidak bisa sehingga harus di reset adaptor wifi nya.',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-10',
                'updated_at' => '2023-02-10',
                'users_id' => 209,
            ),
            43 =>
            array(
                'id' => 44,
                'barang_id' => 493,

                'keluhan' => 'Gampang bluescreen',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-14',
                'updated_at' => '2023-02-14',
                'users_id' => 186,
            ),
            44 =>
            array(
                'id' => 45,
                'barang_id' => 678,

                'keluhan' => 'Layarnya gampang goyang, sepertinya kabel fleksibelnya rusak',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-02-14',
                'updated_at' => '2023-02-14',
                'users_id' => 186,
            ),
            45 =>
            array(
                'id' => 46,
                'barang_id' => 630,

                'keluhan' => 'Charger tidak bisa digunakan, kerusakan ada pada adaptor yang harus segera diganti.',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-07-18',
                'updated_at' => '2023-07-18',
                'users_id' => 182,
            ),
            46 =>
            array(
                'id' => 47,
                'barang_id' => 476,

                'keluhan' => '1. Charger rusak
          2. Memori full',
                'biaya' => 0,
                'kondisi_final' => 'NULL',
                'catatan_admin' => 'NULL',
                'bukti_rusak_berat' => 'NULL',
                'created_at' => '2023-07-20',
                'updated_at' => '2023-07-20',
                'users_id' => 214,
            ),
        );

        MaintenanceSequence::insert($maintenance_sequences);
    }
}
