<?php

namespace App\Http\Requests\RangeHargaRequest;

use Illuminate\Foundation\Http\FormRequest;

class Update extends FormRequest
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
            "kode_kabkot"=>"required",
            "id_komoditas"=>"required",
            "min"=>"required",
            "max"=>"required",
        ];
    }
}
