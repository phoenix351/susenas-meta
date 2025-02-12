<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KomoditasNonMakanan extends Model
{
    use HasFactory;
    protected $table = 'komoditas_non_makanan';
    protected $fillable = [
        'nama_komoditas'
    ];
    
}
