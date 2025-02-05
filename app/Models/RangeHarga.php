<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RangeHarga extends Model
{
    use HasFactory;
    protected $table = 'range_harga_komoditas';
    protected $fillable = ["min","max"];
    public $timestamps = false;
    
    public function komoditas(): BelongsTo
    {
        return $this->belongsTo(Komoditas::class, 'id_komoditas', 'nomor_urut');
    }
}
