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
        Schema::dropIfExists('master_desa');
        Schema::dropIfExists('master_kecamatan');
        Schema::dropIfExists('master_kabkot');
        Schema::dropIfExists('susenas_inti');
        Schema::dropIfExists('provinsi');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
