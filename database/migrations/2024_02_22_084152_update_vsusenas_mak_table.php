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
            $table->string('users_id', 36)->nullable();
            $table->string('status_dok', 10)->default('entri');
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
                $table->dropColumn('users_id', 36);
                $table->dropColumn('status_dok', 10);
            });
        } catch (\Throwable $th) {
            //throw $th;
        }
        //
    }
};
