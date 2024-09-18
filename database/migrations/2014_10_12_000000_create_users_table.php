<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('nama_lengkap');
            $table->string('email');
            $table->string('nip');
            // $table->string('bidang');
            $table->string('kode_kabkot', 2);
            $table->enum('jabatan', ['Staf BPS Provinsi', 'Staf BPS Kabupaten/Kota', 'Mitra'])->default('Staf BPS Kabupaten/Kota');
            $table->string('role')->default('basic');
            $table->string('username');
            // $table->string('foto_url');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
