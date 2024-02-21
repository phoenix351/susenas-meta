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
            // add wtf extra
            $table->integer('wtf_3c1')->nullable();
            $table->integer('wtf_5c1')->nullable();
            $table->integer('wtf_6c1')->nullable();
            $table->integer('wtf_8c1')->nullable();
            $table->integer('wtf_14c1')->nullable();
            $table->integer('wtf_15c1')->nullable();
            $table->integer('wtf_16c1')->nullable();
            $table->integer('wtf_16c2')->nullable();
            $table->integer('wtf_16c3')->nullable();
            $table->integer('wtf_23c1')->nullable();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        try {
            Schema::table('vsusenas_mak', function (Blueprint $table) {
                // add wtf extra
                $table->dropColumn('wtf_3c1');
                $table->dropColumn('wtf_5c1');
                $table->dropColumn('wtf_6c1');
                $table->dropColumn('wtf_8c1');
                $table->dropColumn('wtf_14c1');
                $table->dropColumn('wtf_15c1');
                $table->dropColumn('wtf_16c1');
                $table->dropColumn('wtf_16c2');
                $table->dropColumn('wtf_16c3');
                $table->dropColumn('wtf_23c1');
            });
            //code...
        } catch (\Throwable $th) {
            //throw $th;
        }
        //
    }
};