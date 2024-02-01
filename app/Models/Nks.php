<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nks extends Model
{
    use HasFactory;
    protected $table = "nks";
    protected $fillable = ['kode', 'nama', 'kode_prov'];
    public $timestamps = false;
}
