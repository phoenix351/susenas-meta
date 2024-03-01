<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarValidasiModel extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'daftar_validasi';
}