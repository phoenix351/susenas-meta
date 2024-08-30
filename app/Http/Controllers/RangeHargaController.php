<?php

namespace App\Http\Controllers;

use App\Models\Komoditas;
use App\Models\MasterWilayah;
use App\Models\RangeHarga;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RangeHargaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $daftar_kelompok = Komoditas::selectRaw('distinct(nama_kelompok),id_kelompok')->get();
        $daftar_kabkot = MasterWilayah::selectRaw('distinct(kabkot),kode_kabkot')->where(function ($query) use ($user) {
            if ($user->kode_kabkot == '00') {
                return $query;
            }
            return $query->where('kode_kabkot', '=', $user->kode_kabkot);
        })->get();
        return Inertia::render('RangeHarga/index', ['kelompok' => $daftar_kelompok, 'kabkot' => $daftar_kabkot]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public  function fetch(Request $request)
    {
        try {
            //code...
            // $nama_komoditas = $request->input('nama_komoditas');
            // $kelompok_id = $request->input('kelompok_id');
            // $kode_kabkot = $request->input('kode_kabkot');
            // $min = $request->input('min');
            // $max = $request->input('max');
            // dd([$nama_komoditas, $kelompok_id, $min, $max, $kode_kabkot]);
            $user = Auth::user();

            $userInput = ['user' => $user, 'input' => $request->all()];

            $data = RangeHarga::with(['komoditas'])->whereHas('komoditas', function ($query) use ($userInput) {
                if ($userInput['user']->kode_kabkot == '00') {
                    $query->where('type', '<>', 'sub');
                } else {
                    $query->where('type', '<>', 'sub')->where('kode_kabkot', '=', $userInput['user']->kode_kabkot);
                }
                // nama komoditas
                if (isset($userInput['input']['nama_komoditas']) && !is_null($userInput['input']['nama_komoditas'])) {
                    $query->where('nama_komoditas', 'like', "%" . $userInput['input']['nama_komoditas'] . "%");
                }
                if (isset($userInput['input']['id_kelompok']) && !is_null($userInput['input']['id_kelompok'])) {
                    $query->where('id_kelompok', 'like', "%" . $userInput['input']['id_kelompok'] . "%");
                }
                if (isset($userInput['input']['kode_kabkot']) && !is_null($userInput['input']['kode_kabkot'])) {
                    $query->where('kode_kabkot', 'like', "%" . $userInput['input']['kode_kabkot'] . "%");
                }
                if (isset($userInput['input']['min']) && ($userInput['input']['min'])>0) {
                    $query->where('min', '>=',  $userInput['input']['min']);
                }
                if (isset($userInput['input']['max']) && ($userInput['input']['max'])>0) {
                    $query->where('max', '<=',  $userInput['input']['max']);
                }


                // return $query;
            })->get();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}