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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json();
});
