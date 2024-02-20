<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnggotaRuta extends Model
{
    use HasFactory;
    use HasUuids;
    protected $table = "anggota_ruta";
    protected $primaryKey = "id";
    protected $fillable = ['nama', 'id_ruta', 'nomor_art'];
}
