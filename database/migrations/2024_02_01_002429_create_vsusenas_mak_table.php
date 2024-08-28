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
        Schema::create('vsusenas_mak', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('users_id', 36);
            $table->string('status_dok', 10)->default("error");

            $table->string('kode_prov', 2);
            $table->string('kode_kabkot', 2);
            $table->string('kode_kec', 3);
            $table->string('kode_desa', 3);
            $table->string('kode_bs4', 4);
            $table->string('nks', 6);
            $table->string('semester', 1)->default(1);
            // $table->string('id_bs', 10);
            $table->unsignedInteger('r108')->nullable();
            $table->unsignedInteger('r109')->nullable();
            $table->string('r110', 255)->nullable();
            $table->string('r111', 255)->nullable();

            // blok 2
            $table->string('r201_nama', 255)->nullable();
            $table->string('r202_nama', 255)->nullable();
            $table->string('r201_jabatan', 1)->nullable();
            $table->string('r202_jabatan', 1)->nullable();
            $table->string('r203', 1)->nullable();
            // $table->string('status', 10)->nullable();

            $table->unsignedInteger('wtf_2')->nullable();
            // $table->string('wtf_2', 1)->nullable();
            $table->string('wtf_3', 1)->nullable();
            $table->string('wtf_4', 1)->nullable();
            $table->string('wtf_5', 1)->nullable();
            $table->string('wtf_6', 1)->nullable();
            $table->string('wtf_7', 1)->nullable();
            $table->string('wtf_8', 1)->nullable();
            $table->string('wtf_9', 1)->nullable();
            $table->string('wtf_10', 1)->nullable();
            $table->string('wtf_11', 1)->nullable();
            $table->string('wtf_12', 1)->nullable();
            $table->string('wtf_13', 1)->nullable();
            $table->string('wtf_14', 1)->nullable();
            $table->string('wtf_15', 1)->nullable();
            $table->string('wtf_16', 1)->nullable();
            $table->string('wtf_17', 1)->nullable();
            $table->string('wtf_18', 1)->nullable();
            $table->string('wtf_19', 1)->nullable();
            $table->string('wtf_20', 1)->nullable();
            $table->string('wtf_21', 1)->nullable();
            $table->string('wtf_22', 1)->nullable();
            $table->string('wtf_23', 1)->nullable();
            $table->string('wtf_24', 1)->nullable();
            $table->string('wtf_25', 1)->nullable();
            $table->string('wtf_26', 1)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vsusenas_mak');
    }
};
