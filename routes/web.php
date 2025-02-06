<?php

use App\Http\Controllers\AnggotaRutaController;
use App\Http\Controllers\KomoditasController;
use App\Http\Controllers\MakController;
use App\Http\Controllers\MasterJabatanController;
use App\Http\Controllers\MasterWilayahController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\PeriksaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\RangeHargaController;
use App\Models\Konsumsi;
use App\Models\MasterJabatan;
use App\Models\MasterWilayah;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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
    route::get('/recalculate-qc', [MakController::class, 'recalculate_qc'])->name('recalculate_qc');
});


Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //route master barang
    //route master jabatan
    route::get('/admin/master-jabatan', function () {
        return Inertia::render('Admin/MasterJabatan', ['master_jabatan' => MasterJabatan::all()]);
    })->name('admin.master.jabatan');
    Route::patch('/admin/master-jabatan', [MasterJabatanController::class, 'update'])->name('master_jabatan.update');
    Route::post('/admin/master-jabatan', [MasterJabatanController::class, 'store'])->name('master_jabatan.store');
    Route::delete('/admin/master-jabatan', [MasterJabatanController::class, 'destroy'])->name('master_jabatan.destroy');

    //route master ruangan
    route::get('/api/users', function () {
        $users = User::select('id', 'nama_lengkap')->get();
        return response()->json([$users]);
    })->name('users.get');
    // route api for jabatan
    route::get('/api/master/jabatan/nama', function () {
        $namaList = MasterJabatan::select(["nama"])->groupBy(['nama'])->get();
        return response()->json([$namaList]);
    })->name('admin.master.jabatan.nama');
    route::get('/api/master/jabatan/jenis', function () {
        $jenisList = MasterJabatan::select(["jenis"])->groupBy(['jenis'])->get();
        return response()->json([$jenisList]);
    })->name('admin.master.jabatan.jenis');
    route::get('/api/master/jabatan/tingkat', function () {
        $tingkatList = MasterJabatan::select(["tingkat"])->groupBy(['tingkat'])->get();
        return response()->json([$tingkatList]);
    })->name('admin.master.jabatan.tingkat');

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
    route::get('/api/entri/mak', [MakController::class, 'fetch'])->name('api.entri.mak');
    route::get('/api/mak/konsumsi/art/{id_art}', [MakController::class, 'konsumsi_art_fetch'])->name('api.mak.konsumsi.art');

    route::get('/api/mak/komoditas/list', [KomoditasController::class, 'list_komoditas'])->name('api.mak.komoditas.list');
    route::get('/api/mak/komoditas/kalori/{id}', [KomoditasController::class, 'fetch_kalori'])->name('api.mak.komoditas.kalori.fetch');
    route::get('/api/mak/calculate_qc/{id_ruta}', [MakController::class, 'calculate_qc'])->name('api.mak.calculate_qc');

    route::get('/api/mak/revalidasi/{id_ruta}', [MakController::class, 'revalidasi'])->name('api.mak.revalidasi');


    route::get('/api/entri/kecamatan', function (Request $request) {
        $kabkot = $request->query('kodeKabkot');
        // $semester = $request->query('semester');

        $data = MasterWilayah::where('kode_kabkot', $kabkot)->distinct()->get(['kode_kec', 'kec']);
        return response()->json($data, 200);
    })->name('api.entri.kec');
    route::get('/api/entri/desa', [MasterWilayahController::class, 'fetch_desa'])->name('api.entri.desa');
    route::get('/api/entri/bs4', [MasterWilayahController::class, 'fetch_bs4'])->name('api.entri.bs4');
    route::get('/api/entri/nks', [MasterWilayahController::class, 'fetch_nks'])->name('api.entri.nks');

    route::get('/entri/mak/{id}', [MakController::class, 'edit'])->name('entri.mak.edit');


    route::post('api/cek-nomor-sampel', [MakController::class, 'cek_nomor_sampel'])->name('api.cekNomorSampel');


    // route::get('/dashboard', [MakController::class, 'dashboard'])->name('dashboard');
    route::get('/progress', [MonitoringController::class, 'index'])->name('progress');
    route::get('/dashboard', [MonitoringController::class, 'dashboard'])->name('dashboard');
    route::post('/monitoring/update', [MonitoringController::class, 'update'])->name('monitoring.update');
    route::get('/dashboard/update', [MonitoringController::class, 'update_dashboard'])->name('dashboard.update');
    route::get('/api/dashboard/queue-status/{jobId}', [MonitoringController::class, 'check_job_status'])->name('api.dashboard.queue-status');

    route::get('/api/monitoring/rekap-kabkot/{kode_kabkot}', [MonitoringController::class, 'get_rekap_kabkot'])->name('api.monitoring.rekap_kabkot');
    route::get('/api/monitoring/rekap-komoditas/{kode_kabkot}', [MonitoringController::class, 'get_rekap_komoditas'])->name('api.monitoring.rekap_komoditas');
    route::get('/api/monitoring/rekap-nks', [MonitoringController::class, 'get_rekap_nks'])->name('api.monitoring.rekap_nks');
    route::get('/api/monitoring/wilayah/{tipe}/{kode}', [MonitoringController::class, 'get_rekap_wilayah'])->name('api.monitoring.wilayah');
    route::get('/api/monitoring/rekap-user', [MonitoringController::class, 'get_rekap_user'])->name('api.monitoring.rekap_user');

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


    Route::get('/editable', function () {
        return Inertia::render('Editable');
    });
});

require __DIR__ . '/auth.php';
