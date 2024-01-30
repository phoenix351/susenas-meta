<?php

namespace App\Http\Controllers;

use App\Models\MasterJabatan;
use App\Http\Requests\StoreMasterJabatanRequest;
use App\Http\Requests\UpdateMasterJabatanRequest;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;



class MasterJabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreMasterJabatanRequest $request)
    {
        try {
            $validatedData = $request->validate($request->rules());

            $response = [
                'message' => 'Data berhasil ditambahkan',
            ];

            MasterJabatan::create($validatedData);
            $master_jabatan = MasterJabatan::all();
        } catch (QueryException $e) {
            $response = [
                'message' => 'Koneksi gagal',
                'data_sent' => $validatedData,
                'errors' => $e->getMessage(),
            ];
            $master_jabatan = [];
        } catch (ValidationException $e) {
            $response = [
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ];
            $master_jabatan = [];
        } catch (\Exception $e) {
            $response = [
                'message' => 'An error occurred',
                'errors' => $e->getMessage(),
            ];
            $master_jabatan = [];
        }

        return Inertia::render('Admin/MasterJabatan', [
            'response' => $response,
            'master_jabatan' => $master_jabatan
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MasterJabatan $masterJabatan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MasterJabatan $masterJabatan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMasterJabatanRequest $request, MasterJabatan $masterJabatan)
    {
        try {
            $validatedData = $request->validate($request->rules());
            $updateRecord = MasterJabatan::findOrFail($request->id);

            $updateRecord->update($validatedData);

            $response = [
                'message' => 'Berhasil melakukan update data'
            ];

            $master_jabatan = MasterJabatan::all();
        } catch (QueryException $e) {
            $response = [
                'message' => 'An error occurred',
                'errors' => $e->getMessage(),
            ];
            $master_jabatan = [];
        } catch (ModelNotFoundException $e) {
            $response = [
                'errors' => 'Record not found',
            ];
            $master_jabatan = [];
        } catch (ValidationException $e) {
            $response = [
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ];
            $master_jabatan = [];
        } catch (\Exception $e) {
            $response = [
                'message' => 'An error occurred',
                'errors' => $e->getMessage(),
            ];
            $master_jabatan = [];
        }

        return Inertia::render('Admin/MasterJabatan', [
            'response' => $response,
            'master_jabatan' => $master_jabatan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        try {

            $updateRecord = MasterJabatan::findOrFail($request->query('id'));

            $updateRecord->delete();

            $response = [
                'message' => 'Berhasil menghapus data',
                'req' => $request->query('id')
            ];

            $master_jabatan = MasterJabatan::all();
        } catch (QueryException $e) {
            $response = [
                'message' => 'An error occurred',
                'errors' => $e->getMessage(),
            ];
            $master_jabatan = [];
        } catch (ModelNotFoundException $e) {
            $response = [
                'errors' => 'Record not founsadsadd' . $request->query('id'),
            ];
            $master_jabatan = [];
        } catch (ValidationException $e) {
            $response = [
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ];
            $master_jabatan = [];
        } catch (\Exception $e) {
            $response = [
                'message' => 'An error occurred',
                'errors' => $e->getMessage(),
            ];
            $master_jabatan = [];
        }
        return Inertia::render('Admin/MasterJabatan', [
            'response' => $response,
            'master_jabatan' => $master_jabatan
        ]);
    }
}
