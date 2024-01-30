<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(MasterBarangSeeder::class);
        $this->call(MasterJabatanSeeder::class);
        $this->call(MasterRuanganSeeder::class);
        $this->call(MasterSistemOperasiSeeder::class);

        $this->call(UsersSeeder::class);
        $this->call(BarangSeeder::class);
        $this->call(MaintenanceSequenceSeeder::class);
        $this->call(MaintenanceSeeder::class);
    }
}
