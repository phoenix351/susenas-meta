<?php

use App\Http\Controllers\MasterJabatanController;
use App\Http\Controllers\ProfileController;

use App\Models\MasterBarang;
use App\Models\MasterJabatan;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
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

    route::get('/api/entri/provinsi', function () {
        $data = [];
        return response()->json(['data' => $data]);
    })->name('api.entri.provinsi');
    route::get('/api/entri/kabkot', function () {
        $data = [];
        return response()->json(['data' => $data]);
    })->name('api.entri.kabkot');
    route::get('/api/entri/semester', function () {
        $data = [];
        return response()->json(['data' => $data]);
    })->name('api.entri.semester');
    route::get('/api/entri/nks', function () {
        $data = [];
        return response()->json(['data' => $data]);
    })->name('api.entri.nks');


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
