<?php

namespace Database\Seeders;

use App\Models\MasterSistemOperasi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterSistemOperasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['id' => 1, 'nama' => 'Linux OS', 'arsitektur' => 'x64', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'nama' => 'Linux OS', 'arsitektur' => 'x86', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'nama' => 'Windows 7', 'arsitektur' => 'x64', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'nama' => 'Windows 7', 'arsitektur' => 'x86', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'nama' => 'Windows 10', 'arsitektur' => 'x64', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'nama' => 'Windows 10', 'arsitektur' => 'x86', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'nama' => 'Windows 11', 'arsitektur' => 'x64', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'nama' => 'Windows XP', 'arsitektur' => 'x64', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'nama' => 'Windows XP', 'arsitektur' => 'x86', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'nama' => 'Windows Server 2016', 'arsitektur' => 'x64', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 11, 'nama' => 'Windows 11', 'arsitektur' => 'x86', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 12, 'nama' => 'Non OS', 'arsitektur' => '-', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 13, 'nama' => 'Android', 'arsitektur' => 'ARM86', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 16, 'nama' => 'Android', 'arsitektur' => 'ARM64', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 14, 'nama' => 'Windows 8', 'arsitektur' => 'x64', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 15, 'nama' => 'Windows 8', 'arsitektur' => 'x86', 'created_at' => now(), 'updated_at' => now()],
        ];
        MasterSistemOperasi::insert($data);
    }
}
