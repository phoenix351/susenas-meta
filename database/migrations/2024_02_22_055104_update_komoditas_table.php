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
        //
        Schema::table('komoditas', function (Blueprint $table) {
            $table->string("type")->default('standar');
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
            Schema::table('komoditas', function (Blueprint $table) {
                $table->dropColumn("type");
            });
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
};
