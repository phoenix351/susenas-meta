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
            $table->text('catatan')->nullable()->after('r203');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vsusenas_mak', function (Blueprint $table) {
            //
        });
    }
};
