<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaintenanceRequest extends FormRequest
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
            'barang_id' => 'required',
            'users_id' => 'required',
            'keluhan' => 'required',
            // 'problem_img_path' => 'image|mimes:jpeg,png|max:2048', // Only accept JPEG and PNG images with a maximum size of 2048 KB
            'problem_img_path' => 'max:2048', // Only accept JPEG and PNG images with a maximum size of 2048 KB

        ];
    }
}
