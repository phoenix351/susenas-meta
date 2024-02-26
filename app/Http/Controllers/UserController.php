<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {

        $kode_kabkot = auth()->user()->kode_kabkot;

        // Start with the base query
        $usersQuery = User::leftJoin('master_wilayah', 'master_wilayah.kode_kabkot', '=', 'users.kode_kabkot');

        // Add the condition only if $kode_kabkot is not "00"
        if ($kode_kabkot !== "00") {
            $usersQuery->where('users.kode_kabkot', $kode_kabkot);
        }

        // Select the columns
        $users = $usersQuery->select('users.*', 'master_wilayah.kabkot')
            ->distinct('users.id') // Use distinct to get unique users

            ->get();

        // Return the view with the users
        return Inertia::render('Users', ['users' => $users, 'kode_kabkot' => $kode_kabkot]);
    }
    public function store(Request $request)
    {
        $user = $request->all();
        // cek if any users with username
        $is_exist = User::where('username', $user['username'])->first();
        if ($is_exist) {
            $response = [
                'message' => 'username sudah terdaftar !',
                'status' => 'error'
            ];
            return response()->json($response, 409);
        } else {
            try {
                //code...
                $user['password'] = Hash::make($user['password']);
                $user['email'] = $user['username'] . "@ssnmeta.sulut";
                // User::create($user);
                $response = [
                    'message' => 'Berhasil menambahkan 1 akun petugas',
                    'status' => 'success'
                ];
                return response()->json($response, 201);
            } catch (\Exception $exp) {

                return response()->json($exp, 500);
            }
        }
    }
}
