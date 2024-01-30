<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePemeriksaanPBJPPKRequest extends FormRequest
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
            'estimasi_penyelesaian' => 'required',
            'perusahaan_id' => 'required',
            'penanggung_jawab_id' => 'required',

            'nama_pj' => 'nullable',
            'jabatan_pj' => 'nullable',
            'sequence_id' => 'required',
        ];
    }
}
