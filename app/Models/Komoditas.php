<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Komoditas extends Model
{
    use HasFactory;
    protected $table = 'komoditas';
    protected $fillable = [
        'nama_komoditas',
        'id_kelompok',
        'nama_kelompok',
        'satuan',
        'kode_coicop',
        'kalori'
    ];
    public $timestamps = false;
    public function konsumsi(): HasMany
    {
        return $this->hasMany(Konsumsi::class, 'id_komoditas');
    }
    public function konsumsi_art(): HasMany
    {
        return $this->hasMany(KonsumsiArt::class, 'id_komoditas');
    }
    public function range_harga(): HasMany
    {
        return $this->hasMany(RangeHarga::class);
    }
}
