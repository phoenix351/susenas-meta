<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komoditas extends Model
{
    use HasFactory;
    protected $table = 'komoditas';
    protected $fillable = [
        'nama_komoditas',
        'id_kelompok', 'nama_kelompok',
        'satuan', 'kode_coicop', 'kalori'
    ];
    public $timestamps = false;
    public function konsumsi()
    {
        return $this->hasMany(Konsumsi::class, 'id_komoditas');
    }
    public function konsumsi_art()
    {
        return $this->hasMany(KonsumsiArt::class, 'id_komoditas');
    }
}
