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
            $table->dropColumn(['wtf_8', 'wtf_9', 'wtf_11']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vsusenas_mak', function (Blueprint $table) {
            $table->integer('wtf_8')->nullable();
            $table->integer('wtf_9')->nullable();
            $table->integer('wtf_11')->nullable();
        });
    }
};
