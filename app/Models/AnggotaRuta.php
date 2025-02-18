<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AnggotaRuta extends Model
{
    use HasFactory;
    use HasUuids;
    protected $table = "anggota_ruta";
    protected $primaryKey = "id";
    protected $fillable = ['nama', 'id_ruta', 'nomor_art'];

    public function konsumsi(): HasMany
    {
        return $this->hasMany(KonsumsiArt::class,"id_art","id");
    }
    public function ruta():BelongsTo
    {
        return $this->belongsTo(SusenasMak::class,"id_ruta");
    }
}

