<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konsumsi extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'konsumsi';
    protected $primaryKey = ['id_ruta', 'id_komoditas'];

    protected $fillable = [
        'id_rt', 'id_komoditas', 'item', 'satuan',
        'harga_beli', 'harga_produksi',
        'volume_beli', 'volume_produksi',
        'volume_total', 'harga_total',
    ];
}
