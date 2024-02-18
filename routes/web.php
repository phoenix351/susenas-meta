<?php

use App\Http\Controllers\AnggotaRutaController;
use App\Http\Controllers\MakController;
use App\Http\Controllers\MasterJabatanController;
use App\Http\Controllers\MasterWilayahController;
use App\Http\Controllers\ProfileController;
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

    route::get('/api/entri/kabkot', function () {
        $data = MasterWilayah::distinct()->get(['kode_kabkot', 'kabkot']);
        return response()->json(['data' => $data]);
    })->name('api.entri.kabkot');
    route::get('/api/entri/semester', function () {
        $data = [];
        return response()->json(['data' => $data]);
    })->name('api.entri.semester');

    route::post('/entri/mak', [MakController::class, 'store'])->name('entri.mak.store');
    route::post('/entri/mak/art', [AnggotaRutaController::class, 'store'])->name('entri.mak.art.store');
    route::patch('/entri/mak/konsumsi', [MakController::class, 'konsumsi_store'])->name('entri.mak.konsumsi.store');
    route::patch('/entri/mak/konsumsi/art', [MakController::class, 'konsumsi_art_store'])->name('entri.mak.konsumsi_art.store');
    route::patch('/entri/mak', [MakController::class, 'update'])->name('entri.mak.update');
    route::get('/api/entri/mak', [MakController::class, 'fetch'])->name('api.entri.mak');
    route::get('/api/mak/konsumsi/art/{id_art}', [MakController::class, 'konsumsi_art_fetch'])->name('api.mak.konsumsi.art');



    route::get('/api/entri/kecamatan', function (Request $request) {
        $kabkot = $request->query('kodeKabkot');
        // $semester = $request->query('semester');

        $data = MasterWilayah::where('kode_kabkot', $kabkot)->distinct()->get(['kode_kec', 'kec']);
        return response()->json($data, 200);
    })->name('api.entri.kec');
    route::get('/api/entri/desa', [MasterWilayahController::class, 'fetch_desa'])->name('api.entri.desa');
    route::get('/api/entri/bs4', [MasterWilayahController::class, 'fetch_bs4'])->name('api.entri.bs4');
    route::get('/api/entri/nks', [MasterWilayahController::class, 'fetch_nks'])->name('api.entri.nks');

    route::get('/entri/mak/create', [MakController::class, 'create'])->name("entri.mak.create");
    route::get('/entri/mak/{id}', [MakController::class, 'edit'])->name('entri.mak.edit');


    route::get('/dashboard', function () {
        Log::info('Showing the user profile for user');


        // $kondisi_total = 100;
        return Inertia::render('Dashboard');
    })->name('dashboard');


    route::get('/', function () {
        return to_route('dashboard');
    })->name('root');


    route::get('/statistics', function () {
        return Inertia::render('Statistics');
    })->name('statistics');

    route::get('/entri', function () {
        return Inertia::render('Entri/Inti');
    })->name('entri');



    //route barang untuk user

    Route::get('/editable', function () {
        return Inertia::render('Editable');
    });
});

require __DIR__ . '/auth.php';
