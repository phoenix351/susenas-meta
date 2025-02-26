<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\KomoditasController;
use App\Http\Controllers\KomoditasNonMakananController;
use App\Http\Controllers\KonsumsiArtController;
use App\Http\Controllers\KonsumsiNonMakananController;
use App\Http\Controllers\MakController;
use App\Http\Controllers\MasterWilayahController;
use App\Http\Controllers\MonitoringController;
use App\Models\MasterWilayah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth')->group(function () {
    route::get('/api/users',[RegisteredUserController::class,"fetch_users"])->name('users.get');
    route::get('/api/entri/desa', [MasterWilayahController::class, 'fetch_desa'])->name('api.entri.desa');
    route::get('/api/entri/bs4', [MasterWilayahController::class, 'fetch_bs4'])->name('api.entri.bs4');
    route::get('/api/entri/nks', [MasterWilayahController::class, 'fetch_nks'])->name('api.entri.nks');
    route::post('api/cek-nomor-sampel', [MakController::class, 'cek_nomor_sampel'])->name('api.cekNomorSampel');

    route::get('/api/entri/mak', [MakController::class, 'fetch'])->name('api.entri.mak');
    route::get('/api/konsumsi/art/{id_art}', [KonsumsiArtController::class, 'fetch'])->name('api.konsumsi.art.fetch');

    route::get('/api/mak/komoditas/list', [KomoditasController::class, 'list_komoditas'])->name('api.mak.komoditas.list');
    route::get('/api/mak/komoditas/kalori/{id}', [KomoditasController::class, 'fetch_kalori'])->name('api.mak.komoditas.kalori.fetch');
    route::get('/api/mak/calculate_qc/{id_ruta}', [MakController::class, 'calculate_qc'])->name('api.mak.calculate_qc');

    route::get('/api/non_mak/komoditas/list', [KomoditasNonMakananController::class, 'list'])->name('api.non_mak.komoditas.list');
    route::get('/api/non_mak/komoditas/fetch/{id_ruta}', [KomoditasNonMakananController::class, 'fetch'])->name('api.non_mak.konsumsi.fetch');
    route::post('/api/non_mak/konsumsi', [KonsumsiNonMakananController::class, 'store'])->name('api.non_mak.konsumsi.store');

    route::get('/mak/revalidasi/{id_ruta}', [MakController::class, 'revalidasi'])->name('api.mak.revalidasi');


    route::get('/api/entri/kecamatan', [MasterWilayahController::class, "fetch_kecamatan"])->name('api.entri.kec');

    route::get('/api/monitoring/rekap-kabkot/{kode_kabkot}', [MonitoringController::class, 'get_rekap_kabkot'])->name('api.monitoring.rekap_kabkot');
    route::get('/api/monitoring/rekap-komoditas/{kode_kabkot}', [MonitoringController::class, 'get_rekap_komoditas'])->name('api.monitoring.rekap_komoditas');
    route::get('/api/monitoring/rekap-nks', [MonitoringController::class, 'get_rekap_nks'])->name('api.monitoring.rekap_nks');
    route::get('/api/monitoring/wilayah/{tipe}/{kode}', [MonitoringController::class, 'get_rekap_wilayah'])->name('api.monitoring.wilayah');
    route::get('/api/monitoring/rekap-user', [MonitoringController::class, 'get_rekap_user'])->name('api.monitoring.rekap_user');

    route::get('/api/dashboard/queue-status/{jobId}', [MonitoringController::class, 'check_job_status'])->name('api.dashboard.queue-status');
});
