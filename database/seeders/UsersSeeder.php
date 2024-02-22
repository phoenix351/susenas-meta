<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


    public function run(): void
    {
        // $users = [
        //     ["id" => '1',    "email" => 'ponim@bps.go.id',    "nama_lengkap" => 'Admin Po',    "nip" => '199810132021041001',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'ponimin99',    "foto_url" => 'ponimin99.png', 'password' => Hash::make('password')],
        //     ["id" => '5',    "email" => 'umum7100@bps.go.id',    "nama_lengkap" => 'Bagian Umum',    "nip" => '000000000000000000',    "bidang" => 'Bagian Umum',    "username" => 'admin_umum',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '178',    "email" => 'satria.adwendi@bps.go.id',    "nama_lengkap" => 'Satria June Adwendi SST',    "nip" => '199307102016021001',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'awe',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '179',    "email" => 'miaw_miranti@bps.go.id',    "nama_lengkap" => 'Mia Wahyumiranti',    "nip" => '198304112005022001',    "bidang" => 'Bagian Umum',    "username" => 'spk2',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '180',    "email" => 'dame.simamora@bps.go.id',    "nama_lengkap" => 'Tiara Dameani S.ST',    "nip" => '198802082009122002',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'dame',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '181',    "email" => 'hase@bps.go.id',    "nama_lengkap" => 'Hahotan Sagala SST',    "nip" => '198603202009021004',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'hahotan',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '182',    "email" => 'indiraira@bps.go.id',    "nama_lengkap" => 'Indira Anastasia Lolowang SE',    "nip" => '198301252003122001',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'ira',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '185',    "email" => 'ernakusuma@bps.go.id', "nama_lengkap" => 'Erna Kusumawati SST',    "nip" => '198910192012112001',    "bidang" => 'Bagian Umum',    "username" => 'erna_kusumawati',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '186',    "email" => 'n.walangadi@bps.go.id',    "nama_lengkap" => 'Ir. Nuraini Walangadi',    "nip" => '196511231992122001',    "bidang" => 'Bagian Umum',    "username" => 'ani',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '187',    "email" => 'simon@bps.go.id',    "nama_lengkap" => 'Simon Andreas August Remiasa S.ST',    "nip" => '197710111999121001',    "bidang" => 'Bagian Umum',    "username" => 'simon',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '189',    "email" => 'hase@bps.go.id',    "nama_lengkap" => 'Hahotan Sagala SST',    "nip" => '198603202009021004',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'hase',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '190',    "email" => 'norma@bps.go.id',    "nama_lengkap" => 'Norma Olga Frida Regar, S.Si, M.Si',    "nip" => '196611291986032001',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis Statistik',    "username" => 'norma',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '191',    "email" => 'ratnasuli@bps.go.id',    "nama_lengkap" => 'Ratna Sulistyowati, SST, SAB, M.Si',    "nip" => '198505262008012001',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis Statistik',    "username" => 'ratna',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '193',    "email" => 'titienk@bps.go.id',    "nama_lengkap" => 'Titien Kristiningsih, SST, SE, M.Si',    "nip" => '198005252002122003',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'titien',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '194',    "email" => 'rhiniechay@bps.go.id',    "nama_lengkap" => 'Sarjani Harini Martiningsih S.Si',    "nip" => '198803062011012015',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'rhiniechay',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '195',    "email" => 'enggelingiacinta wongkar@bps.go.id',    "nama_lengkap" => 'Enggelin Giacinta Wongkar, SST',    "nip" => '199212292014122002',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis Statistik',    "username" => 'enggelin',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '196',    "email" => 'wulandanawulandana b@bps.go.id',    "nama_lengkap" => 'Ayu Puspita Wulandana B, SST',    "nip" => '199010082014102001',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis Statistik',    "username" => 'wulandana',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '197',    "email" => 'sirly@bps.go.id',    "nama_lengkap" => 'Sirly Catharina Worotikan, SE., M.Si.',    "nip" => '196808281994012001',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'sirly',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '198',    "email" => 'starrysolang@bps.go.id',    "nama_lengkap" => 'Starry Nouva Solang, M.Si.',    "nip" => '196709181994012001',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'starry',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '199',    "email" => 'victorps@bps.go.id',    "nama_lengkap" => 'Victor Prima Sirait, SST., M.S.E',    "nip" => '198103282006021001',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'victor',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '200',    "email" => 'oky@bps.go.id',    "nama_lengkap" => 'Oky Irwan Rosadi',    "nip" => '198610032011011011',    "bidang" => 'Bagian Umum',    "username" => 'oky',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '201',    "email" => 'mariane.rantung@bps.go.id',    "nama_lengkap" => 'Mariane Esther Rantung, SST',    "nip" => '199408062017012001',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'esther',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '202',    "email" => 'akango@bps.go.id',    "nama_lengkap" => 'Abdullah Kango',    "nip" => '197407271997121001',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'akango',    "foto_url" => 'akango.jpeg', 'password' => Hash::make('password')],
        //     ["id" => '204',    "email" => 'elriniwuisan@bps.go.id',    "nama_lengkap" => 'Elrini D. Wuisan, SE',    "nip" => '198210022010032001',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'elri',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '205',    "email" => 'agnes.oroh@bps.go.id',    "nama_lengkap" => 'Agnes M. Oroh',    "nip" => '198208222008012014',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'agnes',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '206',    "email" => 'firra@bps.go.id',    "nama_lengkap" => 'Firra Rastraaktiva Awaliyah S.Si',    "nip" => '198512142010032002',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'firra',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '207',    "email" => 'limada iqbal@bps.go.id',    "nama_lengkap" => 'Limada Iqbal, SST',    "nip" => '199506222018021002',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'iqbal',    "foto_url" => 'iqbal.jpg', 'password' => Hash::make('password')],
        //     ["id" => '208',    "email" => 'bregitta.lasut@bps.go.id',    "nama_lengkap" => 'Bregitta Sisilia Lasut SS',    "nip" => '198209182008012012',    "bidang" => 'Sosial',    "username" => 'gita',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '209',    "email" => 'junitha@bps.go.id',    "nama_lengkap" => 'Junitha Sahureka',    "nip" => '198606112009022007',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'uneth',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '210',    "email" => 'fmagdalena@bps.go.id',    "nama_lengkap" => 'Florentz Magdalena',    "nip" => '199108212014102000',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'florentz',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '211',    "email" => 'stela@bps.go.id',    "nama_lengkap" => 'Stela Engeline Doris Lomboan',    "nip" => '197209091992092001',    "bidang" => 'Bagian Umum',    "username" => 'stela',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '212',    "email" => 'joice.koyongian@bps.go.id',    "nama_lengkap" => 'Joice Juliana Koyongian A.Md',    "nip" => '198307062011012015',    "bidang" => 'Bagian Umum',    "username" => 'juliana',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '214',    "email" => 'frisda@bps.go.id',    "nama_lengkap" => 'Frisda Arisanti T',    "nip" => '198603082006042001',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'frisda',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '215',    "email" => 'dame.simamora@bps.go.id',    "nama_lengkap" => 'Tiara Dameani S.ST',    "nip" => '198802082009122002',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'dame_user',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '217',    "email" => 'prisma.puspita@bps.go.id',    "nama_lengkap" => 'Prima Puspita Indramurti',    "nip" => '',    "bidang" => 'Bagian Umum',    "username" => 'prima',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '218',    "email" => 'pika@bps.go.id',    "nama_lengkap" => 'Priska Harto Lolowang',    "nip" => '198211262011011007',    "bidang" => 'Bagian Umum',    "username" => 'priska',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '219',    "email" => 'uyun@bps.go.id',    "nama_lengkap" => 'Uyun Rahmawati',    "nip" => '198502132011012017',    "bidang" => 'Bagian Umum',    "username" => 'uyun',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '220',    "email" => 'mentarandy@bps.go.id',    "nama_lengkap" => 'Randy Pratama Lumenta',    "nip" => '198911102012111001',    "bidang" => '',    "username" => 'randy',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '234',    "email" => 'windhawijaya@bps.go.id',    "nama_lengkap" => 'Windha Wijaya, SST',    "nip" => '199008012014102001',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'windha',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '235',    "email" => 'mohsam@bps.go.id',    "nama_lengkap" => 'Mohamad Samsodin',    "nip" => '198305082006021001',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis Statistik',    "username" => 'mohsam',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '236',    "email" => 'sumbodo@bps.go.id',    "nama_lengkap" => 'Sumbodo Aji Cahyono, S.Si, MA',    "nip" => '197703081999011001',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'sumbodo',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '237',    "email" => 'ipds7100@bps.go.id',    "nama_lengkap" => 'Administrator',    "nip" => '240171000000000000',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'admin',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '238',    "email" => 'radjid@bps.go.id',    "nama_lengkap" => 'Radjid Dwi Iskandar A.Md',    "nip" => '198504112011011009',    "bidang" => 'Bagian Umum',    "username" => 'radjid',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '239',    "email" => 'yajaivka@bps.go.id',    "nama_lengkap" => 'Yanti Jane Ivonne Kaeng',    "nip" => '198201202008012012',    "bidang" => 'Bagian Umum',    "username" => 'spk1',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '241',    "email" => 'ridwanst@bps.go.id',    "nama_lengkap" => 'Ridwan Setiawan S.Tr.Stat.',    "nip" => '199604202019011002',    "bidang" => 'Bagian Umum',    "username" => 'Ridwan',    "foto_url" => 'Ridwan.jpg', 'password' => Hash::make('password')],
        //     ["id" => '242',    "email" => 'karni.hamdani@bps.go.id',    "nama_lengkap" => 'Karni Hamdani S.Si.',    "nip" => '199401312019032001',    "bidang" => 'Bagian Umum',    "username" => 'karni',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '243',    "email" => 'niar@bps.go.id',    "nama_lengkap" => 'Rosniar Eliana SST., M.Stat.',    "nip" => '198601202009022008',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'niar',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '244',    "email" => 'danty.fatima@bps.go.id',    "nama_lengkap" => 'Danty Welmin Yoshida Fatima S.Tr.Stat.', "nip" => '199711032021042001',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'danty123',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '245',    "email" => 'inkemargareth@bps.go.id',    "nama_lengkap" => 'Inke Margareth Tambeo',    "nip" => '198403232007012003',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis Statistik',    "username" => 'inke',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '246',    "email" => 'nurfadhila@bps.go.id',    "nama_lengkap" => 'Nurfadhila Fahmi',    "nip" => '199510092019032002',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'dhila',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '247',    "email" => 'xsiswahto@bps.go.id',    "nama_lengkap" => 'Eko Siswahto SST, M.SE',    "nip" => '198504202008011003',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'xsiswahto',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '249',    "email" => 'asim@bps.go.id',    "nama_lengkap" => 'Asim Saputra, SST, M.Ec.Dev.',    "nip" => '197609271999011001',    "bidang" => 'Kepala BPS Provinsi',    "username" => 'asim',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '250',    "email" => 'antontw@bps.go.id',    "nama_lengkap" => ' Anton Tri Wijayanto, S.ST, M.Si.',    "nip" => '198001022002121003',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis Statistik',    "username" => 'Anton',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '251',    "email" => 'dadan@bps.go.id',    "nama_lengkap" => 'Dadan Sudarmadi, SST, M.Si.',    "nip" => '197310141995121001',    "bidang" => 'Bagian Umum',    "username" => 'dadan',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '252',    "email" => 'amakhrus@bps.go.id ',    "nama_lengkap" => 'Abdul Aziz Makhrus, S.Tr.Stat.',    "nip" => '199607082019011003',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'aziz',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '253',    "email" => 'dina.atika@bps.go.id',    "nama_lengkap" => 'Dina Atika Rahmawati, SST',    "nip" => '199601152018022001',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'dina',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '254',    "email" => 'zulfanr@bps.go.id',    "nama_lengkap" => 'Zulfa Nur Fajri Ramadhani, S.Tr.Stat.',    "nip" => '199701292019012001',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'zulfa',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '255',    "email" => 'salonica.oktaviani@bps.go.id ',    "nama_lengkap" => 'Salonica Oktaviani, SST',    "nip" => '199410302018022001',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'salonica',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '256',    "email" => 'leonardo.pratama@bps.go.id',    "nama_lengkap" => 'Christian Leonardo Pratama Tamboto, S.Tr.Stat.',    "nip" => '199708072019121001',    "bidang" => 'Bagian Umum',    "username" => 'christian',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '257',    "email" => 'untarirahma@bps.go.id',    "nama_lengkap" => 'Untari Rahmawati, S.Tr.Stat.',    "nip" => '199603312019012001',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis Statistik',    "username" => 'Untari',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '258',    "email" => 'in.pande@bps.go.id',    "nama_lengkap" => 'I Nyoman Pande Suputra, SST',    "nip" => '199504272018021002',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'Pande',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '259',    "email" => 'nabella.intan@bps.go.id',    "nama_lengkap" => 'Nabella Intan Karasta, S.Tr.Stat',    "nip" => '196808281994012001',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'nabella',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '260',    "email" => 'yulius.wendi@bps.go.id',    "nama_lengkap" => 'Yulius Wendi Triandaru SST',    "nip" => '199407252018021001',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'Yulius',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '261',    "email" => 'nurul.hidayah@bps.go.id',    "nama_lengkap" => 'Nurul Hidayah S.Tr.Stat.',    "nip" => '199704212019012001',    "bidang" => 'Bagian Umum',    "username" => 'ida',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '262',    "email" => 'wisnu.triaji@bps.go.id',    "nama_lengkap" => 'Wisnu Triaji, SE',    "nip" => '198702142009021002',    "bidang" => 'Bagian Umum',    "username" => 'wisnu.triaji',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '266',    "email" => 'airin@bps.go.id',    "nama_lengkap" => 'Irene Ruth Longkutoy SH',    "nip" => '197403242006042000',    "bidang" => 'Bagian Umum',    "username" => 'irene',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '267',    "email" => 'stevenmontolalu@bps.go.id',    "nama_lengkap" => 'Steven Kalvin Montolalu, SE',    "nip" => '197904062003121000',    "bidang" => 'Bagian Umum',    "username" => 'steven',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '268',    "email" => 'tenty@bps.go.id',    "nama_lengkap" => 'Lazia Outenty Bimbangnaung',    "nip" => '198110000000000000',    "bidang" => 'Bagian Umum',    "username" => 'lazia',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '269',    "email" => 'olfianesilfia pelealu@bps.go.id',    "nama_lengkap" => 'Olfiane Silfia Pelealu, SE',    "nip" => '197310042003122000',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'olfiane',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '271',    "email" => 'elriniwuisan@bps.go.id',    "nama_lengkap" => 'Elrini Diane Wuisan, SE',    "nip" => '198210022010032000',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'elrini',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '272',    "email" => 'vonny@bps.go.id',    "nama_lengkap" => 'Vonny Joice Lalujan, SE',    "nip" => '196911011992022000',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'vonny',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '273',    "email" => 'dading@bps.go.id',    "nama_lengkap" => 'Dading, S.Si.',    "nip" => '199112202019031000',    "bidang" => 'Fungsi Statistik Distribusi',    "username" => 'dading',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '274',    "email" => 'iqbal.muh@bps.go.id',    "nama_lengkap" => 'Muhammad Iqbal, S.Stat.',    "nip" => '199510132019031001',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'iqbal1',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '275',    "email" => 'ponim@bps.go.id',    "nama_lengkap" => 'Ponimin',    "nip" => '199810132021041000',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'Ponimin',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '276',    "email" => 'rifqi.mubarak@bps.go.id',    "nama_lengkap" => 'Muhammad Rifqi Mubarak',    "nip" => '199901052021041000',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'Rifqi',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '283',    "email" => 'ririnh@bps.go.id',    "nama_lengkap" => 'Ririn Hidayati S.Si., MPP, MSE',    "nip" => '197311031998032005',    "bidang" => 'Fungsi Distribusi',    "username" => 'ririnh',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '284',    "email" => 'rhiniechay@bps.go.id',    "nama_lengkap" => 'Sarjani Harini Martiningsih S.Si',    "nip" => '198803062011012015',    "bidang" => 'Seksi Statistik Pertambangan, Energi dan Konstruksi',    "username" => 'rini123',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '287',    "email" => 'mustika.arum@bps.go.id',    "nama_lengkap" => 'Mustika Aridya Arum A.Md.Kb.N.',    "nip" => '200104112022012001',    "bidang" => 'Bagian Tata Usaha',    "username" => 'mustika',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '288',    "email" => 'ratriani.wardani@bps.go.id',    "nama_lengkap" => 'Ratriani Retno Wardani S.Tr.Stat.',    "nip" => '199903202022012004',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'ratriani',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '289',    "email" => 'daniel.tri@bps.go.id',    "nama_lengkap" => 'Daniel Tri Hemawan SE',    "nip" => '197610102006041003',    "bidang" => 'Fungsi Neraca Wilayah dan Analisis',    "username" => 'daniel_tri',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '290',    "email" => 'yola.larinse@bps.go.id',    "nama_lengkap" => 'Yola Christhy Larinse SST',    "nip" => '199211072014122001',    "bidang" => 'Fungsi Statistik Produksi',    "username" => 'yola',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '291',    "email" => 'risky@bps.go.id',    "nama_lengkap" => 'Risky SST',    "nip" => '199405192016021001',    "bidang" => 'Fungsi Statistik Sosial',    "username" => 'risky',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '292',    "email" => 'zaenuri@bps.go.id',    "nama_lengkap" => 'Zaenuri Putro Utomo',    "nip" => '198101262011011005',    "bidang" => 'Fungsi Integrasi Pengolahan dan Diseminasi Statistik',    "username" => 'zaenuri',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '293',    "email" => 'herman.tinungki@bps.go.id',    "nama_lengkap" => 'Herman Tinungki SE',    "nip" => '196703311986031002',    "bidang" => 'Bagian Umum',    "username" => 'herman',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '294',    "email" => 'nurul.unonongo@bps.go.id',    "nama_lengkap" => 'Nurul Hayati Unonongo SST',    "nip" => '199311112017012002',    "bidang" => 'Bagian Umum',    "username" => 'nurul.unonongo',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '295',    "email" => 'friska.patricia@bps.go.id',    "nama_lengkap" => 'Friska Patricia Raintung, SE',    "nip" => '198912292022032007',    "bidang" => 'Bagian Umum',    "username" => 'friska.patricia',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        //     ["id" => '296',    "email" => 'nova.nurviana@bps.go.id',    "nama_lengkap" => 'Nova Nurviana SST, M.T.',    "nip" => '198911222013112001',    "bidang" => 'Statistik Sosial',    "username" => 'nova.nurviana',    "foto_url" => 'default.jpg', 'password' => Hash::make('password')],
        // ];
        $users = array(
            0 =>
            array(
                'nama_lengkap' => 'Frisca Tiara Iskandar ',
                'username' => 'frisca',
                'role' => 'PML',
                'nip' => '7101095002010213',
                'kode_kabkot' => '01',
                'password' => '7101095002010213',
            ),
            1 =>
            array(
                'nama_lengkap' => 'Anastasya maharani potabuga ',
                'username' => 'anastasya',
                'role' => 'PML',
                'nip' => '7101094108000211',
                'kode_kabkot' => '01',
                'password' => '7101094108000211',
            ),
            2 =>
            array(
                'nama_lengkap' => 'Burhanuddin Potabuga  ',
                'username' => 'burhanuddin',
                'role' => 'PML',
                'nip' => '7101091102640001',
                'kode_kabkot' => '01',
                'password' => '7101091102640001',
            ),
            3 =>
            array(
                'nama_lengkap' => 'Ardi Tuuk  ',
                'username' => 'ardi',
                'role' => 'PML',
                'nip' => '7101100503690301',
                'kode_kabkot' => '01',
                'password' => '7101100503690301',
            ),
            4 =>
            array(
                'nama_lengkap' => 'Laily Agustina Bestari ',
                'username' => 'laily',
                'role' => 'ADMIN',
                'nip' => '199708252019122001',
                'kode_kabkot' => '01',
                'password' => '199708252019122001',
            ),
            5 =>
            array(
                'nama_lengkap' => 'Linda Diana Lumingkewas ',
                'username' => 'linda',
                'role' => 'PML',
                'nip' => '197706182001122002',
                'kode_kabkot' => '01',
                'password' => '197706182001122002',
            ),
            6 =>
            array(
                'nama_lengkap' => 'Wahyu April Yanto ',
                'username' => 'wahyu',
                'role' => 'PML',
                'nip' => '199804252021041003',
                'kode_kabkot' => '01',
                'password' => '199804252021041003',
            ),
            7 =>
            array(
                'nama_lengkap' => 'Ries Afmi Nicky Manorek',
                'username' => 'ries',
                'role' => 'PML',
                'nip' => '198211292011011010',
                'kode_kabkot' => '01',
                'password' => '198211292011011010',
            ),
            8 =>
            array(
                'nama_lengkap' => 'Lomat Tungkagi  ',
                'username' => 'lomat',
                'role' => 'PML',
                'nip' => '196710101989032004',
                'kode_kabkot' => '01',
                'password' => '196710101989032004',
            ),
            9 =>
            array(
                'nama_lengkap' => 'Steven Monintja  ',
                'username' => 'steven_monintja',
                'role' => 'PML',
                'nip' => '197103301991021001',
                'kode_kabkot' => '73',
                'password' => '197103301991021001',
            ),
            10 =>
            array(
                'nama_lengkap' => 'Sofyan Ano  ',
                'username' => 'sofyan',
                'role' => 'PML',
                'nip' => '197411132005021003',
                'kode_kabkot' => '01',
                'password' => '197411132005021003',
            ),
            11 =>
            array(
                'nama_lengkap' => 'Paramitha Madelin Albright ',
                'username' => 'paramitha',
                'role' => 'PML',
                'nip' => '200102092023022003',
                'kode_kabkot' => '01',
                'password' => '200102092023022003',
            ),
            12 =>
            array(
                'nama_lengkap' => 'Alfian Harki Damopoli ',
                'username' => 'alfian_damopoli',
                'role' => 'PML',
                'nip' => '197205281992021001',
                'kode_kabkot' => '72',
                'password' => '197205281992021001',
            ),
            13 =>
            array(
                'nama_lengkap' => 'Aninditya Yuniar  ',
                'username' => 'aninditya',
                'role' => 'PML',
                'nip' => '199806112021042001',
                'kode_kabkot' => '01',
                'password' => '199806112021042001',
            ),
            14 =>
            array(
                'nama_lengkap' => 'Ratih Rodliyah  ',
                'username' => 'ratih',
                'role' => 'PML',
                'nip' => '199810112023102001',
                'kode_kabkot' => '01',
                'password' => '199810112023102001',
            ),
            15 =>
            array(
                'nama_lengkap' => 'Rani Adila  ',
                'username' => 'rani',
                'role' => 'PML',
                'nip' => '200209062023102003',
                'kode_kabkot' => '01',
                'password' => '200209062023102003',
            ),
            16 =>
            array(
                'nama_lengkap' => 'Amarlia Putri Garini ',
                'username' => 'amarlia',
                'role' => 'PML',
                'nip' => '199511152018022001',
                'kode_kabkot' => '01',
                'password' => '199511152018022001',
            ),
            17 =>
            array(
                'nama_lengkap' => 'Rahmi Maulina Alwi ',
                'username' => 'rahmi',
                'role' => 'PML',
                'nip' => '200106052023102002',
                'kode_kabkot' => '01',
                'password' => '200106052023102002',
            ),
            18 =>
            array(
                'nama_lengkap' => 'Sendy Oroh  ',
                'username' => 'sendy',
                'role' => 'PML',
                'nip' => '197808212006042005',
                'kode_kabkot' => '02',
                'password' => '197808212006042005',
            ),
            19 =>
            array(
                'nama_lengkap' => 'Triny Aleine Talumewo ',
                'username' => 'triny',
                'role' => 'PML',
                'nip' => '198608192005022001',
                'kode_kabkot' => '02',
                'password' => '198608192005022001',
            ),
            20 =>
            array(
                'nama_lengkap' => 'Fenny Irma Paula Wangko',
                'username' => 'fenny',
                'role' => 'PML',
                'nip' => '7102115512720002',
                'kode_kabkot' => '02',
                'password' => '7102115512720002',
            ),
            21 =>
            array(
                'nama_lengkap' => 'Fabiola Sanger  ',
                'username' => 'fabiola',
                'role' => 'PML',
                'nip' => '198302232002122001',
                'kode_kabkot' => '02',
                'password' => '198302232002122001',
            ),
            22 =>
            array(
                'nama_lengkap' => 'Gemayel Gamaliel Sahiu ',
                'username' => 'gemayel',
                'role' => 'PML',
                'nip' => '198905162012121001',
                'kode_kabkot' => '02',
                'password' => '198905162012121001',
            ),
            23 =>
            array(
                'nama_lengkap' => 'Arsdhewani Maria Vianey ',
                'username' => 'arsdhewani',
                'role' => 'PML',
                'nip' => '200107102023102002',
                'kode_kabkot' => '02',
                'password' => '200107102023102002',
            ),
            24 =>
            array(
                'nama_lengkap' => 'Adryan Sapta Setyadinata ',
                'username' => 'adryan',
                'role' => 'PML',
                'nip' => '199909042023021001',
                'kode_kabkot' => '02',
                'password' => '199909042023021001',
            ),
            25 =>
            array(
                'nama_lengkap' => 'Kannia Amielsa Shanenda ',
                'username' => 'kannia',
                'role' => 'ADMIN',
                'nip' => '199805302021042002',
                'kode_kabkot' => '02',
                'password' => '199805302021042002',
            ),
            26 =>
            array(
                'nama_lengkap' => 'Novi Yanti Mamangkey ',
                'username' => 'novi',
                'role' => 'PML',
                'nip' => '198105122010032001',
                'kode_kabkot' => '02',
                'password' => '198105122010032001',
            ),
            27 =>
            array(
                'nama_lengkap' => 'Tirsa Poli  ',
                'username' => 'tirsa',
                'role' => 'PML',
                'nip' => '198301232010032002',
                'kode_kabkot' => '02',
                'password' => '198301232010032002',
            ),
            28 =>
            array(
                'nama_lengkap' => 'Edwin Franke Lantang ',
                'username' => 'edwin',
                'role' => 'PML',
                'nip' => '197907112014101001',
                'kode_kabkot' => '02',
                'password' => '197907112014101001',
            ),
            29 =>
            array(
                'nama_lengkap' => 'Jusran Zakaria  ',
                'username' => 'jusran',
                'role' => 'PML',
                'nip' => '197003231992111001',
                'kode_kabkot' => '02',
                'password' => '197003231992111001',
            ),
            30 =>
            array(
                'nama_lengkap' => 'Glen Tambahani  ',
                'username' => 'glen',
                'role' => 'PML',
                'nip' => '196709161989031002',
                'kode_kabkot' => '02',
                'password' => '196709161989031002',
            ),
            31 =>
            array(
                'nama_lengkap' => 'Anggit Prihatmaja  ',
                'username' => 'anggit',
                'role' => 'ADMIN',
                'nip' => '199606072019121001',
                'kode_kabkot' => '02',
                'password' => '199606072019121001',
            ),
            32 =>
            array(
                'nama_lengkap' => 'Veisy Novita Sumolang ',
                'username' => 'veisy',
                'role' => 'PML',
                'nip' => '7102106311920001',
                'kode_kabkot' => '02',
                'password' => '7102106311920001',
            ),
            33 =>
            array(
                'nama_lengkap' => 'Vera Veronika Guilermo ',
                'username' => 'vera',
                'role' => 'PML',
                'nip' => '7102165402750001',
                'kode_kabkot' => '02',
                'password' => '7102165402750001',
            ),
            34 =>
            array(
                'nama_lengkap' => 'Azim Naila Fadhlilah ',
                'username' => 'azim',
                'role' => 'PML',
                'nip' => '200001122023102001',
                'kode_kabkot' => '02',
                'password' => '200001122023102001',
            ),
            35 =>
            array(
                'nama_lengkap' => 'Altje Lontoh  ',
                'username' => 'altje',
                'role' => 'PML',
                'nip' => '197204021992022002',
                'kode_kabkot' => '02',
                'password' => '197204021992022002',
            ),
            36 =>
            array(
                'nama_lengkap' => 'Candra Nain Hapantenda ',
                'username' => 'candra',
                'role' => 'PML',
                'nip' => '7103254408990000',
                'kode_kabkot' => '03',
                'password' => '7103254408990000',
            ),
            37 =>
            array(
                'nama_lengkap' => 'Ferdinand Tangkabiringan  ',
                'username' => 'ferdinand',
                'role' => 'PML',
                'nip' => '7103170902640301',
                'kode_kabkot' => '03',
                'password' => '7103170902640301',
            ),
            38 =>
            array(
                'nama_lengkap' => 'Johny steven manoppo ',
                'username' => 'johny',
                'role' => 'PML',
                'nip' => '7103100206820003',
                'kode_kabkot' => '03',
                'password' => '7103100206820003',
            ),
            39 =>
            array(
                'nama_lengkap' => 'Krisnanda Prasetya Adi ',
                'username' => 'krisnanda1',
                'role' => 'PML',
                'nip' => '198501292010032002',
                'kode_kabkot' => '05',
                'password' => '198501292010032002',
            ),
            40 =>
            array(
                'nama_lengkap' => 'Stanly Mokodompis  ',
                'username' => 'stanly',
                'role' => 'PML',
                'nip' => '340020228',
                'kode_kabkot' => '03',
                'password' => '340020228',
            ),
            41 =>
            array(
                'nama_lengkap' => 'Lusine Karel  ',
                'username' => 'lusine',
                'role' => 'PML',
                'nip' => '340056662',
                'kode_kabkot' => '03',
                'password' => '340056662',
            ),
            42 =>
            array(
                'nama_lengkap' => 'Kharis M.H.Y. Mare ',
                'username' => 'kharis',
                'role' => 'PML',
                'nip' => '340053859',
                'kode_kabkot' => '03',
                'password' => '340053859',
            ),
            43 =>
            array(
                'nama_lengkap' => 'Sutriwati Daulu  ',
                'username' => 'sutriwati',
                'role' => 'PML',
                'nip' => '340019841',
                'kode_kabkot' => '03',
                'password' => '340019841',
            ),
            44 =>
            array(
                'nama_lengkap' => 'Djon V.M. Lahamendu ',
                'username' => 'djon',
                'role' => 'PML',
                'nip' => '340015913',
                'kode_kabkot' => '03',
                'password' => '340015913',
            ),
            45 =>
            array(
                'nama_lengkap' => 'Yunita Yetty Winangon ',
                'username' => 'yunita',
                'role' => 'PML',
                'nip' => '340016367',
                'kode_kabkot' => '03',
                'password' => '340016367',
            ),
            46 =>
            array(
                'nama_lengkap' => 'Herison Gunde  ',
                'username' => 'herison',
                'role' => 'PML',
                'nip' => '340019346',
                'kode_kabkot' => '03',
                'password' => '340019346',
            ),
            47 =>
            array(
                'nama_lengkap' => 'Renald S. Salendah ',
                'username' => 'renald',
                'role' => 'PML',
                'nip' => '340058449',
                'kode_kabkot' => '03',
                'password' => '340058449',
            ),
            48 =>
            array(
                'nama_lengkap' => 'Fin Mangendai  ',
                'username' => 'fin',
                'role' => 'PML',
                'nip' => '340019522',
                'kode_kabkot' => '03',
                'password' => '340019522',
            ),
            49 =>
            array(
                'nama_lengkap' => 'Agus Hardiyanto  ',
                'username' => 'agus',
                'role' => 'PML',
                'nip' => '340061630',
                'kode_kabkot' => '03',
                'password' => '340061630',
            ),
            50 =>
            array(
                'nama_lengkap' => 'Erwin A. Makadapa ',
                'username' => 'erwin',
                'role' => 'PML',
                'nip' => '340056661',
                'kode_kabkot' => '03',
                'password' => '340056661',
            ),
            51 =>
            array(
                'nama_lengkap' => 'B. Lenskar Diamanis ',
                'username' => 'b.',
                'role' => 'PML',
                'nip' => '340056657',
                'kode_kabkot' => '03',
                'password' => '340056657',
            ),
            52 =>
            array(
                'nama_lengkap' => 'Meri Yohana Singkara, ',
                'username' => 'meri',
                'role' => 'PML',
                'nip' => '198405132011012012',
                'kode_kabkot' => '04',
                'password' => '198405132011012012',
            ),
            53 =>
            array(
                'nama_lengkap' => 'Yulita Liroga  ',
                'username' => 'yulita',
                'role' => 'PML',
                'nip' => '198006212008012018',
                'kode_kabkot' => '04',
                'password' => '198006212008012018',
            ),
            54 =>
            array(
                'nama_lengkap' => 'Meytry Petronella Purba, ',
                'username' => 'meytry',
                'role' => 'PML',
                'nip' => '200005112023022000',
                'kode_kabkot' => '04',
                'password' => '200005112023022000',
            ),
            55 =>
            array(
                'nama_lengkap' => 'Julia Taarae  ',
                'username' => 'julia',
                'role' => 'PML',
                'nip' => '197507022007012002',
                'kode_kabkot' => '04',
                'password' => '197507022007012002',
            ),
            56 =>
            array(
                'nama_lengkap' => 'Monita Purba,  ',
                'username' => 'monita',
                'role' => 'PML',
                'nip' => '199902242023022001',
                'kode_kabkot' => '04',
                'password' => '199902242023022001',
            ),
            57 =>
            array(
                'nama_lengkap' => 'Jongly Wua  ',
                'username' => 'jongly',
                'role' => 'PML',
                'nip' => '198808112008011001',
                'kode_kabkot' => '04',
                'password' => '198808112008011001',
            ),
            58 =>
            array(
                'nama_lengkap' => 'Ekstipan Riung Mahda ',
                'username' => 'ekstipan',
                'role' => 'PML',
                'nip' => '198003042007011002',
                'kode_kabkot' => '04',
                'password' => '198003042007011002',
            ),
            59 =>
            array(
                'nama_lengkap' => 'Gilang Cahya Permadi, ',
                'username' => 'gilang',
                'role' => 'PML',
                'nip' => '199801252021041001',
                'kode_kabkot' => '04',
                'password' => '199801252021041001',
            ),
            60 =>
            array(
                'nama_lengkap' => 'Kalpin Kahosadi  ',
                'username' => 'kalpin',
                'role' => 'PML',
                'nip' => '7104112202890001',
                'kode_kabkot' => '04',
                'password' => '7104112202890001',
            ),
            61 =>
            array(
                'nama_lengkap' => 'Meistip Singkara  ',
                'username' => 'meistip',
                'role' => 'PML',
                'nip' => '7104163105860001',
                'kode_kabkot' => '04',
                'password' => '7104163105860001',
            ),
            62 =>
            array(
                'nama_lengkap' => 'Pradipto Ontorael  ',
                'username' => 'pradipto',
                'role' => 'PML',
                'nip' => '197602012014061001',
                'kode_kabkot' => '04',
                'password' => '197602012014061001',
            ),
            63 =>
            array(
                'nama_lengkap' => 'Jakob T. Mahda ',
                'username' => 'jakob',
                'role' => 'PML',
                'nip' => '196703231990031006',
                'kode_kabkot' => '04',
                'password' => '196703231990031006',
            ),
            64 =>
            array(
                'nama_lengkap' => 'Ilham Alifian Firmansyah, ',
                'username' => 'ilham',
                'role' => 'PML',
                'nip' => '200107222023101001',
                'kode_kabkot' => '04',
                'password' => '200107222023101001',
            ),
            65 =>
            array(
                'nama_lengkap' => 'Sofian Ramdani,  ',
                'username' => 'sofian',
                'role' => 'PML',
                'nip' => '200012102023101002',
                'kode_kabkot' => '04',
                'password' => '200012102023101002',
            ),
            66 =>
            array(
                'nama_lengkap' => 'Abram P.T. Gumansalangi ',
                'username' => 'abram',
                'role' => 'PML',
                'nip' => '196704102014061001',
                'kode_kabkot' => '04',
                'password' => '196704102014061001',
            ),
            67 =>
            array(
                'nama_lengkap' => 'Jusmi Gumansalangi  ',
                'username' => 'jusmi',
                'role' => 'PML',
                'nip' => '197210072003121003',
                'kode_kabkot' => '04',
                'password' => '197210072003121003',
            ),
            68 =>
            array(
                'nama_lengkap' => 'Jemi Fesly Ambat ',
                'username' => 'jemi',
                'role' => 'PML',
                'nip' => '197805202014061003',
                'kode_kabkot' => '04',
                'password' => '197805202014061003',
            ),
            69 =>
            array(
                'nama_lengkap' => 'Vicky Vandy Lukas ',
                'username' => 'vicky',
                'role' => 'PML',
                'nip' => '7102030204890002',
                'kode_kabkot' => '05',
                'password' => '7102030204890002',
            ),
            70 =>
            array(
                'nama_lengkap' => 'Frenly Wongkar,  ',
                'username' => 'frenly',
                'role' => 'PML',
                'nip' => '198602072010031004',
                'kode_kabkot' => '05',
                'password' => '198602072010031004',
            ),
            71 =>
            array(
                'nama_lengkap' => 'Johanes, S.ST  ',
                'username' => 'johanes,',
                'role' => 'PML',
                'nip' => '198005112002121003',
                'kode_kabkot' => '05',
                'password' => '198005112002121003',
            ),
            72 =>
            array(
                'nama_lengkap' => 'Diane Roosjefien Rondonuwu, S.P.',
                'username' => 'diane',
                'role' => 'PML',
                'nip' => '197012112014102002',
                'kode_kabkot' => '05',
                'password' => '197012112014102002',
            ),
            73 =>
            array(
                'nama_lengkap' => 'Jimmy Ferdinan Mamahani, SE ',
                'username' => 'jimmy_mamahani',
                'role' => 'PML',
                'nip' => '197609242007011002',
                'kode_kabkot' => '01',
                'password' => '197609242007011002',
            ),
            74 =>
            array(
                'nama_lengkap' => 'Rafif Rikasatya, S.ST ',
                'username' => 'rafif',
                'role' => 'PML',
                'nip' => '199505242018021001',
                'kode_kabkot' => '05',
                'password' => '199505242018021001',
            ),
            75 =>
            array(
                'nama_lengkap' => 'Artha Gumelar Suharsa, S.Tr.Stat',
                'username' => 'artha',
                'role' => 'PML',
                'nip' => '199512212019121001',
                'kode_kabkot' => '05',
                'password' => '199512212019121001',
            ),
            76 =>
            array(
                'nama_lengkap' => 'Pidyatama Putri Situmorang S.Tr.Stat.',
                'username' => 'pidyatama',
                'role' => 'PML',
                'nip' => '200009202022012006',
                'kode_kabkot' => '05',
                'password' => '200009202022012006',
            ),
            77 =>
            array(
                'nama_lengkap' => 'Alvero Rivando Suoth ',
                'username' => 'alvero',
                'role' => 'PML',
                'nip' => '7105161804940002',
                'kode_kabkot' => '05',
                'password' => '7105161804940002',
            ),
            78 =>
            array(
                'nama_lengkap' => 'Mahmud Mashanafi  ',
                'username' => 'mahmud',
                'role' => 'PML',
                'nip' => '7105160810690001',
                'kode_kabkot' => '05',
                'password' => '7105160810690001',
            ),
            79 =>
            array(
                'nama_lengkap' => 'Joice Rorimpandey A.Md ',
                'username' => 'joice_rorimpan',
                'role' => 'PML',
                'nip' => '7106096506810000',
                'kode_kabkot' => '06',
                'password' => '7106096506810000',
            ),
            80 =>
            array(
                'nama_lengkap' => 'Yunanda Angelia Sinurat S.Tr.Stat.',
                'username' => 'yunanda',
                'role' => 'PML',
                'nip' => '199606072019012002',
                'kode_kabkot' => '05',
                'password' => '199606072019012002',
            ),
            81 =>
            array(
                'nama_lengkap' => 'Ireyne Tamburian, S.Sos ',
                'username' => 'ireyne',
                'role' => 'PML',
                'nip' => '198307162010032002',
                'kode_kabkot' => '05',
                'password' => '198307162010032002',
            ),
            82 =>
            array(
                'nama_lengkap' => 'Jimmy Walangitan  ',
                'username' => 'jimmy',
                'role' => 'PML',
                'nip' => '7173036604860002',
                'kode_kabkot' => '73',
                'password' => '7173036604860002',
            ),
            83 =>
            array(
                'nama_lengkap' => 'Steven Bonny Reppi, SE',
                'username' => 'steven',
                'role' => 'PML',
                'nip' => '7107020401890001',
                'kode_kabkot' => '09',
                'password' => '7107020401890001',
            ),
            84 =>
            array(
                'nama_lengkap' => 'Yandi Liwe  ',
                'username' => 'yandi_liwe',
                'role' => 'PML',
                'nip' => '7174044107870024',
                'kode_kabkot' => '74',
                'password' => '7174044107870024',
            ),
            85 =>
            array(
                'nama_lengkap' => 'Joice Umboh  ',
                'username' => 'joice',
                'role' => 'PML',
                'nip' => '1202137105960004',
                'kode_kabkot' => '74',
                'password' => '1202137105960004',
            ),
            86 =>
            array(
                'nama_lengkap' => 'Julham Angguhe  ',
                'username' => 'julham',
                'role' => 'PML',
                'nip' => '7106061109820001',
                'kode_kabkot' => '06',
                'password' => '7106061109820001',
            ),
            87 =>
            array(
                'nama_lengkap' => 'Dedi Kodoatie  ',
                'username' => 'dedi',
                'role' => 'PML',
                'nip' => '7106074110800003',
                'kode_kabkot' => '06',
                'password' => '7106074110800003',
            ),
            88 =>
            array(
                'nama_lengkap' => 'Yenny Iryanti Umboh ',
                'username' => 'yenny',
                'role' => 'PML',
                'nip' => '7106027108790001',
                'kode_kabkot' => '06',
                'password' => '7106027108790001',
            ),
            89 =>
            array(
                'nama_lengkap' => 'Jenni Manikome  ',
                'username' => 'jenni',
                'role' => 'PML',
                'nip' => '7106104706770001',
                'kode_kabkot' => '06',
                'password' => '7106104706770001',
            ),
            90 =>
            array(
                'nama_lengkap' => 'Bambang Suwarno, A.Md ',
                'username' => 'bambang',
                'role' => 'PML',
                'nip' => '198104042011011005',
                'kode_kabkot' => '06',
                'password' => '198104042011011005',
            ),
            91 =>
            array(
                'nama_lengkap' => 'Sylvia Tambeo, SE ',
                'username' => 'sylvia',
                'role' => 'PML',
                'nip' => '198604222011012016',
                'kode_kabkot' => '06',
                'password' => '198604222011012016',
            ),
            92 =>
            array(
                'nama_lengkap' => 'Usman Antu  ',
                'username' => 'usman',
                'role' => 'PML',
                'nip' => '196611071992021001',
                'kode_kabkot' => '06',
                'password' => '196611071992021001',
            ),
            93 =>
            array(
                'nama_lengkap' => 'Oman Ali  ',
                'username' => 'oman',
                'role' => 'PML',
                'nip' => '196612151990031001',
                'kode_kabkot' => '06',
                'password' => '196612151990031001',
            ),
            94 =>
            array(
                'nama_lengkap' => 'Deivi Johan Roringpandey ',
                'username' => 'deivi',
                'role' => 'PML',
                'nip' => '7106021512880002',
                'kode_kabkot' => '06',
                'password' => '7106021512880002',
            ),
            95 =>
            array(
                'nama_lengkap' => 'Ardyah Murantyoningsih  ',
                'username' => 'ardyah',
                'role' => 'PML',
                'nip' => '7106086207700001',
                'kode_kabkot' => '06',
                'password' => '7106086207700001',
            ),
            96 =>
            array(
                'nama_lengkap' => 'Marsela Janet Lengkey ',
                'username' => 'marsela',
                'role' => 'PML',
                'nip' => '3276026901900006',
                'kode_kabkot' => '06',
                'password' => '3276026901900006',
            ),
            97 =>
            array(
                'nama_lengkap' => 'Janlex Randy Domits ',
                'username' => 'janlex',
                'role' => 'PML',
                'nip' => '7171020111830007',
                'kode_kabkot' => '06',
                'password' => '7171020111830007',
            ),
            98 =>
            array(
                'nama_lengkap' => 'Dewi Megawati Wurangian ',
                'username' => 'dewi_wurangian',
                'role' => 'PML',
                'nip' => '199606222019011001',
                'kode_kabkot' => '07',
                'password' => '199606222019011001',
            ),
            99 =>
            array(
                'nama_lengkap' => 'Safrudin Saleh  ',
                'username' => 'safrudin',
                'role' => 'PML',
                'nip' => '7106040712740001',
                'kode_kabkot' => '06',
                'password' => '7106040712740001',
            ),
            100 =>
            array(
                'nama_lengkap' => 'Ir. James Koesbiantoro ',
                'username' => 'ir.',
                'role' => 'PML',
                'nip' => '196808161994011001',
                'kode_kabkot' => '06',
                'password' => '196808161994011001',
            ),
            101 =>
            array(
                'nama_lengkap' => 'Kristin Paskahrani Bakara, SST',
                'username' => 'kristin',
                'role' => 'PML',
                'nip' => '199304122014122001',
                'kode_kabkot' => '06',
                'password' => '199304122014122001',
            ),
            102 =>
            array(
                'nama_lengkap' => 'Herlina Djauhari  ',
                'username' => 'herlina',
                'role' => 'PML',
                'nip' => '7108066409930003',
                'kode_kabkot' => '07',
                'password' => '7108066409930003',
            ),
            103 =>
            array(
                'nama_lengkap' => 'Miranti Tuelah  ',
                'username' => 'miranti',
                'role' => 'PML',
                'nip' => '7108056009960001',
                'kode_kabkot' => '07',
                'password' => '7108056009960001',
            ),
            104 =>
            array(
                'nama_lengkap' => 'Avriona Rieneke Pesik ',
                'username' => 'avriona',
                'role' => 'PML',
                'nip' => '7108026604790001',
                'kode_kabkot' => '07',
                'password' => '7108026604790001',
            ),
            105 =>
            array(
                'nama_lengkap' => 'Rudini Daeng Mataro ',
                'username' => 'rudini',
                'role' => 'PML',
                'nip' => '7108011309900001',
                'kode_kabkot' => '07',
                'password' => '7108011309900001',
            ),
            106 =>
            array(
                'nama_lengkap' => 'Junardi Tonote  ',
                'username' => 'junardi',
                'role' => 'PML',
                'nip' => '7108052306900001',
                'kode_kabkot' => '07',
                'password' => '7108052306900001',
            ),
            107 =>
            array(
                'nama_lengkap' => 'Miniyarti Talibo  ',
                'username' => 'miniyarti',
                'role' => 'PML',
                'nip' => '7108045207810001',
                'kode_kabkot' => '07',
                'password' => '7108045207810001',
            ),
            108 =>
            array(
                'nama_lengkap' => 'Hamsin Paputungan  ',
                'username' => 'hamsin',
                'role' => 'PML',
                'nip' => '7108011109740001',
                'kode_kabkot' => '07',
                'password' => '7108011109740001',
            ),
            109 =>
            array(
                'nama_lengkap' => 'Syamsul Mahar Ishak ',
                'username' => 'syamsul',
                'role' => 'PML',
                'nip' => '197905232005021001',
                'kode_kabkot' => '07',
                'password' => '197905232005021001',
            ),
            110 =>
            array(
                'nama_lengkap' => 'Mutmainnah Aminarti A.Md.Stat. ',
                'username' => 'mutmainnah',
                'role' => 'PML',
                'nip' => '200203132023102001',
                'kode_kabkot' => '07',
                'password' => '200203132023102001',
            ),
            111 =>
            array(
                'nama_lengkap' => 'Indah Khairunnisa A.Md.Stat. ',
                'username' => 'indah',
                'role' => 'PML',
                'nip' => '200203142023102001',
                'kode_kabkot' => '07',
                'password' => '200203142023102001',
            ),
            112 =>
            array(
                'nama_lengkap' => 'Rezza Dhamziq S.P ',
                'username' => 'rezza',
                'role' => 'PML',
                'nip' => '198111032011011008',
                'kode_kabkot' => '07',
                'password' => '198111032011011008',
            ),
            113 =>
            array(
                'nama_lengkap' => 'Janter Simorangkir S.Tr.Stat. ',
                'username' => 'janter',
                'role' => 'PML',
                'nip' => '199601042019011001',
                'kode_kabkot' => '07',
                'password' => '199601042019011001',
            ),
            114 =>
            array(
                'nama_lengkap' => 'Eka Apriliyana S.Tr.Stat. ',
                'username' => 'eka',
                'role' => 'PML',
                'nip' => '199604092019012002',
                'kode_kabkot' => '07',
                'password' => '199604092019012002',
            ),
            115 =>
            array(
                'nama_lengkap' => 'Dian Teguh Prasetyo S.Tr.Stat.',
                'username' => 'dian_prasetyo',
                'role' => 'PML',
                'nip' => '7105122010880001',
                'kode_kabkot' => '05',
                'password' => '7105122010880001',
            ),
            116 =>
            array(
                'nama_lengkap' => 'Mohammad Rifky Pontoh S.Tr.Stat.',
                'username' => 'mohammad',
                'role' => 'ADMIN',
                'nip' => '199910262022011001',
                'kode_kabkot' => '07',
                'password' => '199910262022011001',
            ),
            117 =>
            array(
                'nama_lengkap' => 'Yanro Eric Immanuel Kuron',
                'username' => 'yanro',
                'role' => 'PML',
                'nip' => '200002202022011004',
                'kode_kabkot' => '07',
                'password' => '200002202022011004',
            ),
            118 =>
            array(
                'nama_lengkap' => 'REYSKE JACOBS  ',
                'username' => 'reyske',
                'role' => 'PML',
                'nip' => '7109076509720002',
                'kode_kabkot' => '08',
                'password' => '7109076509720002',
            ),
            119 =>
            array(
                'nama_lengkap' => 'ALBERT J CHEN ',
                'username' => 'albert',
                'role' => 'PML',
                'nip' => '6171042706000008',
                'kode_kabkot' => '08',
                'password' => '6171042706000008',
            ),
            120 =>
            array(
                'nama_lengkap' => 'ANSYE C SANDA ',
                'username' => 'ansye',
                'role' => 'PML',
                'nip' => '7109034506960002',
                'kode_kabkot' => '08',
                'password' => '7109034506960002',
            ),
            121 =>
            array(
                'nama_lengkap' => 'ANDRE WIDYANTO  ',
                'username' => 'andre',
                'role' => 'PML',
                'nip' => '7202032601030003',
                'kode_kabkot' => '08',
                'password' => '7202032601030003',
            ),
            122 =>
            array(
                'nama_lengkap' => 'AKFARIANTI NAWANGSIH  ',
                'username' => 'akfarianti',
                'role' => 'PML',
                'nip' => '3312086606990001',
                'kode_kabkot' => '08',
                'password' => '3312086606990001',
            ),
            123 =>
            array(
                'nama_lengkap' => 'MEITY C SINADIA ',
                'username' => 'meity_sinadia',
                'role' => 'PML',
                'nip' => '7106096404840001',
                'kode_kabkot' => '06',
                'password' => '7106096404840001',
            ),
            124 =>
            array(
                'nama_lengkap' => 'ORTJE MANAHAMPI  ',
                'username' => 'ortje',
                'role' => 'PML',
                'nip' => '7109025302720001',
                'kode_kabkot' => '08',
                'password' => '7109025302720001',
            ),
            125 =>
            array(
                'nama_lengkap' => 'JONIVER MONA  ',
                'username' => 'joniver',
                'role' => 'PML',
                'nip' => '7109012905910001',
                'kode_kabkot' => '08',
                'password' => '7109012905910001',
            ),
            126 =>
            array(
                'nama_lengkap' => 'AYU SUSILOWATI  ',
                'username' => 'ayu',
                'role' => 'PML',
                'nip' => '3308085404980003',
                'kode_kabkot' => '08',
                'password' => '3308085404980003',
            ),
            127 =>
            array(
                'nama_lengkap' => 'GUSTI PRABA  ',
                'username' => 'gusti',
                'role' => 'PML',
                'nip' => '7171032112030004',
                'kode_kabkot' => '08',
                'password' => '7171032112030004',
            ),
            128 =>
            array(
                'nama_lengkap' => 'MEISKE DEREK  ',
                'username' => 'meiske',
                'role' => 'PML',
                'nip' => '7109016505870003',
                'kode_kabkot' => '08',
                'password' => '7109016505870003',
            ),
            129 =>
            array(
                'nama_lengkap' => 'DEYSKE PUASA  ',
                'username' => 'deyske',
                'role' => 'PML',
                'nip' => '7109034712790002',
                'kode_kabkot' => '08',
                'password' => '7109034712790002',
            ),
            130 =>
            array(
                'nama_lengkap' => 'ERICK SALINDEHO  ',
                'username' => 'erick',
                'role' => 'PML',
                'nip' => '7109012504830002',
                'kode_kabkot' => '08',
                'password' => '7109012504830002',
            ),
            131 =>
            array(
                'nama_lengkap' => 'MATHILDA DEREK  ',
                'username' => 'mathilda',
                'role' => 'PML',
                'nip' => '7109016505760002',
                'kode_kabkot' => '08',
                'password' => '7109016505760002',
            ),
            132 =>
            array(
                'nama_lengkap' => 'KRISTIANUS B MOKODOMPIS ',
                'username' => 'kristianus',
                'role' => 'PML',
                'nip' => '7109011609760002',
                'kode_kabkot' => '08',
                'password' => '7109011609760002',
            ),
            133 =>
            array(
                'nama_lengkap' => 'ARIEF BUDHIMAN  ',
                'username' => 'arief',
                'role' => 'PML',
                'nip' => '7571040909910001',
                'kode_kabkot' => '08',
                'password' => '7571040909910001',
            ),
            134 =>
            array(
                'nama_lengkap' => 'Yandi Supit  ',
                'username' => 'yandi',
                'role' => 'PML',
                'nip' => '198402282008011002',
                'kode_kabkot' => '05',
                'password' => '198402282008011002',
            ),
            135 =>
            array(
                'nama_lengkap' => 'Failin Olfiane Walalangi ',
                'username' => 'failin',
                'role' => 'PML',
                'nip' => '7107025710910001',
                'kode_kabkot' => '09',
                'password' => '7107025710910001',
            ),
            136 =>
            array(
                'nama_lengkap' => 'Jackson Jefry Massie ',
                'username' => 'jackson',
                'role' => 'PML',
                'nip' => '7107011101790001',
                'kode_kabkot' => '09',
                'password' => '7107011101790001',
            ),
            137 =>
            array(
                'nama_lengkap' => 'Irene Savira Gabriella Sitanggang,',
                'username' => 'irene',
                'role' => 'PML',
                'nip' => '199909062023022001',
                'kode_kabkot' => '09',
                'password' => '199909062023022001',
            ),
            138 =>
            array(
                'nama_lengkap' => 'Kurniawan Walangitan, SE ',
                'username' => 'kurniawan',
                'role' => 'PML',
                'nip' => '198301312006041005',
                'kode_kabkot' => '09',
                'password' => '198301312006041005',
            ),
            139 =>
            array(
                'nama_lengkap' => 'Priscillia Claudia Ponomban ',
                'username' => 'priscillia',
                'role' => 'PML',
                'nip' => '7107056603900001',
                'kode_kabkot' => '09',
                'password' => '7107056603900001',
            ),
            140 =>
            array(
                'nama_lengkap' => 'Alfie Sunkudon, S.Pd ',
                'username' => 'alfie',
                'role' => 'PML',
                'nip' => '197108112014101001',
                'kode_kabkot' => '09',
                'password' => '197108112014101001',
            ),
            141 =>
            array(
                'nama_lengkap' => 'Frisilia Erlita Keintjem ',
                'username' => 'frisilia',
                'role' => 'PML',
                'nip' => '7107045112890001',
                'kode_kabkot' => '09',
                'password' => '7107045112890001',
            ),
            142 =>
            array(
                'nama_lengkap' => 'Augresyo Lucky Johanes Walewangko,',
                'username' => 'augresyo',
                'role' => 'PML',
                'nip' => '198308132003121003',
                'kode_kabkot' => '09',
                'password' => '198308132003121003',
            ),
            143 =>
            array(
                'nama_lengkap' => 'Olce Olke Naray ',
                'username' => 'olce',
                'role' => 'PML',
                'nip' => '7107096810800003',
                'kode_kabkot' => '09',
                'password' => '7107096810800003',
            ),
            144 =>
            array(
                'nama_lengkap' => 'Dodik Setyawan, S.Tr. Stat',
                'username' => 'dodik',
                'role' => 'PML',
                'nip' => '200011292023101004',
                'kode_kabkot' => '09',
                'password' => '200011292023101004',
            ),
            145 =>
            array(
                'nama_lengkap' => 'Bernaldo Napitupulu, S.Tr. Stat',
                'username' => 'bernaldo',
                'role' => 'PML',
                'nip' => '200011112023021002',
                'kode_kabkot' => '09',
                'password' => '200011112023021002',
            ),
            146 =>
            array(
                'nama_lengkap' => 'Jeil Cornelius Dona ',
                'username' => 'jeil',
                'role' => 'PML',
                'nip' => '7107060705950001',
                'kode_kabkot' => '09',
                'password' => '7107060705950001',
            ),
            147 =>
            array(
                'nama_lengkap' => 'Sisilia Eonike Agouw ',
                'username' => 'sisilia',
                'role' => 'PML',
                'nip' => '7107066310910002',
                'kode_kabkot' => '09',
                'password' => '7107066310910002',
            ),
            148 =>
            array(
                'nama_lengkap' => 'Afwin Fauzy Akhsan S.Tr.Stat.',
                'username' => 'afwin',
                'role' => 'PML',
                'nip' => '199609222019011002',
                'kode_kabkot' => '09',
                'password' => '199609222019011002',
            ),
            149 =>
            array(
                'nama_lengkap' => 'Roberth Yanto Sanggana S.Kom.',
                'username' => 'roberth',
                'role' => 'PML',
                'nip' => '198612042011011006',
                'kode_kabkot' => '09',
                'password' => '198612042011011006',
            ),
            150 =>
            array(
                'nama_lengkap' => 'Ripandi Dede  ',
                'username' => 'ripandi',
                'role' => 'PML',
                'nip' => '7111051806910001',
                'kode_kabkot' => '10',
                'password' => '7111051806910001',
            ),
            151 =>
            array(
                'nama_lengkap' => 'Frangki Laselo  ',
                'username' => 'frangki',
                'role' => 'PML',
                'nip' => '7111012604900001',
                'kode_kabkot' => '10',
                'password' => '7111012604900001',
            ),
            152 =>
            array(
                'nama_lengkap' => 'Saeda Nofriani Merondah ',
                'username' => 'saeda',
                'role' => 'PML',
                'nip' => '7111014911910003',
                'kode_kabkot' => '10',
                'password' => '7111014911910003',
            ),
            153 =>
            array(
                'nama_lengkap' => 'ISWANTO DALI  ',
                'username' => 'iswanto',
                'role' => 'PML',
                'nip' => '7111020312940001',
                'kode_kabkot' => '10',
                'password' => '7111020312940001',
            ),
            154 =>
            array(
                'nama_lengkap' => 'Citra mayasari Kaumpungan ',
                'username' => 'citra',
                'role' => 'PML',
                'nip' => '7111037103870001',
                'kode_kabkot' => '10',
                'password' => '7111037103870001',
            ),
            155 =>
            array(
                'nama_lengkap' => 'Novri Hunou  ',
                'username' => 'novri',
                'role' => 'PML',
                'nip' => '7111020811860002',
                'kode_kabkot' => '10',
                'password' => '7111020811860002',
            ),
            156 =>
            array(
                'nama_lengkap' => 'Mohamad Nento  ',
                'username' => 'mohamad_nento',
                'role' => 'PML',
                'nip' => '340060175',
                'kode_kabkot' => '03',
                'password' => '340060175',
            ),
            157 =>
            array(
                'nama_lengkap' => 'Angriyani Mamonto  ',
                'username' => 'angriyani',
                'role' => 'PML',
                'nip' => '7111015708900001',
                'kode_kabkot' => '10',
                'password' => '7111015708900001',
            ),
            158 =>
            array(
                'nama_lengkap' => 'Fitria mooduto  ',
                'username' => 'fitria',
                'role' => 'PML',
                'nip' => '7111016002960001',
                'kode_kabkot' => '10',
                'password' => '7111016002960001',
            ),
            159 =>
            array(
                'nama_lengkap' => 'ISKANDAR DALI  ',
                'username' => 'iskandar',
                'role' => 'PML',
                'nip' => '7111022712840002',
                'kode_kabkot' => '10',
                'password' => '7111022712840002',
            ),
            160 =>
            array(
                'nama_lengkap' => 'Wilna Aliu  ',
                'username' => 'wilna',
                'role' => 'PML',
                'nip' => '7111026712910001',
                'kode_kabkot' => '10',
                'password' => '7111026712910001',
            ),
            161 =>
            array(
                'nama_lengkap' => 'Asril Tuadingo  ',
                'username' => 'asril',
                'role' => 'PML',
                'nip' => '7111012204850002',
                'kode_kabkot' => '10',
                'password' => '7111012204850002',
            ),
            162 =>
            array(
                'nama_lengkap' => 'SRIPITA GINTULANGI  ',
                'username' => 'sripita',
                'role' => 'PML',
                'nip' => '7111026603940001',
                'kode_kabkot' => '10',
                'password' => '7111026603940001',
            ),
            163 =>
            array(
                'nama_lengkap' => 'Karmila Monoarfa  ',
                'username' => 'karmila',
                'role' => 'PML',
                'nip' => '7111034208840001',
                'kode_kabkot' => '10',
                'password' => '7111034208840001',
            ),
            164 =>
            array(
                'nama_lengkap' => 'Alhakrun Mooduto  ',
                'username' => 'alhakrun',
                'role' => 'PML',
                'nip' => '7111021809940001',
                'kode_kabkot' => '10',
                'password' => '7111021809940001',
            ),
            165 =>
            array(
                'nama_lengkap' => 'Saprudin Mokoagow  ',
                'username' => 'saprudin',
                'role' => 'PML',
                'nip' => '196705221991021001',
                'kode_kabkot' => '10',
                'password' => '196705221991021001',
            ),
            166 =>
            array(
                'nama_lengkap' => 'Puty Sarah Sechmat ',
                'username' => 'puty',
                'role' => 'PML',
                'nip' => '7110024912990002',
                'kode_kabkot' => '11',
                'password' => '7110024912990002',
            ),
            167 =>
            array(
                'nama_lengkap' => 'Marvel Wuisan Kaligis ',
                'username' => 'marvel',
                'role' => 'PML',
                'nip' => '7110030810890001',
                'kode_kabkot' => '11',
                'password' => '7110030810890001',
            ),
            168 =>
            array(
                'nama_lengkap' => 'Robin Kalangi  ',
                'username' => 'robin',
                'role' => 'PML',
                'nip' => '7106021910870001',
                'kode_kabkot' => '11',
                'password' => '7106021910870001',
            ),
            169 =>
            array(
                'nama_lengkap' => 'Nurul Sabrinah  ',
                'username' => 'nurul',
                'role' => 'PML',
                'nip' => '7110045605990001',
                'kode_kabkot' => '11',
                'password' => '7110045605990001',
            ),
            170 =>
            array(
                'nama_lengkap' => 'Zhaqif Ambarak  ',
                'username' => 'zhaqif',
                'role' => 'PML',
                'nip' => '7110010205970001',
                'kode_kabkot' => '11',
                'password' => '7110010205970001',
            ),
            171 =>
            array(
                'nama_lengkap' => 'Irwanto Mamonto  ',
                'username' => 'irwanto',
                'role' => 'PML',
                'nip' => '7110030405860002',
                'kode_kabkot' => '11',
                'password' => '7110030405860002',
            ),
            172 =>
            array(
                'nama_lengkap' => 'Celyfia Inding Wuisan ',
                'username' => 'celyfia',
                'role' => 'PML',
                'nip' => '7110034907920001',
                'kode_kabkot' => '11',
                'password' => '7110034907920001',
            ),
            173 =>
            array(
                'nama_lengkap' => 'Feily Lumangkun  ',
                'username' => 'feily',
                'role' => 'PML',
                'nip' => '7110051807860001',
                'kode_kabkot' => '11',
                'password' => '7110051807860001',
            ),
            174 =>
            array(
                'nama_lengkap' => 'Lidya Saud  ',
                'username' => 'lidya',
                'role' => 'PML',
                'nip' => '7110045103820001',
                'kode_kabkot' => '11',
                'password' => '7110045103820001',
            ),
            175 =>
            array(
                'nama_lengkap' => 'Afriani Mamintade  ',
                'username' => 'afriani',
                'role' => 'PML',
                'nip' => '7110014308940001',
                'kode_kabkot' => '11',
                'password' => '7110014308940001',
            ),
            176 =>
            array(
                'nama_lengkap' => 'Asirun Paputungan  ',
                'username' => 'asirun',
                'role' => 'PML',
                'nip' => '7110010812720001',
                'kode_kabkot' => '11',
                'password' => '7110010812720001',
            ),
            177 =>
            array(
                'nama_lengkap' => 'Novita A Saleh ',
                'username' => 'novita',
                'role' => 'PML',
                'nip' => '7110024910980001',
                'kode_kabkot' => '11',
                'password' => '7110024910980001',
            ),
            178 =>
            array(
                'nama_lengkap' => 'Nurhani   ',
                'username' => 'nurhani',
                'role' => 'PML',
                'nip' => '7110044809810001',
                'kode_kabkot' => '11',
                'password' => '7110044809810001',
            ),
            179 =>
            array(
                'nama_lengkap' => 'Fathurahman Bogdadi  ',
                'username' => 'fathurahman',
                'role' => 'PML',
                'nip' => '7110011612940001',
                'kode_kabkot' => '11',
                'password' => '7110011612940001',
            ),
            180 =>
            array(
                'nama_lengkap' => 'Devita Damopolii  ',
                'username' => 'devita',
                'role' => 'PML',
                'nip' => '7110054304810001',
                'kode_kabkot' => '11',
                'password' => '7110054304810001',
            ),
            181 =>
            array(
                'nama_lengkap' => 'Ibrahim Makalalag  ',
                'username' => 'ibrahim',
                'role' => 'PML',
                'nip' => '7110031909770001',
                'kode_kabkot' => '11',
                'password' => '7110031909770001',
            ),
            182 =>
            array(
                'nama_lengkap' => 'Randhy Tahulending  ',
                'username' => 'randhy',
                'role' => 'PML',
                'nip' => '7109040311900001',
                'kode_kabkot' => '71',
                'password' => '7109040311900001',
            ),
            183 =>
            array(
                'nama_lengkap' => 'Lydia Indrawati  ',
                'username' => 'lydia',
                'role' => 'PML',
                'nip' => '7171034810720002',
                'kode_kabkot' => '71',
                'password' => '7171034810720002',
            ),
            184 =>
            array(
                'nama_lengkap' => 'Vonny Joice Lalujan ',
                'username' => 'vonny',
                'role' => 'PML',
                'nip' => '196911011992022001',
                'kode_kabkot' => '71',
                'password' => '196911011992022001',
            ),
            185 =>
            array(
                'nama_lengkap' => 'Outenty Bimbangnaung  ',
                'username' => 'outenty',
                'role' => 'PML',
                'nip' => '198110312007012001',
                'kode_kabkot' => '71',
                'password' => '198110312007012001',
            ),
            186 =>
            array(
                'nama_lengkap' => 'Olivia Sahambangung  ',
                'username' => 'olivia_sahambangung',
                'role' => 'PML',
                'nip' => '197209261996031002',
                'kode_kabkot' => '05',
                'password' => '197209261996031002',
            ),
            187 =>
            array(
                'nama_lengkap' => 'Deyvi Stella Rumangkang ',
                'username' => 'deyvi',
                'role' => 'PML',
                'nip' => '197912192014062002',
                'kode_kabkot' => '71',
                'password' => '197912192014062002',
            ),
            188 =>
            array(
                'nama_lengkap' => 'Rikky Rugian  ',
                'username' => 'rikky',
                'role' => 'PML',
                'nip' => '197902091999031002',
                'kode_kabkot' => '71',
                'password' => '197902091999031002',
            ),
            189 =>
            array(
                'nama_lengkap' => 'Vivi Novita Sumampouw ',
                'username' => 'vivi_sumampou',
                'role' => 'PML',
                'nip' => '7109066605860001',
                'kode_kabkot' => '08',
                'password' => '7109066605860001',
            ),
            190 =>
            array(
                'nama_lengkap' => 'Roy Makalew  ',
                'username' => 'roy',
                'role' => 'PML',
                'nip' => '7171092511960003',
                'kode_kabkot' => '71',
                'password' => '7171092511960003',
            ),
            191 =>
            array(
                'nama_lengkap' => 'STEVI NOVITA WULAN RUMANGKANG',
                'username' => 'stevi',
                'role' => 'PML',
                'nip' => '7171085511890001',
                'kode_kabkot' => '71',
                'password' => '7171085511890001',
            ),
            192 =>
            array(
                'nama_lengkap' => 'Grace Shallomita Novelia Thomas',
                'username' => 'grace',
                'role' => 'PML',
                'nip' => '7171016711020003',
                'kode_kabkot' => '71',
                'password' => '7171016711020003',
            ),
            193 =>
            array(
                'nama_lengkap' => 'Farhan, S.Tr.Stat  ',
                'username' => 'farhan,',
                'role' => 'PML',
                'nip' => '199905122021041001',
                'kode_kabkot' => '71',
                'password' => '199905122021041001',
            ),
            194 =>
            array(
                'nama_lengkap' => 'Vini Cristin, S.Tr.Stat ',
                'username' => 'vini',
                'role' => 'PML',
                'nip' => '199908272022012003',
                'kode_kabkot' => '71',
                'password' => '199908272022012003',
            ),
            195 =>
            array(
                'nama_lengkap' => 'Defi Astuti Anggraeni, S.Tr.Stat',
                'username' => 'defi',
                'role' => 'PML',
                'nip' => '199802032021042001',
                'kode_kabkot' => '71',
                'password' => '199802032021042001',
            ),
            196 =>
            array(
                'nama_lengkap' => 'Gaberiel, S.Tr.Stat  ',
                'username' => 'gaberiel,',
                'role' => 'PML',
                'nip' => '200103092023021006',
                'kode_kabkot' => '71',
                'password' => '200103092023021006',
            ),
            197 =>
            array(
                'nama_lengkap' => 'Fadila Ahmad, S.Tr.Stat ',
                'username' => 'fadila',
                'role' => 'PML',
                'nip' => '199903162023021002',
                'kode_kabkot' => '71',
                'password' => '199903162023021002',
            ),
            198 =>
            array(
                'nama_lengkap' => 'Maskhur Solikhudin, S.Tr.Stat ',
                'username' => 'maskhur',
                'role' => 'PML',
                'nip' => '199811162022011002',
                'kode_kabkot' => '71',
                'password' => '199811162022011002',
            ),
            199 =>
            array(
                'nama_lengkap' => 'Habel Nitalessy, S.Tr.Stat ',
                'username' => 'habel',
                'role' => 'PML',
                'nip' => '199905162023021001',
                'kode_kabkot' => '71',
                'password' => '199905162023021001',
            ),
            200 =>
            array(
                'nama_lengkap' => 'Weny Fitrah Anwari, S.Tr.Stat',
                'username' => 'weny',
                'role' => 'PML',
                'nip' => '199610152019012001',
                'kode_kabkot' => '71',
                'password' => '199610152019012001',
            ),
            201 =>
            array(
                'nama_lengkap' => 'Anis Karimah, S.Tr.Stat ',
                'username' => 'anis',
                'role' => 'PML',
                'nip' => '199607032019012002',
                'kode_kabkot' => '71',
                'password' => '199607032019012002',
            ),
            202 =>
            array(
                'nama_lengkap' => 'Ricky, A.Md  ',
                'username' => 'ricky,',
                'role' => 'PML',
                'nip' => '198012162011011003',
                'kode_kabkot' => '71',
                'password' => '198012162011011003',
            ),
            203 =>
            array(
                'nama_lengkap' => 'Nik\'mah   ',
                'username' => 'nik\'mah',
                'role' => 'PML',
                'nip' => '197201071994032001',
                'kode_kabkot' => '71',
                'password' => '197201071994032001',
            ),
            204 =>
            array(
                'nama_lengkap' => 'Ahmad Samsudin, SST ',
                'username' => 'ahmad',
                'role' => 'PML',
                'nip' => '199412082018021001',
                'kode_kabkot' => '72',
                'password' => '199412082018021001',
            ),
            205 =>
            array(
                'nama_lengkap' => 'Anitje Rastrawati Katuuk, SE',
                'username' => 'anitje',
                'role' => 'PML',
                'nip' => '196704301986032002',
                'kode_kabkot' => '72',
                'password' => '196704301986032002',
            ),
            206 =>
            array(
                'nama_lengkap' => 'Augustin Sultje Selfana Pussung,',
                'username' => 'augustin',
                'role' => 'PML',
                'nip' => '197008011992102001',
                'kode_kabkot' => '72',
                'password' => '197008011992102001',
            ),
            207 =>
            array(
                'nama_lengkap' => 'Firly Lutfiana Prahardini, S.Tr.Stat.',
                'username' => 'firly',
                'role' => 'PML',
                'nip' => '199506182019122002',
                'kode_kabkot' => '72',
                'password' => '199506182019122002',
            ),
            208 =>
            array(
                'nama_lengkap' => 'Henny Pura, ST ',
                'username' => 'henny',
                'role' => 'PML',
                'nip' => '198505172010032003',
                'kode_kabkot' => '72',
                'password' => '198505172010032003',
            ),
            209 =>
            array(
                'nama_lengkap' => 'Iska Myranti, S.Tr.Stat. ',
                'username' => 'iska',
                'role' => 'PML',
                'nip' => '199710092021042002',
                'kode_kabkot' => '72',
                'password' => '199710092021042002',
            ),
            210 =>
            array(
                'nama_lengkap' => 'Lasimran Tarib  ',
                'username' => 'lasimran',
                'role' => 'PML',
                'nip' => '196812052007011006',
                'kode_kabkot' => '72',
                'password' => '196812052007011006',
            ),
            211 =>
            array(
                'nama_lengkap' => 'Marcopolo Gultom, S.Tr.Stat. ',
                'username' => 'marcopolo',
                'role' => 'PML',
                'nip' => '199608092019011001',
                'kode_kabkot' => '72',
                'password' => '199608092019011001',
            ),
            212 =>
            array(
                'nama_lengkap' => 'Marya Zahra Aliffio Krisfianda,',
                'username' => 'marya',
                'role' => 'PML',
                'nip' => '200008292023102002',
                'kode_kabkot' => '72',
                'password' => '200008292023102002',
            ),
            213 =>
            array(
                'nama_lengkap' => 'Meidy Talingkas, S.Si., M.Ec.',
                'username' => 'meidy',
                'role' => 'PML',
                'nip' => '198103132011012005',
                'kode_kabkot' => '72',
                'password' => '198103132011012005',
            ),
            214 =>
            array(
                'nama_lengkap' => 'Mohamad Rezka Aji Pambudi,',
                'username' => 'rezka_aji',
                'role' => 'PML',
                'nip' => '199710062021041001',
                'kode_kabkot' => '72',
                'password' => '199710062021041001',
            ),
            215 =>
            array(
                'nama_lengkap' => 'Nur Alamsyah  ',
                'username' => 'nur',
                'role' => 'PML',
                'nip' => '199501242019031001',
                'kode_kabkot' => '72',
                'password' => '199501242019031001',
            ),
            216 =>
            array(
                'nama_lengkap' => 'Olivia Inggrit Waturandang ',
                'username' => 'olivia_waturandang',
                'role' => 'PML',
                'nip' => '7174016506820001',
                'kode_kabkot' => '74',
                'password' => '7174016506820001',
            ),
            217 =>
            array(
                'nama_lengkap' => 'Puput Astutik, S.Tr.Stat. ',
                'username' => 'puput',
                'role' => 'ADMIN',
                'nip' => '199605122019012002',
                'kode_kabkot' => '72',
                'password' => '199605122019012002',
            ),
            218 =>
            array(
                'nama_lengkap' => 'Rizky Perdana, S.Tr.Stat. ',
                'username' => 'rizky',
                'role' => 'PML',
                'nip' => '199809212022011002',
                'kode_kabkot' => '72',
                'password' => '199809212022011002',
            ),
            219 =>
            array(
                'nama_lengkap' => 'Rudy Helfrich Pomantow ',
                'username' => 'rudy_pomantow',
                'role' => 'PML',
                'nip' => '198610142006042002',
                'kode_kabkot' => '71',
                'password' => '198610142006042002',
            ),
            220 =>
            array(
                'nama_lengkap' => 'Sahirjan Raup, A.Md ',
                'username' => 'sahirjan',
                'role' => 'PML',
                'nip' => '198608062010031002',
                'kode_kabkot' => '72',
                'password' => '198608062010031002',
            ),
            221 =>
            array(
                'nama_lengkap' => 'Reyf Reymond Kumontoy ',
                'username' => 'reyf',
                'role' => 'PML',
                'nip' => '198110162007011002',
                'kode_kabkot' => '73',
                'password' => '198110162007011002',
            ),
            222 =>
            array(
                'nama_lengkap' => 'Inneke Meylinda Nender ',
                'username' => 'inneke',
                'role' => 'PML',
                'nip' => '197702192006042003',
                'kode_kabkot' => '73',
                'password' => '197702192006042003',
            ),
            223 =>
            array(
                'nama_lengkap' => 'Manca Satria  ',
                'username' => 'manca',
                'role' => 'PML',
                'nip' => '200006292023021002',
                'kode_kabkot' => '73',
                'password' => '200006292023021002',
            ),
            224 =>
            array(
                'nama_lengkap' => 'Olivia Susanti Makaringang ',
                'username' => 'olivia',
                'role' => 'PML',
                'nip' => '198810072008012001',
                'kode_kabkot' => '73',
                'password' => '198810072008012001',
            ),
            225 =>
            array(
                'nama_lengkap' => 'Susana Ritha Lanny Rumangkang',
                'username' => 'susana',
                'role' => 'PML',
                'nip' => '197609102001122006',
                'kode_kabkot' => '73',
                'password' => '197609102001122006',
            ),
            226 =>
            array(
                'nama_lengkap' => 'Berliand Fadly Igir ',
                'username' => 'berliand',
                'role' => 'PML',
                'nip' => '196410292006041004',
                'kode_kabkot' => '73',
                'password' => '196410292006041004',
            ),
            227 =>
            array(
                'nama_lengkap' => 'Irfan Damar Prasetyo ',
                'username' => 'irfan',
                'role' => 'PML',
                'nip' => '199412072018021001',
                'kode_kabkot' => '73',
                'password' => '199412072018021001',
            ),
            228 =>
            array(
                'nama_lengkap' => 'Winarko   ',
                'username' => 'winarko',
                'role' => 'PML',
                'nip' => '197501131997121001',
                'kode_kabkot' => '73',
                'password' => '197501131997121001',
            ),
            229 =>
            array(
                'nama_lengkap' => 'Alfian Fransiscus Sumayku ',
                'username' => 'alfian',
                'role' => 'PML',
                'nip' => '198110042008012013',
                'kode_kabkot' => '72',
                'password' => '198110042008012013',
            ),
            230 =>
            array(
                'nama_lengkap' => 'Muhammad Aja Fajrian ',
                'username' => 'muhammad',
                'role' => 'PML',
                'nip' => '199212272016021001',
                'kode_kabkot' => '73',
                'password' => '199212272016021001',
            ),
            231 =>
            array(
                'nama_lengkap' => 'Oubert Voldy Pangkerego ',
                'username' => 'oubert',
                'role' => 'PML',
                'nip' => '7173022310820001',
                'kode_kabkot' => '73',
                'password' => '7173022310820001',
            ),
            232 =>
            array(
                'nama_lengkap' => 'Windy Rainy Wongkar ',
                'username' => 'windy',
                'role' => 'PML',
                'nip' => '7173025811850002',
                'kode_kabkot' => '73',
                'password' => '7173025811850002',
            ),
            233 =>
            array(
                'nama_lengkap' => 'Jeinne Adriana Yeskiel ',
                'username' => 'jeinne',
                'role' => 'PML',
                'nip' => '7173024906770001',
                'kode_kabkot' => '73',
                'password' => '7173024906770001',
            ),
            234 =>
            array(
                'nama_lengkap' => 'Vivi Vindy Rufina Pangalila',
                'username' => 'vivi',
                'role' => 'PML',
                'nip' => '198011172010032002',
                'kode_kabkot' => '71',
                'password' => '198011172010032002',
            ),
            235 =>
            array(
                'nama_lengkap' => 'Suzan Herly Rumajar ',
                'username' => 'suzan',
                'role' => 'PML',
                'nip' => '7173016709810003',
                'kode_kabkot' => '73',
                'password' => '7173016709810003',
            ),
            236 =>
            array(
                'nama_lengkap' => 'Yesti Potu  ',
                'username' => 'yesti',
                'role' => 'PML',
                'nip' => '7171046307850004',
                'kode_kabkot' => '73',
                'password' => '7171046307850004',
            ),
            237 =>
            array(
                'nama_lengkap' => 'Meylanita Christiana Ellen Ratta',
                'username' => 'meylanita',
                'role' => 'PML',
                'nip' => '7173046705850001',
                'kode_kabkot' => '73',
                'password' => '7173046705850001',
            ),
            238 =>
            array(
                'nama_lengkap' => 'Arie Dwi Permana ',
                'username' => 'arie',
                'role' => 'PML',
                'nip' => '7174042311880002',
                'kode_kabkot' => '74',
                'password' => '7174042311880002',
            ),
            239 =>
            array(
                'nama_lengkap' => 'Dewi Prinita Mongilong ',
                'username' => 'dewi',
                'role' => 'PML',
                'nip' => '198808172011011011',
                'kode_kabkot' => '01',
                'password' => '198808172011011011',
            ),
            240 =>
            array(
                'nama_lengkap' => 'Djamila Akuba  ',
                'username' => 'djamila',
                'role' => 'PML',
                'nip' => '7174025410630001',
                'kode_kabkot' => '74',
                'password' => '7174025410630001',
            ),
            241 =>
            array(
                'nama_lengkap' => 'Insi Mardiasi Kangki ',
                'username' => 'insi',
                'role' => 'PML',
                'nip' => '7174035310830002',
                'kode_kabkot' => '74',
                'password' => '7174035310830002',
            ),
            242 =>
            array(
                'nama_lengkap' => 'Meilan Ponuntul  ',
                'username' => 'meilan',
                'role' => 'PML',
                'nip' => '7174035612820001',
                'kode_kabkot' => '74',
                'password' => '7174035612820001',
            ),
            243 =>
            array(
                'nama_lengkap' => 'Meity Serly Dondo ',
                'username' => 'meity',
                'role' => 'ADMIN',
                'nip' => '199605312019012001',
                'kode_kabkot' => '74',
                'password' => '199605312019012001',
            ),
            244 =>
            array(
                'nama_lengkap' => 'Rudy Ginoga  ',
                'username' => 'rudy',
                'role' => 'PML',
                'nip' => '7111030406830001',
                'kode_kabkot' => '10',
                'password' => '7111030406830001',
            ),
            245 =>
            array(
                'nama_lengkap' => 'Cynthia Dwi Setyarini ',
                'username' => 'cynthia',
                'role' => 'PML',
                'nip' => '3322184902980003',
                'kode_kabkot' => '74',
                'password' => '3322184902980003',
            ),
            246 =>
            array(
                'nama_lengkap' => 'Nadyah Rizka Cahyani ',
                'username' => 'nadyah',
                'role' => 'PML',
                'nip' => '7271026910010004',
                'kode_kabkot' => '74',
                'password' => '7271026910010004',
            ),
            247 =>
            array(
                'nama_lengkap' => 'Siti Mutiah Rahma Utina',
                'username' => 'siti',
                'role' => 'PML',
                'nip' => '7171055712010001',
                'kode_kabkot' => '74',
                'password' => '7171055712010001',
            ),
            248 =>
            array(
                'nama_lengkap' => 'Ulung Rimbah  ',
                'username' => 'ulung',
                'role' => 'PML',
                'nip' => '197209212002121002',
                'kode_kabkot' => '74',
                'password' => '197209212002121002',
            ),
            249 =>
            array(
                'nama_lengkap' => 'Yulia Sakinah  ',
                'username' => 'yulia',
                'role' => 'PML',
                'nip' => '3173075007950002',
                'kode_kabkot' => '74',
                'password' => '3173075007950002',
            ),
            250 =>
            array(
                'nama_lengkap' => 'Dita Saskia Sj Saida',
                'username' => 'dita',
                'role' => 'PML',
                'nip' => '7271014801010007',
                'kode_kabkot' => '74',
                'password' => '7271014801010007',
            ),
            251 =>
            array(
                'nama_lengkap' => 'Meilisa Indahsari  ',
                'username' => 'meilisa',
                'role' => 'PML',
                'nip' => '3327134805010007',
                'kode_kabkot' => '74',
                'password' => '3327134805010007',
            ),
            252 =>
            array(
                'nama_lengkap' => 'Rosmita Noor Arifah ',
                'username' => 'rosmita',
                'role' => 'PML',
                'nip' => '3311125303980003',
                'kode_kabkot' => '74',
                'password' => '3311125303980003',
            ),
            253 =>
            array(
                'nama_lengkap' => 'Dian Purnama Pakpahan ',
                'username' => 'dian_pakpahan',
                'role' => 'PML',
                'nip' => '7174022905830001',
                'kode_kabkot' => '74',
                'password' => '7174022905830001',
            ),
            254 =>
            array(
                'nama_lengkap' => 'Ester Harefa, S.Tr.Stat. ',
                'username' => 'ester',
                'role' => 'ADMIN',
                'nip' => '199908062022012006',
                'kode_kabkot' => '01',
                'password' => '199908062022012006',
            ),
            255 =>
            array(
                'nama_lengkap' => 'Krisnanda Prasetya Adi,S.Tr.Stat ',
                'username' => 'krisnanda',
                'role' => 'PML',
                'nip' => '198406092010031001',
                'kode_kabkot' => '05',
                'password' => '198406092010031001',
            ),
            256 =>
            array(
                'nama_lengkap' => 'Suryo Refli Ranto, SST',
                'username' => 'suryo',
                'role' => 'ADMIN',
                'nip' => '199207152014121000',
                'kode_kabkot' => '04',
                'password' => '199207152014121000',
            ),
            257 =>
            array(
                'nama_lengkap' => 'Piky Pomantow, A.MdKom ',
                'username' => 'piky',
                'role' => 'ADMIN',
                'nip' => '198807182010031001',
                'kode_kabkot' => '05',
                'password' => '198807182010031001',
            ),
            258 =>
            array(
                'nama_lengkap' => 'Putri Septianingsih, S.Tr.Stat ',
                'username' => 'putri',
                'role' => 'ADMIN',
                'nip' => '199809082021042000',
                'kode_kabkot' => '06',
                'password' => '199809082021042000',
            ),
            259 =>
            array(
                'nama_lengkap' => 'Wulandari Ponto,SST  ',
                'username' => 'wulandari',
                'role' => 'ADMIN',
                'nip' => '199412012017012001',
                'kode_kabkot' => '08',
                'password' => '199412012017012001',
            ),
            260 =>
            array(
                'nama_lengkap' => 'Desnacita Harly Putri, SST',
                'username' => 'desnacita',
                'role' => 'ADMIN',
                'nip' => '19951221201802002',
                'kode_kabkot' => '09',
                'password' => '19951221201802002',
            ),
            261 =>
            array(
                'nama_lengkap' => 'Dwiwandi Alfa Sekeon,S.Tr.Stat. ',
                'username' => 'dwiwandi',
                'role' => 'ADMIN',
                'nip' => '199801052022011002',
                'kode_kabkot' => '11',
                'password' => '199801052022011002',
            ),
            262 =>
            array(
                'nama_lengkap' => 'Munawir Kobis  ',
                'username' => 'munawir',
                'role' => 'ADMIN',
                'nip' => '198805202013111001',
                'kode_kabkot' => '71',
                'password' => '198805202013111001',
            ),
            263 =>
            array(
                'nama_lengkap' => 'Ni Putu Beliana Puspita',
                'username' => 'ni',
                'role' => 'ADMIN',
                'nip' => '199611292019012002',
                'kode_kabkot' => '71',
                'password' => '199611292019012002',
            ),
            264 =>
            array(
                'nama_lengkap' => 'Isna Muflichatul Fadhilah, SST',
                'username' => 'isna',
                'role' => 'ADMIN',
                'nip' => '199311082016022002',
                'kode_kabkot' => '73',
                'password' => '199311082016022002',
            ),
            265 =>
            array(
                'nama_lengkap' => 'Dian Purnama Pakpahan, S.Tr.Stat.',
                'username' => 'dian',
                'role' => 'ADMIN',
                'nip' => '199806202021041000',
                'kode_kabkot' => '03',
                'password' => '199806202021041000',
            ),
            266 =>
            array(
                'nama_lengkap' => 'Abdul Aziz Makhrus, S.Tr.Stat.',
                'username' => 'aziz',
                'role' => 'ADMIN',
                'nip' => '199607082019011003',
                'kode_kabkot' => '01',
                'password' => '199607082019011003',
            ),
            267 =>
            array(
                'nama_lengkap' => 'Ponimin, S.Tr.Stat.',
                'username' => 'ponim',
                'role' => 'ADMIN',
                'nip' => '199810132021041001',
                'kode_kabkot' => '01',
                'password' => '199810132021041001',
            ),
        );
        foreach ($users as $key => $value) {
            $value['password'] = Hash::make($value['password']);
            $value['email'] = $value['username'] . "@ssnmeta.sulut";
            User::create($value);
        }
    }
}
