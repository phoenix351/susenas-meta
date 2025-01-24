<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KomoditasUpdateRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id'=>'required|numeric',
            'id_kelompok'=>'required|numeric',
            'nama_kelompok'=>'required',
            'satuan'=>'nullable',
            'kalori'=>'required|numeric',
            'flag_basket'=>'required|numeric',
            'type'=>'required',
        ];
    }
}
