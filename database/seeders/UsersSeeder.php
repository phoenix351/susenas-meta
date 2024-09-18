<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


    public function run(): void
    {

        $users = array(
            array(
                'nama_lengkap' => 'Abdul Aziz Makhrus, S.Tr.Stat',
                'nip' => '1997',
                'role' => 'ADMIN',
                'jabatan' => 'Staf BPS Provinsi',
                'kode_kabkot' => '00',
                'username' => 'aziz',
                'password' => 'oke.lah',
            ),
            array(
                'nama_lengkap' => 'Ponimin, S.Tr.Stat.',
                'username' => 'ponim',
                'jabatan' => 'Staf BPS Provinsi',
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
        $file_name = 'public/seeder/users.csv';
        // dd(Storage::allDirectories('.'));
        if (Storage::exists($file_name)) {
            $csv_data = Storage::get($file_name);
        } else {
            $csv_data = file_get_contents($file_name);
        }
        $lines = preg_split("/\r\n|\n|\r/", $csv_data);
        $rows = array_map('str_getcsv', $lines);
        $headers = array_shift($rows);
        foreach ($rows as $index => $row) {
            $row[2] = preg_replace("/[^0-9]/", "", $row[2]);
            $user = new User(
                [
                    'kode_kabkot' => $row[0],
                    'nama_lengkap' => $row[1],
                    'nip' => $row[2],
                    'jabatan' => $row[3],
                    'role' => $row[4],
                    'email' => $row[2] . '@metassn.monitoringbps.com',
                    'username' => $row[2],
                    'password' => Hash::make('password'),

                ]
            );
            $user->save();
        }
    }
}
