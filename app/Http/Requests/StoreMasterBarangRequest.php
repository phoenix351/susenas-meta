<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMasterBarangRequest extends FormRequest
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
     * @return array<string, \d\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'jenis' => 'required',
            'tipe' => 'required',
            'merk' => 'required',
            'tahun_peroleh' => 'required',
            'nomor_seri' => 'required',
            'nomor_urut_pendaftaran' => 'required',
        ];
    }
}
