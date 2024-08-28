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
            $table->integer('blokqc_0')->nullable();
            $table->integer('blokqc_1')->nullable();
            $table->integer('blokqc_2')->nullable();
            $table->integer('blokqc_3')->nullable();
            $table->integer('blokqc_4')->nullable();
            $table->integer('blokqc_5')->nullable();
            $table->integer('blokqc_6')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        try {
            //code...
            Schema::table('vsusenas_mak', function (Blueprint $table) {
                $table->dropColumn('blokqc_0');
                $table->dropColumn('blokqc_1');
                $table->dropColumn('blokqc_2');
                $table->dropColumn('blokqc_3');
                $table->dropColumn('blokqc_4');
                $table->dropColumn('blokqc_5');
            });
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
};
