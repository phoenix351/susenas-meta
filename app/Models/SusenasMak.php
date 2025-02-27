<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SusenasMak extends Model
{
    use HasFactory;
    use HasUuids;
    protected $table = "vsusenas_mak";

    protected $fillable = [
        'semester',
        'r108',
        'r109',
        'r110',
        'r111',
        'kode_prov',
        'kode_kabkot',
        'nks',
        'kode_bs4',
        'kode_kec',
        'kode_desa',
        'r203',
        'r201_nama',
        'r201_jabatan',
        "r202_nama",
        "r202_jabatan",
        'wtf_1',
        'wtf_2',
        'wtf_3',
        'wtf_4',
        'wtf_5',
        'wtf_6',
        'wtf_7',
        'wtf_8',
        'wtf_9',
        'wtf_10',
        'wtf_11',
        'hal10_jml_komoditas',
        'hal8_jml_komoditas',
        'hal6_jml_komoditas',
        'hal4_jml_komoditas',
        'hal2_jml_komoditas',
        "blok4_31_jumlah_mak_beli",
        "blok4_31_jumlah_mak_produksi",
        "blok4_31_jumlah_rokok_beli",
        "blok4_31_jumlah_rokok_produksi",
        "blok4_32_0_beli",
        "blok4_32_0_produksi",
        "blok4_32_0_total",
        "blok4_32_1_beli",
        "blok4_32_1_produksi",
        "blok4_32_1_total",
        "blok4_32_2_beli",
        "blok4_32_2_produksi",
        "blok4_32_2_total",
        "blok4_32_3_beli",
        "blok4_32_3_produksi",
        "blok4_32_3_total",
        "blok4_32_4_beli",
        "blok4_32_4_produksi",
        "blok4_32_4_total",
        "blok4_32_5_beli",
        "blok4_32_5_produksi",
        "blok4_32_5_total",
        "blok4_32_6_beli",
        "blok4_32_6_produksi",
        "blok4_32_6_total",
        "blok4_32_7_beli",
        "blok4_32_7_produksi",
        "blok4_32_7_total",
        "blok4_32_8_beli",
        "blok4_32_8_produksi",
        "blok4_32_8_total",
        "blok4_32_9_beli",
        "blok4_32_9_produksi",
        "blok4_32_9_total",
        "blok4_32_10_beli",
        "blok4_32_10_produksi",
        "blok4_32_10_total",
        "blok4_32_11_beli",
        "blok4_32_11_produksi",
        "blok4_32_11_total",
        "blok4_32_12_beli",
        "blok4_32_12_produksi",
        "blok4_32_12_total",
        "blok4_32_13_beli",
        "blok4_32_13_produksi",
        "blok4_32_13_total",
        "blok4_32_14_beli",
        "blok4_32_14_produksi",
        "blok4_32_14_total",
        "blok4_32_15_total",
        "blok4_32_16_total",
        "blok4_32_17_total",
        "blokqc_0",
        "blokqc_1",
        "blokqc_2",
        "blokqc_3",
        "blokqc_4",
        "blokqc_5",
        "blokqc_6",
        'wtf_3c1',
        'wtf_5c1',
        'wtf_6c1',
        'wtf_6c2',
        'wtf_8c1',
        'wtf_10c1',
        'wtf_14c1',
        'wtf_15c1',
        'wtf_16c1',
        'wtf_16c2',
        'wtf_16c3',
        'wtf_23c1',
        'wtf_24c1',
        'users_id',
        'status_dok'

    ];

    // public function toArray()
    // {
    //     return $this->attributesToArray();/
    // }
    public function region()
    {
        return $this->belongsTo(MasterWilayah::class, 'nks', 'nks')
        ->where("kode_kabkot",$this->kode_kab)
        ->where("kode_kec",$this->kode_kec)
        ->where("kode_desa",$this->kode_desa);
    }
    public function konsumsi_ruta(): HasMany
    {
        return $this->hasMany(Konsumsi::class);
    }
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class,"users_id","id");
    }
}