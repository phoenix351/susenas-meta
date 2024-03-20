<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonsumsiArt extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'konsumsi_art';
    // protected $primaryKey = ['id_ruta', 'id_komoditas'];

    protected $fillable = [
        'id_art', 'id_komoditas', 'item', 'satuan',
        'harga_beli', 'harga_produksi',
        'volume_beli', 'volume_produksi',
        'volume_total', 'harga_total',
    ];
    public function komoditas()
    {
        return $this->belongsTo(Komoditas::class, 'id_komoditas');
    }
    public function anggota_ruta()
    {
        return $this->belongsTo(AnggotaRuta::class, 'id_art');
    }
}
