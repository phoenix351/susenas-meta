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
        Schema::table('kabkot', function (Blueprint $table) {
            $table->integer('garis_kemiskinan')->default('500000');
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
            Schema::table('kabkot', function (Blueprint $table) {
                $table->dropColumn('garis_kemiskinan');
            });
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
};
