<?php

namespace App\Jobs;

use App\Models\Kabkot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UpdateDashboardJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            //code...
            Log::info("Processing UpdateDashboardJob started");

            $daftar_kabkot = Kabkot::get();
            foreach ($daftar_kabkot as $kabkot) {
                Log::info("Processing kabkot: " . $kabkot->kode);
                # code...
                app()->call('App\Http\Controllers\MonitoringController@hitung_summary_kabupaten_kota', ['kode_kabkot' => $kabkot->kode]);
                Log::info("Finished processing kabkot: " . $kabkot->kode);
            }
            Log::info("UpdateDashboardJob completed successfully");
        } catch (\Exception $e) {
            Log::error("Job Failed: " . $e->getMessage());
            throw $e; // Let Laravel retry if needed

        }
    }
}
