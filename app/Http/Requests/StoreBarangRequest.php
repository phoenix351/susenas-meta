<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBarangRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "id", "id_barang", "id_sistem_operasi", "tanggal_terima", "tanggal_serah", "id_ruangan", "kondisi", "status_pemeliharaan", "bast_path", "bast_status", "tanggal_perubahan", "id_pengguna"
        ];
    }
}
