<?php

use App\Http\Controllers\AnggotaRutaController;
use App\Http\Controllers\CalculateController;
use App\Http\Controllers\KomoditasController;

use App\Http\Controllers\MakController;
use App\Http\Controllers\MasterWilayahController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\PanduanController;
use App\Http\Controllers\PeriksaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\RangeHargaController;
use App\Http\Controllers\StatistikController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MakController::class, 'maintenance'])->name('maintenance');


Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/users', [PenggunaController::class, 'index'])->name('users.index');
    Route::post('/users', [PenggunaController::class, 'store'])->name('users.store');
    Route::patch('/users', [PenggunaController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [PenggunaController::class, 'destroy'])->name('users.delete');
    route::get('/entri/mak/view/{id}', [MakController::class, 'view'])->name('entri.mak.view');
    route::get('/calculate', [CalculateController::class, 'index'])->name('calculate');

    route::get('/statistik', [StatistikController::class, 'index'])->name('statistik');
    route::get('/api/provinsi/statistik/pengeluaran_perkapita/{kode_kabkot}', [StatistikController::class, 'fetch_pengeluaran_perkapita'])->name('api.provinsi.statistik.pengeluaran_perkapita');
});


Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    route::get('/api/wilayah/kabkot', [MasterWilayahController::class, 'fetch_kabkot'])->name('api.wilayah.kabkot');
    route::get('/api/entri/semester', function () {
        $data = [];
        return response()->json(['data' => $data]);
    })->name('api.entri.semester');

    route::get('/entri/mak/create', [MakController::class, 'create'])->name("entri.mak.create");
    route::post('/entri/mak', [MakController::class, 'store'])->name('entri.mak.store');
    route::post('/entri/mak/art', [AnggotaRutaController::class, 'store'])->name('entri.mak.art.store');
    route::patch('/entri/mak/art', [AnggotaRutaController::class, 'update'])->name('entri.mak.art.update');
    route::get('/entri/mak/art', [AnggotaRutaController::class, 'fetch'])->name('entri.mak.art.fetch');
    route::patch('/entri/mak/konsumsi', [MakController::class, 'konsumsi_store'])->name('entri.mak.konsumsi.store');
    route::patch('/entri/mak/konsumsi/art', [MakController::class, 'konsumsi_art_store'])->name('entri.mak.konsumsi_art.store');
    route::delete('/entri/mak/art/{id_art}', [AnggotaRutaController::class, 'delete'])->name('entri.mak.art.delete');
    route::delete('/entri/mak/delete/{id_ruta}', [MakController::class, 'delete'])->name('entri.mak.delete');

    route::patch('/entri/mak', [MakController::class, 'update'])->name('entri.mak.update');
    
    route::get('/entri/mak/{id}', [MakController::class, 'edit'])->name('entri.mak.edit');
      
    // route::get('/dashboard', [MakController::class, 'dashboard'])->name('dashboard');
    route::get('/progress', [MonitoringController::class, 'index'])->name('progress');
    route::get('/dashboard', [MonitoringController::class, 'dashboard'])->name('dashboard');
    route::get('/progress/update', [MonitoringController::class, 'update'])->name('progress.update');
    route::get('/dashboard/update', [MonitoringController::class, 'update_dashboard'])->name('dashboard.update');

    route::get('/kelola-entri', [MakController::class, 'kelola_entri'])->name('kelola-entri');
    route::get('/periksa', [PeriksaController::class, 'index'])->name('periksa');
    route::get('/unduh-raw', [MakController::class, 'unduh_raw'])->name('unduh_raw');

    route::get('/', function () {
        return to_route('entri');
    })->name('root');
    route::get('/entri', [MakController::class, 'entri'])->name('entri');
    // route range harga
    route::get('/range-harga', [RangeHargaController::class, 'index'])->name('range_harga.index');
    route::get('/range-harga/fetch', [RangeHargaController::class, 'fetch'])->name('range_harga.fetch');
    route::post('/range-harga/upload', [RangeHargaController::class, 'upload'])->name('range_harga.upload');
    route::put('/range-harga/update', [RangeHargaController::class, 'update'])->name('range_harga.update');

    //route komoditas
    route::get('/komoditas', [KomoditasController::class, 'index'])->name('komoditas.index');
    route::post('/komoditas', [KomoditasController::class, 'store'])->name('komoditas.store');
    route::put('/komoditas', [KomoditasController::class, 'update'])->name('komoditas.update');
    route::delete('/komoditas/{id}', [KomoditasController::class, 'destroy'])->name('komoditas.destroy');
    route::get('/komoditas/sort', [KomoditasController::class, 'sort'])->name('komoditas.sort');

    route::get('/panduan', [PanduanController::class, 'index'])->name('panduan.index');
    
    route::get('/calculate/export/{table_name}', [CalculateController::class, 'export'])->name('calculate.export');
  
});

require __DIR__ . '/auth.php';
