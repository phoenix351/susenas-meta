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

        $this->call(MasterJabatanSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(ProvinsiSeeder::class);
        $this->call(KabkotSeeder::class);
        $this->call(NksSeeder::class);
        $this->call(MasterWilayahSeeder::class);
        $this->call(KomoditasSeeder::class);
        $this->call(RangeHargaSeeder::class);
    }
}
