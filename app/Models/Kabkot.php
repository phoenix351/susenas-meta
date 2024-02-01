<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kabkot extends Model
{
    use HasFactory;
    protected $table = "kabkot";
    protected $fillable = ['kode_nks', 'kode_kabkot'];
    public $timestamps = false;
}
