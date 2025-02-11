<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Konsumsi extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'konsumsi';
    // protected $primaryKey = ['id_ruta', 'id_komoditas'];

    public function komoditas()
    {
        return $this->belongsTo(Komoditas::class, 'id_komoditas',"id");
    }
    public function ruta():BelongsTo
    {
        return $this->belongsTo(SusenasMak::class, 'id_ruta');

    }
}
