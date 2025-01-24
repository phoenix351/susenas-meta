<?php

namespace App\Http\Controllers;

use App\Http\Requests\KomoditasStoreRequest;
use App\Http\Requests\KomoditasUpdateRequest;
use App\Models\Komoditas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KomoditasController extends Controller
{
    public function index()
    {
        return Inertia::render("Provinsi/Komoditas/index");
    }
    public function store(KomoditasStoreRequest $request)
    {
        try {
            //code...
            DB::beginTransaction();
            $new_komoditas_data = $request->validated();
            $posisi = $new_komoditas_data['posisi_komoditas'];
            if ($posisi == "Awal") {
                Komoditas::whereNotNull("nomor_urut")->update([
                    "nomor_urut" => DB::raw("nomor_urut + 1")
                ]);
                // dd("ssss");
                Komoditas::create([
                    "nomor_urut" => 1,
                    "nama_komoditas" => $new_komoditas_data["nama_komoditas"],
                    "id_kelompok" => $new_komoditas_data["id_kelompok"],
                    "nama_kelompok" => $new_komoditas_data["nama_kelompok"],
                    "satuan" => $new_komoditas_data["satuan"],
                    "kalori" => $new_komoditas_data["kalori"],
                    "flag_basket" => $new_komoditas_data["flag_basket"],
                    "type" => $new_komoditas_data["type"],
                ]);
            } else if ($posisi == "Akhir") {
                $nomor_urut_terakhir = Komoditas::max("nomor_urut");

                $created_komoditas = Komoditas::create([

                    "nama_komoditas" => $new_komoditas_data["nama_komoditas"],
                    "id_kelompok" => $new_komoditas_data["id_kelompok"],
                    "nama_kelompok" => $new_komoditas_data["nama_kelompok"],
                    "satuan" => $new_komoditas_data["satuan"],
                    "kalori" => $new_komoditas_data["kalori"],
                    "flag_basket" => $new_komoditas_data["flag_basket"],
                    "type" => $new_komoditas_data["type"],
                    "nomor_urut" => $nomor_urut_terakhir + 1
                ]);
                // $created_komoditas->update([
                //     "nomor_urut" => $created_komoditas->id,
                // ]);
            } else {
                $after_id = $new_komoditas_data["after_id"];
                Komoditas::where("id", ">", $after_id)->update([
                    "nomor_urut" => DB::raw("nomor_urut + 1 ")
                ]);
                $created_komoditas = Komoditas::create([
                    "nomor_urut" => $after_id + 1,
                    "nama_komoditas" => $new_komoditas_data["nama_komoditas"],
                    "id_kelompok" => $new_komoditas_data["id_kelompok"],
                    "nama_kelompok" => $new_komoditas_data["nama_kelompok"],
                    "satuan" => $new_komoditas_data["satuan"],
                    "kalori" => $new_komoditas_data["kalori"],
                    "flag_basket" => $new_komoditas_data["flag_basket"],
                    "type" => $new_komoditas_data["type"],
                ]);
            }
            // dd($komoditas);
            // Komoditas::create($new_komoditas_data);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
    public function update(KomoditasUpdateRequest $request)
    {
        try {
            //code...
            DB::beginTransaction();
            $new_komoditas_data = $request->validated();
            $komoditas = Komoditas::find($new_komoditas_data['id']);
            // dd($komoditas);
            $komoditas->update($new_komoditas_data);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
    public function destroy($id)
    {
        try {
            //code...
            DB::beginTransaction();
            $komoditas = Komoditas::find($id);
            // dd($komoditas);
            $komoditas->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
    public function fetch_kalori($id)
    {

        try {
            //code...
            $komoditas = Komoditas::where('id', $id)->value('kalori');
            return response()->json($komoditas, 200);
        } catch (\Throwable $th) {
            return response()->json([], 404);
        }
    }
    public function list_komoditas(Request $request)
    {
        try {
            //code...
            $data = [];
            if ($request->input('from') && $request->input('to')) {
                $from = $request->input('from');
                $to = $request->input('to');

                $data = Komoditas::where('id', '>=', $from)->where('id', '<=', $to)->orderBy("nomor_urut", "asc")->get();
            } else {
                $data = Komoditas::orderBy("nomor_urut","asc")->get();
            }
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function sort()
    {
        try {
            //code...
            $daftar_komoditas = Komoditas::whereNotNull("id")->orderBy("nomor_urut", "asc")->get();
            foreach ($daftar_komoditas as $index => $komoditas) {
                # code...
                $komoditas->nomor_urut = $index + 1;
                $komoditas->save();
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
