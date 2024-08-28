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
            $table->string('wtf_6c2', 1)->nullable();
            $table->string('wtf_10c1', 1)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vsusenas_mak', function (Blueprint $table) {
            $table->dropColumn('wtf_6c2', 1);
            $table->dropColumn('wtf_10c1', 1);
        });
    }
};
