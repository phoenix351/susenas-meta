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
        // $users = array(
        //     0 =>
        //     array(
        //         'nama_lengkap' => 'Frisca Tiara Iskandar',
        //         'nip' => '7101095002010213',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'frisca1',
        //         'password' => '7101095002010213',
        //     ),
        //     1 =>
        //     array(
        //         'nama_lengkap' => 'Anastasya maharani potabuga',
        //         'nip' => '7101094108000211',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'anastasya2',
        //         'password' => '7101094108000211',
        //     ),
        //     2 =>
        //     array(
        //         'nama_lengkap' => 'Burhanuddin Potabuga',
        //         'nip' => '7101091102640001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'burhanuddin3',
        //         'password' => '7101091102640001',
        //     ),
        //     3 =>
        //     array(
        //         'nama_lengkap' => 'Ardi Tuuk',
        //         'nip' => '7101100503690301',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'ardi4',
        //         'password' => '7101100503690301',
        //     ),
        //     4 =>
        //     array(
        //         'nama_lengkap' => 'Laily Agustina Bestari',
        //         'nip' => '199708252019122001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'laily5',
        //         'password' => '199708252019122001',
        //     ),
        //     5 =>
        //     array(
        //         'nama_lengkap' => 'Linda Diana Lumingkewas',
        //         'nip' => '197706182001122002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'linda6',
        //         'password' => '197706182001122002',
        //     ),
        //     6 =>
        //     array(
        //         'nama_lengkap' => 'Wahyu April Yanto',
        //         'nip' => '199804252021041003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'wahyu7',
        //         'password' => '199804252021041003',
        //     ),
        //     7 =>
        //     array(
        //         'nama_lengkap' => 'Ries Afmi Nicky Manorek S.E',
        //         'nip' => '198211292011011010',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'ries8',
        //         'password' => '198211292011011010',
        //     ),
        //     8 =>
        //     array(
        //         'nama_lengkap' => 'Lomat Tungkagi',
        //         'nip' => '196710101989032004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'lomat9',
        //         'password' => '196710101989032004',
        //     ),
        //     9 =>
        //     array(
        //         'nama_lengkap' => 'Steven Monintja',
        //         'nip' => '197609242007011002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'steven10',
        //         'password' => '197609242007011002',
        //     ),
        //     10 =>
        //     array(
        //         'nama_lengkap' => 'Sofyan Ano',
        //         'nip' => '197411132005021003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'sofyan11',
        //         'password' => '197411132005021003',
        //     ),
        //     11 =>
        //     array(
        //         'nama_lengkap' => 'Paramitha Madelin Albright',
        //         'nip' => '200102092023022003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'paramitha12',
        //         'password' => '200102092023022003',
        //     ),
        //     12 =>
        //     array(
        //         'nama_lengkap' => 'Alfian Harki Damopoli',
        //         'nip' => '198808172011011011',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'alfian13',
        //         'password' => '198808172011011011',
        //     ),
        //     13 =>
        //     array(
        //         'nama_lengkap' => 'Aninditya Yuniar',
        //         'nip' => '199806112021042001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'aninditya14',
        //         'password' => '199806112021042001',
        //     ),
        //     14 =>
        //     array(
        //         'nama_lengkap' => 'Ratih Rodliyah',
        //         'nip' => '19981011 202310 2 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'ratih15',
        //         'password' => '19981011 202310 2 001',
        //     ),
        //     15 =>
        //     array(
        //         'nama_lengkap' => 'Rani Adila',
        //         'nip' => '20020906 202310 2 003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'rani16',
        //         'password' => '20020906 202310 2 003',
        //     ),
        //     16 =>
        //     array(
        //         'nama_lengkap' => 'Amarlia Putri Garini',
        //         'nip' => '199511152018022001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'amarlia17',
        //         'password' => '199511152018022001',
        //     ),
        //     17 =>
        //     array(
        //         'nama_lengkap' => 'Rahmi Maulina Alwi',
        //         'nip' => '20010605 202310 2 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '01',
        //         'username' => 'rahmi18',
        //         'password' => '20010605 202310 2 002',
        //     ),
        //     18 =>
        //     array(
        //         'nama_lengkap' => 'Sendy Oroh',
        //         'nip' => '197808212006042005',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'sendy20',
        //         'password' => '197808212006042005',
        //     ),
        //     19 =>
        //     array(
        //         'nama_lengkap' => 'Triny Aleine Talumewo',
        //         'nip' => '198608192005022001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'triny21',
        //         'password' => '198608192005022001',
        //     ),
        //     20 =>
        //     array(
        //         'nama_lengkap' => 'Fenny Irma Paula Wangko',
        //         'nip' => '7102115512720002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'fenny22',
        //         'password' => '7102115512720002',
        //     ),
        //     21 =>
        //     array(
        //         'nama_lengkap' => 'Fabiola Sanger',
        //         'nip' => '198302232002122001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'fabiola23',
        //         'password' => '198302232002122001',
        //     ),
        //     22 =>
        //     array(
        //         'nama_lengkap' => 'Gemayel Gamaliel Sahiu',
        //         'nip' => '198905162012121001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'gemayel24',
        //         'password' => '198905162012121001',
        //     ),
        //     23 =>
        //     array(
        //         'nama_lengkap' => 'Arsdhewani Maria Vianey',
        //         'nip' => '200107102023102002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'arsdhewani25',
        //         'password' => '200107102023102002',
        //     ),
        //     24 =>
        //     array(
        //         'nama_lengkap' => 'Adryan Sapta Setyadinata',
        //         'nip' => '199909042023021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'adryan26',
        //         'password' => '199909042023021001',
        //     ),
        //     25 =>
        //     array(
        //         'nama_lengkap' => 'Kannia Amielsa Shanenda',
        //         'nip' => '199805302021042002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'kannia27',
        //         'password' => '199805302021042002',
        //     ),
        //     26 =>
        //     array(
        //         'nama_lengkap' => 'Novi Yanti Mamangkey',
        //         'nip' => '198105122010032001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'novi28',
        //         'password' => '198105122010032001',
        //     ),
        //     27 =>
        //     array(
        //         'nama_lengkap' => 'Tirsa Poli',
        //         'nip' => '198301232010032002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'tirsa29',
        //         'password' => '198301232010032002',
        //     ),
        //     28 =>
        //     array(
        //         'nama_lengkap' => 'Edwin Franke Lantang',
        //         'nip' => '197907112014101001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'edwin30',
        //         'password' => '197907112014101001',
        //     ),
        //     29 =>
        //     array(
        //         'nama_lengkap' => 'Jusran Zakaria',
        //         'nip' => '197003231992111001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'jusran31',
        //         'password' => '197003231992111001',
        //     ),
        //     30 =>
        //     array(
        //         'nama_lengkap' => 'Glen Tambahani',
        //         'nip' => '196709161989031002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'glen32',
        //         'password' => '196709161989031002',
        //     ),
        //     31 =>
        //     array(
        //         'nama_lengkap' => 'Anggit Prihatmaja',
        //         'nip' => '199606072019121001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'anggit33',
        //         'password' => '199606072019121001',
        //     ),
        //     32 =>
        //     array(
        //         'nama_lengkap' => 'Veisy Novita Sumolang',
        //         'nip' => '7102106311920001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'veisy34',
        //         'password' => '7102106311920001',
        //     ),
        //     33 =>
        //     array(
        //         'nama_lengkap' => 'Vera Veronika Guilermo',
        //         'nip' => '7102165402750001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'vera35',
        //         'password' => '7102165402750001',
        //     ),
        //     34 =>
        //     array(
        //         'nama_lengkap' => 'Azim Naila Fadhlilah',
        //         'nip' => '200001122023102001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'azim36',
        //         'password' => '200001122023102001',
        //     ),
        //     35 =>
        //     array(
        //         'nama_lengkap' => 'Altje Lontoh',
        //         'nip' => '197204021992022002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '02',
        //         'username' => 'altje37',
        //         'password' => '197204021992022002',
        //     ),
        //     36 =>
        //     array(
        //         'nama_lengkap' => 'Candra Nain Hapantenda',
        //         'nip' => '7103254408990000',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'candra39',
        //         'password' => '7103254408990000',
        //     ),
        //     37 =>
        //     array(
        //         'nama_lengkap' => 'Ferdinand Tangkabiringan',
        //         'nip' => '7103170902640301',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'ferdinand40',
        //         'password' => '7103170902640301',
        //     ),
        //     38 =>
        //     array(
        //         'nama_lengkap' => 'Johny steven manoppo',
        //         'nip' => '7103100206820003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'johny41',
        //         'password' => '7103100206820003',
        //     ),
        //     39 =>
        //     array(
        //         'nama_lengkap' => 'Krisnanda Prasetya Adi',
        //         'nip' => '340060175',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'krisnanda42',
        //         'password' => '340060175',
        //     ),
        //     40 =>
        //     array(
        //         'nama_lengkap' => 'Stanly Mokodompis',
        //         'nip' => '340020228',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'stanly43',
        //         'password' => '340020228',
        //     ),
        //     41 =>
        //     array(
        //         'nama_lengkap' => 'Lusine Karel',
        //         'nip' => '340056662',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'lusine44',
        //         'password' => '340056662',
        //     ),
        //     42 =>
        //     array(
        //         'nama_lengkap' => 'Kharis M.H.Y. Mare',
        //         'nip' => '340053859',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'kharis45',
        //         'password' => '340053859',
        //     ),
        //     43 =>
        //     array(
        //         'nama_lengkap' => 'Sutriwati Daulu',
        //         'nip' => '340019841',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'sutriwati46',
        //         'password' => '340019841',
        //     ),
        //     44 =>
        //     array(
        //         'nama_lengkap' => 'Djon V.M. Lahamendu',
        //         'nip' => '340015913',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'djon47',
        //         'password' => '340015913',
        //     ),
        //     45 =>
        //     array(
        //         'nama_lengkap' => 'Yunita Yetty Winangon',
        //         'nip' => '340016367',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'yunita48',
        //         'password' => '340016367',
        //     ),
        //     46 =>
        //     array(
        //         'nama_lengkap' => 'Herison Gunde',
        //         'nip' => '340019346',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'herison49',
        //         'password' => '340019346',
        //     ),
        //     47 =>
        //     array(
        //         'nama_lengkap' => 'Renald  S. Salendah',
        //         'nip' => '340058449',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'renald50',
        //         'password' => '340058449',
        //     ),
        //     48 =>
        //     array(
        //         'nama_lengkap' => 'Fin Mangendai',
        //         'nip' => '340019522',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'fin51',
        //         'password' => '340019522',
        //     ),
        //     49 =>
        //     array(
        //         'nama_lengkap' => 'Agus Hardiyanto',
        //         'nip' => '340061630',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'agus52',
        //         'password' => '340061630',
        //     ),
        //     50 =>
        //     array(
        //         'nama_lengkap' => 'Erwin A. Makadapa',
        //         'nip' => '340056661',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'erwin53',
        //         'password' => '340056661',
        //     ),
        //     51 =>
        //     array(
        //         'nama_lengkap' => 'B. Lenskar Diamanis',
        //         'nip' => '340056657',
        //         'role' => 'PML',
        //         'kode_kabkot' => '03',
        //         'username' => 'b.54',
        //         'password' => '340056657',
        //     ),
        //     52 =>
        //     array(
        //         'nama_lengkap' => 'Meri Yohana Singkara, A.Md',
        //         'nip' => '19840513 201101 2 012',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'meri56',
        //         'password' => '19840513 201101 2 012',
        //     ),
        //     53 =>
        //     array(
        //         'nama_lengkap' => 'Yulita Liroga',
        //         'nip' => '19800621 200801 2 018',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'yulita57',
        //         'password' => '19800621 200801 2 018',
        //     ),
        //     54 =>
        //     array(
        //         'nama_lengkap' => 'Meytry Petronella Purba, S.Tr.Stat',
        //         'nip' => '20000511 202302 2 000',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'meytry58',
        //         'password' => '20000511 202302 2 000',
        //     ),
        //     55 =>
        //     array(
        //         'nama_lengkap' => 'Julia Taarae',
        //         'nip' => '19750702 200701 2 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'julia59',
        //         'password' => '19750702 200701 2 002',
        //     ),
        //     56 =>
        //     array(
        //         'nama_lengkap' => 'Monita Purba, S.Tr.Stat',
        //         'nip' => '19990224 202302 2 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'monita60',
        //         'password' => '19990224 202302 2 001',
        //     ),
        //     57 =>
        //     array(
        //         'nama_lengkap' => 'Jongly Wua',
        //         'nip' => '19880811 200801 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'jongly61',
        //         'password' => '19880811 200801 1 001',
        //     ),
        //     58 =>
        //     array(
        //         'nama_lengkap' => 'Ekstipan Riung Mahda',
        //         'nip' => '19800304 200701 1 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'ekstipan62',
        //         'password' => '19800304 200701 1 002',
        //     ),
        //     59 =>
        //     array(
        //         'nama_lengkap' => 'Gilang Cahya Permadi, S.Tr.Stat',
        //         'nip' => '19980125 202104 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'gilang63',
        //         'password' => '19980125 202104 1 001',
        //     ),
        //     60 =>
        //     array(
        //         'nama_lengkap' => 'Kalpin Kahosadi',
        //         'nip' => '7104112202890001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'kalpin64',
        //         'password' => '7104112202890001',
        //     ),
        //     61 =>
        //     array(
        //         'nama_lengkap' => 'Meistip Singkara',
        //         'nip' => '7104163105860001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'meistip65',
        //         'password' => '7104163105860001',
        //     ),
        //     62 =>
        //     array(
        //         'nama_lengkap' => 'Pradipto Ontorael',
        //         'nip' => '19760201 201406 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'pradipto66',
        //         'password' => '19760201 201406 1 001',
        //     ),
        //     63 =>
        //     array(
        //         'nama_lengkap' => 'Jakob T. Mahda',
        //         'nip' => '19670323 199003 1 006',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'jakob67',
        //         'password' => '19670323 199003 1 006',
        //     ),
        //     64 =>
        //     array(
        //         'nama_lengkap' => 'Ilham Alifian Firmansyah, S.Tr.Stat',
        //         'nip' => '20010722 202310 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'ilham68',
        //         'password' => '20010722 202310 1 001',
        //     ),
        //     65 =>
        //     array(
        //         'nama_lengkap' => 'Sofian Ramdani, S.Tr.Stat',
        //         'nip' => '20001210 202310 1 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'sofian69',
        //         'password' => '20001210 202310 1 002',
        //     ),
        //     66 =>
        //     array(
        //         'nama_lengkap' => 'Abram P.T. Gumansalangi',
        //         'nip' => '19670410 201406 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'abram70',
        //         'password' => '19670410 201406 1 001',
        //     ),
        //     67 =>
        //     array(
        //         'nama_lengkap' => 'Jusmi Gumansalangi',
        //         'nip' => '19721007 200312 1 003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'jusmi71',
        //         'password' => '19721007 200312 1 003',
        //     ),
        //     68 =>
        //     array(
        //         'nama_lengkap' => 'Jemi Fesly Ambat',
        //         'nip' => '19780520 201406 1 003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '04',
        //         'username' => 'jemi72',
        //         'password' => '19780520 201406 1 003',
        //     ),
        //     69 =>
        //     array(
        //         'nama_lengkap' => 'Vicky Vandy Lukas',
        //         'nip' => '7102030204890002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'vicky74',
        //         'password' => '7102030204890002',
        //     ),
        //     70 =>
        //     array(
        //         'nama_lengkap' => 'Frenly Wongkar, S.Si',
        //         'nip' => '19860207 201003 1 004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'frenly75',
        //         'password' => '19860207 201003 1 004',
        //     ),
        //     71 =>
        //     array(
        //         'nama_lengkap' => 'Johanes, S.ST',
        //         'nip' => '19800511 200212 1 003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'johanes,76',
        //         'password' => '19800511 200212 1 003',
        //     ),
        //     72 =>
        //     array(
        //         'nama_lengkap' => 'Diane Roosjefien Rondonuwu, S.P.',
        //         'nip' => '19701211 201410 2 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'diane77',
        //         'password' => '19701211 201410 2 002',
        //     ),
        //     73 =>
        //     array(
        //         'nama_lengkap' => 'Jimmy Ferdinan Mamahani, SE',
        //         'nip' => '19840609 201003 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'jimmy78',
        //         'password' => '19840609 201003 1 001',
        //     ),
        //     74 =>
        //     array(
        //         'nama_lengkap' => 'Rafif Rikasatya, S.ST',
        //         'nip' => '19950524 201802 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'rafif79',
        //         'password' => '19950524 201802 1 001',
        //     ),
        //     75 =>
        //     array(
        //         'nama_lengkap' => 'Artha Gumelar Suharsa, S.Tr.Stat',
        //         'nip' => '19951221 201912 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'artha80',
        //         'password' => '19951221 201912 1 001',
        //     ),
        //     76 =>
        //     array(
        //         'nama_lengkap' => 'Pidyatama Putri Situmorang S.Tr.Stat.',
        //         'nip' => '20000920 202201 2 006',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'pidyatama81',
        //         'password' => '20000920 202201 2 006',
        //     ),
        //     77 =>
        //     array(
        //         'nama_lengkap' => 'Alvero Rivando Suoth',
        //         'nip' => '7105161804940002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'alvero82',
        //         'password' => '7105161804940002',
        //     ),
        //     78 =>
        //     array(
        //         'nama_lengkap' => 'Mahmud Mashanafi',
        //         'nip' => '7105160810690001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'mahmud83',
        //         'password' => '7105160810690001',
        //     ),
        //     79 =>
        //     array(
        //         'nama_lengkap' => 'Joice Rorimpandey A.Md',
        //         'nip' => '19850129 201003 2 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'joice84',
        //         'password' => '19850129 201003 2 002',
        //     ),
        //     80 =>
        //     array(
        //         'nama_lengkap' => 'Yunanda Angelia Sinurat S.Tr.Stat.',
        //         'nip' => '19960607 201901 2 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'yunanda85',
        //         'password' => '19960607 201901 2 002',
        //     ),
        //     81 =>
        //     array(
        //         'nama_lengkap' => 'Ireyne Tamburian, S.Sos',
        //         'nip' => '19830716 201003 2 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'ireyne86',
        //         'password' => '19830716 201003 2 002',
        //     ),
        //     82 =>
        //     array(
        //         'nama_lengkap' => 'Jimmy Walangitan',
        //         'nip' => '7105122010880001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'jimmy87',
        //         'password' => '7105122010880001',
        //     ),
        //     83 =>
        //     array(
        //         'nama_lengkap' => 'Steven Bonny Reppi, SE',
        //         'nip' => '19720926 199603 1 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'steven88',
        //         'password' => '19720926 199603 1 002',
        //     ),
        //     84 =>
        //     array(
        //         'nama_lengkap' => 'Yandi Liwe',
        //         'nip' => '19840228 200801 1 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '05',
        //         'username' => 'yandi89',
        //         'password' => '19840228 200801 1 002',
        //     ),
        //     85 =>
        //     array(
        //         'nama_lengkap' => 'Joice Umboh',
        //         'nip' => '7106096506810000',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'joice91',
        //         'password' => '7106096506810000',
        //     ),
        //     86 =>
        //     array(
        //         'nama_lengkap' => 'Julham Angguhe',
        //         'nip' => '7106061109820001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'julham92',
        //         'password' => '7106061109820001',
        //     ),
        //     87 =>
        //     array(
        //         'nama_lengkap' => 'Dedi Kodoatie',
        //         'nip' => '7106074110800003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'dedi93',
        //         'password' => '7106074110800003',
        //     ),
        //     88 =>
        //     array(
        //         'nama_lengkap' => 'Yenny Iryanti Umboh',
        //         'nip' => '7106027108790001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'yenny94',
        //         'password' => '7106027108790001',
        //     ),
        //     89 =>
        //     array(
        //         'nama_lengkap' => 'Jenni Manikome',
        //         'nip' => '7106104706770001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'jenni95',
        //         'password' => '7106104706770001',
        //     ),
        //     90 =>
        //     array(
        //         'nama_lengkap' => 'Bambang Suwarno, A.Md',
        //         'nip' => '198104042011011005',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'bambang96',
        //         'password' => '198104042011011005',
        //     ),
        //     91 =>
        //     array(
        //         'nama_lengkap' => 'Sylvia Tambeo, SE',
        //         'nip' => '198604222011012016',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'sylvia97',
        //         'password' => '198604222011012016',
        //     ),
        //     92 =>
        //     array(
        //         'nama_lengkap' => 'Usman Antu',
        //         'nip' => '196611071992021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'usman98',
        //         'password' => '196611071992021001',
        //     ),
        //     93 =>
        //     array(
        //         'nama_lengkap' => 'Oman Ali',
        //         'nip' => '196612151990031001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'oman99',
        //         'password' => '196612151990031001',
        //     ),
        //     94 =>
        //     array(
        //         'nama_lengkap' => 'Deivi Johan Roringpandey',
        //         'nip' => '7106021512880002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'deivi100',
        //         'password' => '7106021512880002',
        //     ),
        //     95 =>
        //     array(
        //         'nama_lengkap' => 'Ardyah Murantyoningsih',
        //         'nip' => '7106086207700001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'ardyah101',
        //         'password' => '7106086207700001',
        //     ),
        //     96 =>
        //     array(
        //         'nama_lengkap' => 'Marsela Janet Lengkey',
        //         'nip' => '3276026901900006',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'marsela102',
        //         'password' => '3276026901900006',
        //     ),
        //     97 =>
        //     array(
        //         'nama_lengkap' => 'Janlex Randy Domits',
        //         'nip' => '7171020111830007',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'janlex103',
        //         'password' => '7171020111830007',
        //     ),
        //     98 =>
        //     array(
        //         'nama_lengkap' => 'Dewi Megawati Wurangian',
        //         'nip' => '7106096404840001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'dewi104',
        //         'password' => '7106096404840001',
        //     ),
        //     99 =>
        //     array(
        //         'nama_lengkap' => 'Safrudin Saleh',
        //         'nip' => '7106040712740001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'safrudin105',
        //         'password' => '7106040712740001',
        //     ),
        //     100 =>
        //     array(
        //         'nama_lengkap' => 'Ir. James Koesbiantoro',
        //         'nip' => '196808161994011001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'ir.106',
        //         'password' => '196808161994011001',
        //     ),
        //     101 =>
        //     array(
        //         'nama_lengkap' => 'Kristin Paskahrani Bakara, SST',
        //         'nip' => '199304122014122001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '06',
        //         'username' => 'kristin107',
        //         'password' => '199304122014122001',
        //     ),
        //     102 =>
        //     array(
        //         'nama_lengkap' => 'Herlina Djauhari',
        //         'nip' => '7108066409930003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'herlina109',
        //         'password' => '7108066409930003',
        //     ),
        //     103 =>
        //     array(
        //         'nama_lengkap' => 'Miranti Tuelah',
        //         'nip' => '7108056009960001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'miranti110',
        //         'password' => '7108056009960001',
        //     ),
        //     104 =>
        //     array(
        //         'nama_lengkap' => 'Avriona Rieneke Pesik',
        //         'nip' => '7108026604790001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'avriona111',
        //         'password' => '7108026604790001',
        //     ),
        //     105 =>
        //     array(
        //         'nama_lengkap' => 'Rudini Daeng Mataro',
        //         'nip' => '7108011309900001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'rudini112',
        //         'password' => '7108011309900001',
        //     ),
        //     106 =>
        //     array(
        //         'nama_lengkap' => 'Junardi Tonote',
        //         'nip' => '7108052306900001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'junardi113',
        //         'password' => '7108052306900001',
        //     ),
        //     107 =>
        //     array(
        //         'nama_lengkap' => 'Miniyarti Talibo',
        //         'nip' => '7108045207810001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'miniyarti114',
        //         'password' => '7108045207810001',
        //     ),
        //     108 =>
        //     array(
        //         'nama_lengkap' => 'Hamsin Paputungan',
        //         'nip' => '7108011109740001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'hamsin115',
        //         'password' => '7108011109740001',
        //     ),
        //     109 =>
        //     array(
        //         'nama_lengkap' => 'Syamsul Mahar Ishak',
        //         'nip' => '197905232005021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'syamsul116',
        //         'password' => '197905232005021001',
        //     ),
        //     110 =>
        //     array(
        //         'nama_lengkap' => 'Mutmainnah Aminarti A.Md.Stat.',
        //         'nip' => '200203132023102001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'mutmainnah117',
        //         'password' => '200203132023102001',
        //     ),
        //     111 =>
        //     array(
        //         'nama_lengkap' => 'Indah Khairunnisa A.Md.Stat.',
        //         'nip' => '200203142023102001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'indah118',
        //         'password' => '200203142023102001',
        //     ),
        //     112 =>
        //     array(
        //         'nama_lengkap' => 'Rezza Dhamziq S.P',
        //         'nip' => '198111032011011008',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'rezza119',
        //         'password' => '198111032011011008',
        //     ),
        //     113 =>
        //     array(
        //         'nama_lengkap' => 'Janter Simorangkir S.Tr.Stat.',
        //         'nip' => '199601042019011001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'janter120',
        //         'password' => '199601042019011001',
        //     ),
        //     114 =>
        //     array(
        //         'nama_lengkap' => 'Eka Apriliyana S.Tr.Stat.',
        //         'nip' => '199604092019012002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'eka121',
        //         'password' => '199604092019012002',
        //     ),
        //     115 =>
        //     array(
        //         'nama_lengkap' => 'Dian Teguh Prasetyo S.Tr.Stat.',
        //         'nip' => '199606222019011001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'dian122',
        //         'password' => '199606222019011001',
        //     ),
        //     116 =>
        //     array(
        //         'nama_lengkap' => 'Mohammad Rifky Pontoh S.Tr.Stat.',
        //         'nip' => '199910262022011001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'mohammad123',
        //         'password' => '199910262022011001',
        //     ),
        //     117 =>
        //     array(
        //         'nama_lengkap' => 'Yanro Eric Immanuel Kuron S.Tr.Stat.',
        //         'nip' => '200002202022011004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '07',
        //         'username' => 'yanro124',
        //         'password' => '200002202022011004',
        //     ),
        //     118 =>
        //     array(
        //         'nama_lengkap' => 'REYSKE JACOBS',
        //         'nip' => '7109076509720002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'reyske126',
        //         'password' => '7109076509720002',
        //     ),
        //     119 =>
        //     array(
        //         'nama_lengkap' => 'ALBERT J CHEN',
        //         'nip' => '6171042706000008',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'albert127',
        //         'password' => '6171042706000008',
        //     ),
        //     120 =>
        //     array(
        //         'nama_lengkap' => 'ANSYE C SANDA',
        //         'nip' => '7109034506960002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'ansye128',
        //         'password' => '7109034506960002',
        //     ),
        //     121 =>
        //     array(
        //         'nama_lengkap' => 'ANDRE WIDYANTO',
        //         'nip' => '7202032601030003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'andre129',
        //         'password' => '7202032601030003',
        //     ),
        //     122 =>
        //     array(
        //         'nama_lengkap' => 'AKFARIANTI NAWANGSIH',
        //         'nip' => '3312086606990001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'akfarianti130',
        //         'password' => '3312086606990001',
        //     ),
        //     123 =>
        //     array(
        //         'nama_lengkap' => 'MEITY C SINADIA',
        //         'nip' => '7109066605860001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'meity131',
        //         'password' => '7109066605860001',
        //     ),
        //     124 =>
        //     array(
        //         'nama_lengkap' => 'ORTJE MANAHAMPI',
        //         'nip' => '7109025302720001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'ortje132',
        //         'password' => '7109025302720001',
        //     ),
        //     125 =>
        //     array(
        //         'nama_lengkap' => 'JONIVER MONA',
        //         'nip' => '7109012905910001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'joniver133',
        //         'password' => '7109012905910001',
        //     ),
        //     126 =>
        //     array(
        //         'nama_lengkap' => 'AYU SUSILOWATI',
        //         'nip' => '3308085404980003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'ayu134',
        //         'password' => '3308085404980003',
        //     ),
        //     127 =>
        //     array(
        //         'nama_lengkap' => 'GUSTI PRABA',
        //         'nip' => '7171032112030004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'gusti135',
        //         'password' => '7171032112030004',
        //     ),
        //     128 =>
        //     array(
        //         'nama_lengkap' => 'MEISKE DEREK',
        //         'nip' => '7109016505870003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'meiske136',
        //         'password' => '7109016505870003',
        //     ),
        //     129 =>
        //     array(
        //         'nama_lengkap' => 'DEYSKE PUASA',
        //         'nip' => '7109034712790002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'deyske137',
        //         'password' => '7109034712790002',
        //     ),
        //     130 =>
        //     array(
        //         'nama_lengkap' => 'ERICK SALINDEHO',
        //         'nip' => '7109012504830002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'erick138',
        //         'password' => '7109012504830002',
        //     ),
        //     131 =>
        //     array(
        //         'nama_lengkap' => 'MATHILDA DEREK',
        //         'nip' => '7109016505760002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'mathilda139',
        //         'password' => '7109016505760002',
        //     ),
        //     132 =>
        //     array(
        //         'nama_lengkap' => 'KRISTIANUS B MOKODOMPIS',
        //         'nip' => '7109011609760002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'kristianus140',
        //         'password' => '7109011609760002',
        //     ),
        //     133 =>
        //     array(
        //         'nama_lengkap' => 'ARIEF BUDHIMAN',
        //         'nip' => '7571040909910001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '08',
        //         'username' => 'arief141',
        //         'password' => '7571040909910001',
        //     ),
        //     134 =>
        //     array(
        //         'nama_lengkap' => 'Yandi Supit',
        //         'nip' => '7107020401890001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'yandi143',
        //         'password' => '7107020401890001',
        //     ),
        //     135 =>
        //     array(
        //         'nama_lengkap' => 'Failin Olfiane Walalangi',
        //         'nip' => '7107025710910001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'failin144',
        //         'password' => '7107025710910001',
        //     ),
        //     136 =>
        //     array(
        //         'nama_lengkap' => 'Jackson Jefry Massie',
        //         'nip' => '7107011101790001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'jackson145',
        //         'password' => '7107011101790001',
        //     ),
        //     137 =>
        //     array(
        //         'nama_lengkap' => 'Irene Savira Gabriella Sitanggang, S.Tr. Stat',
        //         'nip' => '19990906 202302 2 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'irene146',
        //         'password' => '19990906 202302 2 001',
        //     ),
        //     138 =>
        //     array(
        //         'nama_lengkap' => 'Kurniawan Walangitan, SE',
        //         'nip' => '19830131 200604 1 005',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'kurniawan147',
        //         'password' => '19830131 200604 1 005',
        //     ),
        //     139 =>
        //     array(
        //         'nama_lengkap' => 'Priscillia Claudia Ponomban',
        //         'nip' => '7107056603900001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'priscillia148',
        //         'password' => '7107056603900001',
        //     ),
        //     140 =>
        //     array(
        //         'nama_lengkap' => 'Alfie Sunkudon, S.Pd',
        //         'nip' => '19710811 201410 1 001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'alfie149',
        //         'password' => '19710811 201410 1 001',
        //     ),
        //     141 =>
        //     array(
        //         'nama_lengkap' => 'Frisilia Erlita Keintjem',
        //         'nip' => '7107045112890001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'frisilia150',
        //         'password' => '7107045112890001',
        //     ),
        //     142 =>
        //     array(
        //         'nama_lengkap' => 'Augresyo Lucky Johanes Walewangko, S.Kom',
        //         'nip' => '19830813 200312 1 003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'augresyo151',
        //         'password' => '19830813 200312 1 003',
        //     ),
        //     143 =>
        //     array(
        //         'nama_lengkap' => 'Olce Olke Naray',
        //         'nip' => '7107096810800003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'olce152',
        //         'password' => '7107096810800003',
        //     ),
        //     144 =>
        //     array(
        //         'nama_lengkap' => 'Dodik Setyawan, S.Tr. Stat',
        //         'nip' => '20001129 202310 1 004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'dodik153',
        //         'password' => '20001129 202310 1 004',
        //     ),
        //     145 =>
        //     array(
        //         'nama_lengkap' => 'Bernaldo Napitupulu, S.Tr. Stat',
        //         'nip' => '20001111 202302 1 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'bernaldo154',
        //         'password' => '20001111 202302 1 002',
        //     ),
        //     146 =>
        //     array(
        //         'nama_lengkap' => 'Jeil Cornelius Dona',
        //         'nip' => '7107060705950001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'jeil155',
        //         'password' => '7107060705950001',
        //     ),
        //     147 =>
        //     array(
        //         'nama_lengkap' => 'Sisilia Eonike Agouw',
        //         'nip' => '7107066310910002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'sisilia156',
        //         'password' => '7107066310910002',
        //     ),
        //     148 =>
        //     array(
        //         'nama_lengkap' => 'Afwin Fauzy Akhsan S.Tr.Stat.',
        //         'nip' => '19960922 201901 1 002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'afwin157',
        //         'password' => '19960922 201901 1 002',
        //     ),
        //     149 =>
        //     array(
        //         'nama_lengkap' => 'Roberth Yanto Sanggana S.Kom.',
        //         'nip' => '19861204 201101 1 006',
        //         'role' => 'PML',
        //         'kode_kabkot' => '09',
        //         'username' => 'roberth158',
        //         'password' => '19861204 201101 1 006',
        //     ),
        //     150 =>
        //     array(
        //         'nama_lengkap' => 'Ripandi Dede',
        //         'nip' => '7111051806910001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'ripandi160',
        //         'password' => '7111051806910001',
        //     ),
        //     151 =>
        //     array(
        //         'nama_lengkap' => 'Frangki Laselo',
        //         'nip' => '7111012604900001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'frangki161',
        //         'password' => '7111012604900001',
        //     ),
        //     152 =>
        //     array(
        //         'nama_lengkap' => 'Saeda Nofriani Merondah',
        //         'nip' => '7111014911910003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'saeda162',
        //         'password' => '7111014911910003',
        //     ),
        //     153 =>
        //     array(
        //         'nama_lengkap' => 'ISWANTO DALI',
        //         'nip' => '7111020312940001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'iswanto163',
        //         'password' => '7111020312940001',
        //     ),
        //     154 =>
        //     array(
        //         'nama_lengkap' => 'Citra mayasari Kaumpungan',
        //         'nip' => '7111037103870001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'citra164',
        //         'password' => '7111037103870001',
        //     ),
        //     155 =>
        //     array(
        //         'nama_lengkap' => 'Novri Hunou',
        //         'nip' => '7111020811860002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'novri165',
        //         'password' => '7111020811860002',
        //     ),
        //     156 =>
        //     array(
        //         'nama_lengkap' => 'Mohamad Nento',
        //         'nip' => '7111030406830001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'mohamad166',
        //         'password' => '7111030406830001',
        //     ),
        //     157 =>
        //     array(
        //         'nama_lengkap' => 'Angriyani Mamonto',
        //         'nip' => '7111015708900001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'angriyani167',
        //         'password' => '7111015708900001',
        //     ),
        //     158 =>
        //     array(
        //         'nama_lengkap' => 'Fitria mooduto',
        //         'nip' => '7111016002960001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'fitria168',
        //         'password' => '7111016002960001',
        //     ),
        //     159 =>
        //     array(
        //         'nama_lengkap' => 'ISKANDAR DALI',
        //         'nip' => '7111022712840002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'iskandar169',
        //         'password' => '7111022712840002',
        //     ),
        //     160 =>
        //     array(
        //         'nama_lengkap' => 'Wilna Aliu',
        //         'nip' => '7111026712910001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'wilna170',
        //         'password' => '7111026712910001',
        //     ),
        //     161 =>
        //     array(
        //         'nama_lengkap' => 'Asril Tuadingo',
        //         'nip' => '7111012204850002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'asril171',
        //         'password' => '7111012204850002',
        //     ),
        //     162 =>
        //     array(
        //         'nama_lengkap' => 'SRIPITA GINTULANGI',
        //         'nip' => '7111026603940001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'sripita172',
        //         'password' => '7111026603940001',
        //     ),
        //     163 =>
        //     array(
        //         'nama_lengkap' => 'Karmila Monoarfa',
        //         'nip' => '7111034208840001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'karmila173',
        //         'password' => '7111034208840001',
        //     ),
        //     164 =>
        //     array(
        //         'nama_lengkap' => 'Alhakrun Mooduto',
        //         'nip' => '7111021809940001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'alhakrun174',
        //         'password' => '7111021809940001',
        //     ),
        //     165 =>
        //     array(
        //         'nama_lengkap' => 'Saprudin Mokoagow',
        //         'nip' => '196705221991021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '10',
        //         'username' => 'saprudin175',
        //         'password' => '196705221991021001',
        //     ),
        //     166 =>
        //     array(
        //         'nama_lengkap' => 'Puty Sarah Sechmat',
        //         'nip' => '7110024912990002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'puty177',
        //         'password' => '7110024912990002',
        //     ),
        //     167 =>
        //     array(
        //         'nama_lengkap' => 'Marvel Wuisan Kaligis',
        //         'nip' => '7110030810890001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'marvel178',
        //         'password' => '7110030810890001',
        //     ),
        //     168 =>
        //     array(
        //         'nama_lengkap' => 'Robin Kalangi',
        //         'nip' => '7106021910870001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'robin179',
        //         'password' => '7106021910870001',
        //     ),
        //     169 =>
        //     array(
        //         'nama_lengkap' => 'Nurul Sabrinah',
        //         'nip' => '7110045605990001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'nurul180',
        //         'password' => '7110045605990001',
        //     ),
        //     170 =>
        //     array(
        //         'nama_lengkap' => 'Zhaqif Ambarak',
        //         'nip' => '7110010205970001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'zhaqif181',
        //         'password' => '7110010205970001',
        //     ),
        //     171 =>
        //     array(
        //         'nama_lengkap' => 'Irwanto Mamonto',
        //         'nip' => '7110030405860002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'irwanto182',
        //         'password' => '7110030405860002',
        //     ),
        //     172 =>
        //     array(
        //         'nama_lengkap' => 'Celyfia Inding Wuisan',
        //         'nip' => '7110034907920001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'celyfia183',
        //         'password' => '7110034907920001',
        //     ),
        //     173 =>
        //     array(
        //         'nama_lengkap' => 'Feily Lumangkun',
        //         'nip' => '7110051807860001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'feily184',
        //         'password' => '7110051807860001',
        //     ),
        //     174 =>
        //     array(
        //         'nama_lengkap' => 'Lidya Saud',
        //         'nip' => '7110045103820001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'lidya185',
        //         'password' => '7110045103820001',
        //     ),
        //     175 =>
        //     array(
        //         'nama_lengkap' => 'Afriani Mamintade',
        //         'nip' => '7110014308940001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'afriani186',
        //         'password' => '7110014308940001',
        //     ),
        //     176 =>
        //     array(
        //         'nama_lengkap' => 'Asirun Paputungan',
        //         'nip' => '7110010812720001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'asirun187',
        //         'password' => '7110010812720001',
        //     ),
        //     177 =>
        //     array(
        //         'nama_lengkap' => 'Novita A Saleh',
        //         'nip' => '7110024910980001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'novita188',
        //         'password' => '7110024910980001',
        //     ),
        //     178 =>
        //     array(
        //         'nama_lengkap' => 'Nurhani',
        //         'nip' => '7110044809810001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'nurhani189',
        //         'password' => '7110044809810001',
        //     ),
        //     179 =>
        //     array(
        //         'nama_lengkap' => 'Fathurahman Bogdadi',
        //         'nip' => '7110011612940001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'fathurahman190',
        //         'password' => '7110011612940001',
        //     ),
        //     180 =>
        //     array(
        //         'nama_lengkap' => 'Devita Damopolii',
        //         'nip' => '7110054304810001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'devita191',
        //         'password' => '7110054304810001',
        //     ),
        //     181 =>
        //     array(
        //         'nama_lengkap' => 'Ibrahim Makalalag',
        //         'nip' => '7110031909770001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '11',
        //         'username' => 'ibrahim192',
        //         'password' => '7110031909770001',
        //     ),
        //     182 =>
        //     array(
        //         'nama_lengkap' => 'Randhy Tahulending',
        //         'nip' => '7109040311900001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'randhy194',
        //         'password' => '7109040311900001',
        //     ),
        //     183 =>
        //     array(
        //         'nama_lengkap' => 'Lydia Indrawati',
        //         'nip' => '7171034810720002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'lydia195',
        //         'password' => '7171034810720002',
        //     ),
        //     184 =>
        //     array(
        //         'nama_lengkap' => 'Vonny Joice Lalujan',
        //         'nip' => '196911011992022001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'vonny196',
        //         'password' => '196911011992022001',
        //     ),
        //     185 =>
        //     array(
        //         'nama_lengkap' => 'Outenty Bimbangnaung',
        //         'nip' => '198110312007012001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'outenty197',
        //         'password' => '198110312007012001',
        //     ),
        //     186 =>
        //     array(
        //         'nama_lengkap' => 'Olivia Sahambangung',
        //         'nip' => '198610142006042002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'olivia198',
        //         'password' => '198610142006042002',
        //     ),
        //     187 =>
        //     array(
        //         'nama_lengkap' => 'Deyvi Stella Rumangkang',
        //         'nip' => '197912192014062002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'deyvi199',
        //         'password' => '197912192014062002',
        //     ),
        //     188 =>
        //     array(
        //         'nama_lengkap' => 'Rikky Rugian',
        //         'nip' => '197902091999031002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'rikky200',
        //         'password' => '197902091999031002',
        //     ),
        //     189 =>
        //     array(
        //         'nama_lengkap' => 'Vivi Novita Sumampouw',
        //         'nip' => '198011172010032002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'vivi201',
        //         'password' => '198011172010032002',
        //     ),
        //     190 =>
        //     array(
        //         'nama_lengkap' => 'Roy Makalew',
        //         'nip' => '7171092511960003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'roy202',
        //         'password' => '7171092511960003',
        //     ),
        //     191 =>
        //     array(
        //         'nama_lengkap' => 'STEVI NOVITA WULAN RUMANGKANG',
        //         'nip' => '7171085511890001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'stevi203',
        //         'password' => '7171085511890001',
        //     ),
        //     192 =>
        //     array(
        //         'nama_lengkap' => 'Grace Shallomita Novelia Thomas',
        //         'nip' => '7171016711020003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'grace204',
        //         'password' => '7171016711020003',
        //     ),
        //     193 =>
        //     array(
        //         'nama_lengkap' => 'Farhan, S.Tr.Stat',
        //         'nip' => '199905122021041001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'farhan,205',
        //         'password' => '199905122021041001',
        //     ),
        //     194 =>
        //     array(
        //         'nama_lengkap' => 'Vini Cristin, S.Tr.Stat',
        //         'nip' => '199908272022012003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'vini206',
        //         'password' => '199908272022012003',
        //     ),
        //     195 =>
        //     array(
        //         'nama_lengkap' => 'Defi Astuti Anggraeni, S.Tr.Stat',
        //         'nip' => '199802032021042001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'defi207',
        //         'password' => '199802032021042001',
        //     ),
        //     196 =>
        //     array(
        //         'nama_lengkap' => 'Gaberiel, S.Tr.Stat',
        //         'nip' => '200103092023021006',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'gaberiel,208',
        //         'password' => '200103092023021006',
        //     ),
        //     197 =>
        //     array(
        //         'nama_lengkap' => 'Fadila Ahmad, S.Tr.Stat',
        //         'nip' => '199903162023021002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'fadila209',
        //         'password' => '199903162023021002',
        //     ),
        //     198 =>
        //     array(
        //         'nama_lengkap' => 'Maskhur Solikhudin, S.Tr.Stat',
        //         'nip' => '199811162022011002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'maskhur210',
        //         'password' => '199811162022011002',
        //     ),
        //     199 =>
        //     array(
        //         'nama_lengkap' => 'Habel Nitalessy, S.Tr.Stat',
        //         'nip' => '199905162023021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'habel211',
        //         'password' => '199905162023021001',
        //     ),
        //     200 =>
        //     array(
        //         'nama_lengkap' => 'Weny Fitrah Anwari, S.Tr.Stat',
        //         'nip' => '199610152019012001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'weny212',
        //         'password' => '199610152019012001',
        //     ),
        //     201 =>
        //     array(
        //         'nama_lengkap' => 'Anis Karimah, S.Tr.Stat',
        //         'nip' => '199607032019012002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'anis213',
        //         'password' => '199607032019012002',
        //     ),
        //     202 =>
        //     array(
        //         'nama_lengkap' => 'Ricky, A.Md',
        //         'nip' => '198012162011011003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'ricky,214',
        //         'password' => '198012162011011003',
        //     ),
        //     203 =>
        //     array(
        //         'nama_lengkap' => 'Nik\'mah',
        //         'nip' => '197201071994032001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '71',
        //         'username' => 'nik\'mah215',
        //         'password' => '197201071994032001',
        //     ),
        //     204 =>
        //     array(
        //         'nama_lengkap' => 'Ahmad Samsudin, SST',
        //         'nip' => '199412082018021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'ahmad217',
        //         'password' => '199412082018021001',
        //     ),
        //     205 =>
        //     array(
        //         'nama_lengkap' => 'Anitje Rastrawati Katuuk, SE',
        //         'nip' => '196704301986032002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'anitje218',
        //         'password' => '196704301986032002',
        //     ),
        //     206 =>
        //     array(
        //         'nama_lengkap' => 'Augustin Sultje Selfana Pussung, SE.',
        //         'nip' => '197008011992102001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'augustin219',
        //         'password' => '197008011992102001',
        //     ),
        //     207 =>
        //     array(
        //         'nama_lengkap' => 'Firly Lutfiana Prahardini, S.Tr.Stat.',
        //         'nip' => '199506182019122002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'firly220',
        //         'password' => '199506182019122002',
        //     ),
        //     208 =>
        //     array(
        //         'nama_lengkap' => 'Henny Pura, ST',
        //         'nip' => '198505172010032003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'henny221',
        //         'password' => '198505172010032003',
        //     ),
        //     209 =>
        //     array(
        //         'nama_lengkap' => 'Iska Myranti, S.Tr.Stat.',
        //         'nip' => '199710092021042002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'iska222',
        //         'password' => '199710092021042002',
        //     ),
        //     210 =>
        //     array(
        //         'nama_lengkap' => 'Lasimran Tarib',
        //         'nip' => '196812052007011006',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'lasimran223',
        //         'password' => '196812052007011006',
        //     ),
        //     211 =>
        //     array(
        //         'nama_lengkap' => 'Marcopolo Gultom, S.Tr.Stat.',
        //         'nip' => '199608092019011001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'marcopolo224',
        //         'password' => '199608092019011001',
        //     ),
        //     212 =>
        //     array(
        //         'nama_lengkap' => 'Marya Zahra Aliffio Krisfianda, S.Tr. Stat',
        //         'nip' => '200008292023102002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'marya225',
        //         'password' => '200008292023102002',
        //     ),
        //     213 =>
        //     array(
        //         'nama_lengkap' => 'Meidy Talingkas, S.Si., M.Ec. Dev',
        //         'nip' => '198103132011012005',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'meidy226',
        //         'password' => '198103132011012005',
        //     ),
        //     214 =>
        //     array(
        //         'nama_lengkap' => 'Mohamad Rezka Aji Pambudi, S.Tr.Stat.',
        //         'nip' => '199710062021041001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'mohamad227',
        //         'password' => '199710062021041001',
        //     ),
        //     215 =>
        //     array(
        //         'nama_lengkap' => 'Nur Alamsyah',
        //         'nip' => '199501242019031001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'nur228',
        //         'password' => '199501242019031001',
        //     ),
        //     216 =>
        //     array(
        //         'nama_lengkap' => 'Olivia Inggrit Waturandang',
        //         'nip' => '198110042008012013',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'olivia229',
        //         'password' => '198110042008012013',
        //     ),
        //     217 =>
        //     array(
        //         'nama_lengkap' => 'Puput Astutik, S.Tr.Stat.',
        //         'nip' => '199605122019012002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'puput230',
        //         'password' => '199605122019012002',
        //     ),
        //     218 =>
        //     array(
        //         'nama_lengkap' => 'Rizky Perdana, S.Tr.Stat.',
        //         'nip' => '199809212022011002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'rizky231',
        //         'password' => '199809212022011002',
        //     ),
        //     219 =>
        //     array(
        //         'nama_lengkap' => 'Rudy Helfrich Pomantow',
        //         'nip' => '197205281992021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'rudy232',
        //         'password' => '197205281992021001',
        //     ),
        //     220 =>
        //     array(
        //         'nama_lengkap' => 'Sahirjan Raup, A.Md',
        //         'nip' => '198608062010031002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '72',
        //         'username' => 'sahirjan233',
        //         'password' => '198608062010031002',
        //     ),
        //     221 =>
        //     array(
        //         'nama_lengkap' => 'Reyf Reymond Kumontoy',
        //         'nip' => '198110162007011002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'reyf235',
        //         'password' => '198110162007011002',
        //     ),
        //     222 =>
        //     array(
        //         'nama_lengkap' => 'Inneke Meylinda Nender',
        //         'nip' => '197702192006042003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'inneke236',
        //         'password' => '197702192006042003',
        //     ),
        //     223 =>
        //     array(
        //         'nama_lengkap' => 'Manca Satria',
        //         'nip' => '200006292023021002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'manca237',
        //         'password' => '200006292023021002',
        //     ),
        //     224 =>
        //     array(
        //         'nama_lengkap' => 'Olivia Susanti Makaringang',
        //         'nip' => '198810072008012001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'olivia238',
        //         'password' => '198810072008012001',
        //     ),
        //     225 =>
        //     array(
        //         'nama_lengkap' => 'Susana Ritha Lanny Rumangkang',
        //         'nip' => '197609102001122006',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'susana239',
        //         'password' => '197609102001122006',
        //     ),
        //     226 =>
        //     array(
        //         'nama_lengkap' => 'Berliand Fadly Igir',
        //         'nip' => '196410292006041004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'berliand240',
        //         'password' => '196410292006041004',
        //     ),
        //     227 =>
        //     array(
        //         'nama_lengkap' => 'Irfan Damar Prasetyo',
        //         'nip' => '199412072018021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'irfan241',
        //         'password' => '199412072018021001',
        //     ),
        //     228 =>
        //     array(
        //         'nama_lengkap' => 'Winarko',
        //         'nip' => '197501131997121001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'winarko242',
        //         'password' => '197501131997121001',
        //     ),
        //     229 =>
        //     array(
        //         'nama_lengkap' => 'Alfian Fransiscus Sumayku',
        //         'nip' => '197103301991021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'alfian243',
        //         'password' => '197103301991021001',
        //     ),
        //     230 =>
        //     array(
        //         'nama_lengkap' => 'Muhammad Aja Fajrian',
        //         'nip' => '199212272016021001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'muhammad244',
        //         'password' => '199212272016021001',
        //     ),
        //     231 =>
        //     array(
        //         'nama_lengkap' => 'Oubert Voldy Pangkerego',
        //         'nip' => '7173022310820001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'oubert245',
        //         'password' => '7173022310820001',
        //     ),
        //     232 =>
        //     array(
        //         'nama_lengkap' => 'Windy Rainy Wongkar',
        //         'nip' => '7173025811850002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'windy246',
        //         'password' => '7173025811850002',
        //     ),
        //     233 =>
        //     array(
        //         'nama_lengkap' => 'Jeinne Adriana Yeskiel',
        //         'nip' => '7173024906770001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'jeinne247',
        //         'password' => '7173024906770001',
        //     ),
        //     234 =>
        //     array(
        //         'nama_lengkap' => 'Vivi Vindy Rufina Pangalila',
        //         'nip' => '7173036604860002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'vivi248',
        //         'password' => '7173036604860002',
        //     ),
        //     235 =>
        //     array(
        //         'nama_lengkap' => 'Suzan Herly Rumajar',
        //         'nip' => '7173016709810003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'suzan249',
        //         'password' => '7173016709810003',
        //     ),
        //     236 =>
        //     array(
        //         'nama_lengkap' => 'Yesti Potu',
        //         'nip' => '7171046307850004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'yesti250',
        //         'password' => '7171046307850004',
        //     ),
        //     237 =>
        //     array(
        //         'nama_lengkap' => 'Meylanita Christiana Ellen Ratta',
        //         'nip' => '7173046705850001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '73',
        //         'username' => 'meylanita251',
        //         'password' => '7173046705850001',
        //     ),
        //     238 =>
        //     array(
        //         'nama_lengkap' => 'Arie Dwi Permana',
        //         'nip' => '7174042311880002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'arie253',
        //         'password' => '7174042311880002',
        //     ),
        //     239 =>
        //     array(
        //         'nama_lengkap' => 'Dewi Prinita Mongilong',
        //         'nip' => '7174044107870024',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'dewi254',
        //         'password' => '7174044107870024',
        //     ),
        //     240 =>
        //     array(
        //         'nama_lengkap' => 'Djamila Akuba',
        //         'nip' => '7174025410630001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'djamila255',
        //         'password' => '7174025410630001',
        //     ),
        //     241 =>
        //     array(
        //         'nama_lengkap' => 'Insi Mardiasi Kangki',
        //         'nip' => '7174035310830002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'insi256',
        //         'password' => '7174035310830002',
        //     ),
        //     242 =>
        //     array(
        //         'nama_lengkap' => 'Meilan Ponuntul',
        //         'nip' => '7174035612820001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'meilan257',
        //         'password' => '7174035612820001',
        //     ),
        //     243 =>
        //     array(
        //         'nama_lengkap' => 'Meity Serly Dondo',
        //         'nip' => '7174016506820001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'meity258',
        //         'password' => '7174016506820001',
        //     ),
        //     244 =>
        //     array(
        //         'nama_lengkap' => 'Rudy Ginoga',
        //         'nip' => '7174022905830001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'rudy259',
        //         'password' => '7174022905830001',
        //     ),
        //     245 =>
        //     array(
        //         'nama_lengkap' => 'Cynthia Dwi Setyarini',
        //         'nip' => '3322184902980003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'cynthia260',
        //         'password' => '3322184902980003',
        //     ),
        //     246 =>
        //     array(
        //         'nama_lengkap' => 'Nadyah Rizka Cahyani',
        //         'nip' => '7271026910010004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'nadyah261',
        //         'password' => '7271026910010004',
        //     ),
        //     247 =>
        //     array(
        //         'nama_lengkap' => 'Siti Mutiah Rahma Utina',
        //         'nip' => '7171055712010001',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'siti262',
        //         'password' => '7171055712010001',
        //     ),
        //     248 =>
        //     array(
        //         'nama_lengkap' => 'Ulung Rimbah',
        //         'nip' => '197209212002121002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'ulung263',
        //         'password' => '197209212002121002',
        //     ),
        //     249 =>
        //     array(
        //         'nama_lengkap' => 'Yulia Sakinah',
        //         'nip' => '3173075007950002',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'yulia264',
        //         'password' => '3173075007950002',
        //     ),
        //     250 =>
        //     array(
        //         'nama_lengkap' => 'Dita Saskia Sj Saida',
        //         'nip' => '7271014801010007',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'dita265',
        //         'password' => '7271014801010007',
        //     ),
        //     251 =>
        //     array(
        //         'nama_lengkap' => 'Meilisa Indahsari',
        //         'nip' => '3327134805010007',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'meilisa266',
        //         'password' => '3327134805010007',
        //     ),
        //     252 =>
        //     array(
        //         'nama_lengkap' => 'Rosmita Noor Arifah',
        //         'nip' => '3311125303980003',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'rosmita267',
        //         'password' => '3311125303980003',
        //     ),
        //     253 =>
        //     array(
        //         'nama_lengkap' => 'Dian Purnama Pakpahan',
        //         'nip' => '1202137105960004',
        //         'role' => 'PML',
        //         'kode_kabkot' => '74',
        //         'username' => 'dian268',
        //         'password' => '1202137105960004',
        //     ),
        //     254 =>
        //     array(
        //         'nama_lengkap' => 'Ester Harefa, S.Tr.Stat.',
        //         'nip' => '199908062022012006',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '01',
        //         'username' => 'ester269',
        //         'password' => '199908062022012006',
        //     ),
        //     255 =>
        //     array(
        //         'nama_lengkap' => 'Kannia Amielsa Shanenda, S.Tr.Stat',
        //         'nip' => '199805302021042002',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '02',
        //         'username' => 'kannia270',
        //         'password' => '199805302021042002',
        //     ),
        //     256 =>
        //     array(
        //         'nama_lengkap' => 'Anggit Prihatmaja, S.Tr.Stat',
        //         'nip' => '199606072019121001',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '02',
        //         'username' => 'anggit271',
        //         'password' => '199606072019121001',
        //     ),
        //     257 =>
        //     array(
        //         'nama_lengkap' => 'Krisnanda Prasetya Adi,S.Tr.Stat',
        //         'nip' => '199806202021041000',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '03',
        //         'username' => 'krisnanda272',
        //         'password' => '199806202021041000',
        //     ),
        //     258 =>
        //     array(
        //         'nama_lengkap' => 'Suryo Refli Ranto, SST',
        //         'nip' => '199207152014121000',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '04',
        //         'username' => 'suryo273',
        //         'password' => '199207152014121000',
        //     ),
        //     259 =>
        //     array(
        //         'nama_lengkap' => 'Piky Pomantow, A.MdKom',
        //         'nip' => '198807182010031001',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '05',
        //         'username' => 'piky274',
        //         'password' => '198807182010031001',
        //     ),
        //     260 =>
        //     array(
        //         'nama_lengkap' => 'Putri Septianingsih, S.Tr.Stat',
        //         'nip' => '199809082021042000',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '06',
        //         'username' => 'putri275',
        //         'password' => '199809082021042000',
        //     ),
        //     261 =>
        //     array(
        //         'nama_lengkap' => 'Mohammad Rifky Pontoh, S.Tr.Stat',
        //         'nip' => '199910262022011001',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '07',
        //         'username' => 'mohammad276',
        //         'password' => '199910262022011001',
        //     ),
        //     262 =>
        //     array(
        //         'nama_lengkap' => 'Wulandari Ponto,SST',
        //         'nip' => '199412012017012001',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '08',
        //         'username' => 'wulandari277',
        //         'password' => '199412012017012001',
        //     ),
        //     263 =>
        //     array(
        //         'nama_lengkap' => 'Desnacita Harly Putri, SST',
        //         'nip' => '19951221201802002',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '09',
        //         'username' => 'desnacita278',
        //         'password' => '19951221201802002',
        //     ),
        //     264 =>
        //     array(
        //         'nama_lengkap' => 'Laily Agustina Bestari, S.Tr.Stat.',
        //         'nip' => '199708252019122000',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '10',
        //         'username' => 'laily279',
        //         'password' => '199708252019122000',
        //     ),
        //     265 =>
        //     array(
        //         'nama_lengkap' => 'Dwiwandi Alfa Sekeon,S.Tr.Stat.',
        //         'nip' => '199801052022011002',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '11',
        //         'username' => 'dwiwandi280',
        //         'password' => '199801052022011002',
        //     ),
        //     266 =>
        //     array(
        //         'nama_lengkap' => 'Munawir Kobis',
        //         'nip' => '198805202013111001',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '71',
        //         'username' => 'munawir281',
        //         'password' => '198805202013111001',
        //     ),
        //     267 =>
        //     array(
        //         'nama_lengkap' => 'Ni Putu Beliana Puspita Sari',
        //         'nip' => '199611292019012002',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '71',
        //         'username' => 'ni282',
        //         'password' => '199611292019012002',
        //     ),
        //     268 =>
        //     array(
        //         'nama_lengkap' => 'Puput Astutik, S.Tr.Stat',
        //         'nip' => '199605122019012002',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '72',
        //         'username' => 'puput283',
        //         'password' => '199605122019012002',
        //     ),
        //     269 =>
        //     array(
        //         'nama_lengkap' => 'Isna Muflichatul Fadhilah, SST',
        //         'nip' => '199311082016022002',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '73',
        //         'username' => 'isna284',
        //         'password' => '199311082016022002',
        //     ),
        //     270 =>
        //     array(
        //         'nama_lengkap' => 'Dian Purnama Pakpahan, S.Tr.Stat.',
        //         'nip' => '199605312019012001',
        //         'role' => 'ADMIN',
        //         'kode_kabkot' => '74',
        //         'username' => 'dian285',
        //         'password' => '199605312019012001',
        //     ),

        //     266 =>
        //     array(
        //         'nama_lengkap' => 'Abdul Aziz Makhrus, S.Tr.Stat.',
        //         'username' => 'aziz',
        //         'role' => 'ADMIN',
        //         'nip' => '199607082019011003',
        //         'kode_kabkot' => '00',
        //         'password' => '199607082019011003',
        //     ),
        //     267 =>
        //     array(
        //         'nama_lengkap' => 'Ponimin, S.Tr.Stat.',
        //         'username' => 'ponim',
        //         'role' => 'ADMIN',
        //         'nip' => '199810132021041001',
        //         'kode_kabkot' => '00',
        //         'password' => '199810132021041001',
        //     ),
        // );
        $users = array(
            0 =>
            array(
                'nama_lengkap' => 'Prih Wismaningsih',
                'nip' => '197912222003122009',
                'role' => 'PML',
                'kode_kabkot' => '72',
                'username' => 'prih271',
                'password' => '197912222003122009',
            ),
            1 =>
            array(
                'nama_lengkap' => 'Anastasya Yeane Lombogia',
                'nip' => '7110055501900001',
                'role' => 'PML',
                'kode_kabkot' => '74',
                'username' => 'anastasya2',
                'password' => '7110055501900001',
            ),
            2 =>
            array(
                'nama_lengkap' => 'Munawir Kobis',
                'nip' => '198805202013111001',
                'role' => 'ADMIN',
                'kode_kabkot' => '71',
                'username' => 'munawir281',
                'password' => '198805202013111001',
            ),
            3 =>
            array(
                'nama_lengkap' => 'Ni Putu Beliana Puspita Sari',
                'nip' => '199611292019012002',
                'role' => 'ADMIN',
                'kode_kabkot' => '71',
                'username' => 'ni282',
                'password' => '199611292019012002',
            ),
            4 =>
            array(
                'nama_lengkap' => 'Ponimin, S.Tr.Stat.',
                'username' => 'ponim',
                'role' => 'ADMIN',
                'nip' => '199810132021041001',
                'kode_kabkot' => '00',
                'password' => '123',
            ),
        );


        foreach ($users as $key => $value) {
            $value['password'] = Hash::make($value['password']);
            $value['email'] = $value['username'] . "@ssnmeta.sulut";
            User::create($value);
        }
    }
}
