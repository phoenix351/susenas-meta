<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1) Add surrogate PK if missing
        if (! Schema::hasColumn('kabkot_summary', 'id')) {
            Schema::table('kabkot_summary', function (Blueprint $table) {
                $table->bigIncrements('id'); // adds PK; position doesn't matter
            });
        }

        // 2) Normalize values before adding UNIQUE
        //    - TRIM spaces
        //    - Zero-pad: prov=2 chars, kabkot=4 chars
        DB::statement("
            UPDATE kabkot_summary
            SET
              kode_prov   = LPAD(TRIM(kode_prov),   2, '0'),
              kode_kabkot = LPAD(TRIM(kode_kabkot), 4, '0'),
              kabkot      = TRIM(kabkot)
        ");

        // 3) Deduplicate (keep newest by id)
        // MySQL 8+ / MariaDB 10.2+ (ROW_NUMBER)
        DB::statement("
        DELETE ks1
        FROM kabkot_summary ks1
        JOIN kabkot_summary ks2
          ON ks1.kode_prov   = ks2.kode_prov
         AND ks1.kode_kabkot = ks2.kode_kabkot
         AND ks1.id          < ks2.id
    ");

        // 4) Add UNIQUE index to match your upsert keys
        Schema::table('kabkot_summary', function (Blueprint $table) {
            $table->unique(['kode_prov', 'kode_kabkot'], 'uk_prov_kab');
        });

        // 5) (Optional) tighten column types for stability & perf
        //    Do this AFTER normalization & dedupe to avoid conversion errors.
        Schema::table('kabkot_summary', function (Blueprint $table) {
            $table->char('kode_prov', 2)->nullable(false)->change();
            $table->char('kode_kabkot', 4)->nullable(false)->change();
        });
    }

    public function down(): void
    {
        // Revert type changes first (back to varchar)
        Schema::table('kabkot_summary', function (Blueprint $table) {
            $table->string('kode_prov', 255)->nullable(false)->change();
            $table->string('kode_kabkot', 255)->nullable(false)->change();
        });

        // Drop unique index
        Schema::table('kabkot_summary', function (Blueprint $table) {
            $table->dropUnique('uk_prov_kab');
        });

        // (Optional) keep the id PK—usually you want to keep it.
        // If you really want to remove it (not recommended):
        // Schema::table('kabkot_summary', function (Blueprint $table) {
        //     $table->dropColumn('id');
        // });
    }
};
