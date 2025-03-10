<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kabkot extends Model
{
    use HasFactory;
    protected $primaryKey = "kode";
    protected $table = "kabkot";
    protected $fillable = ['kode_nks', 'kode_kabkot', 'garis_kemiskinan', 'garis_kemiskinan_sementara'];
    public $timestamps = false;
}
