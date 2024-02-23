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
        Schema::table('vsusenas_mak', function (Blueprint $table) {
            // $table->integer('blokqc_6')->after('blokqc_5')->nullable();
            // $table->string('users_id', 36)->nullable();
            // $table->string('status_dok', 10)->default('entri');
            $table->integer('hal10_jml_komoditas')->after('wtf_26')->nullable();
            $table->integer('hal8_jml_komoditas')->after('wtf_26')->nullable();
            $table->integer('hal6_jml_komoditas')->after('wtf_26')->nullable();
            $table->integer('hal4_jml_komoditas')->after('wtf_26')->nullable();
            $table->integer('hal2_jml_komoditas')->after('wtf_26')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        try {
            //code...
            Schema::table('vsusenas_mak', function (Blueprint $table) {
                $table->dropColumn('blokqc_6');
                $table->dropColumn('users_id', 36);
                $table->dropColumn('status_dok', 10);
                $table->dropColumn('hal10_jml_komoditas');
                $table->dropColumn('hal8_jml_komoditas');
                $table->dropColumn('hal6_jml_komoditas');
                $table->dropColumn('hal4_jml_komoditas');
                $table->dropColumn('hal2_jml_komoditas');
            });
        } catch (\Throwable $th) {
            //throw $th;
        }
        //
    }
};
