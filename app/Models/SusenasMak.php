<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SusenasMak extends Model
{
    use HasFactory;
    use HasUuids;
    protected $table = "vsusenas_mak";

    protected $fillable = [
        'r108', 'r109', 'r110', 'r111', 'kode_prov', 'kode_kabkot', 'nks', 'kode_bs4', 'kode_kec', 'kode_desa',
        'r203', 'r201_nama', 'r201_jabatan', "r202_nama", "r202_jabatan", 'wtf_2',
        'wtf_3', 'wtf_4', 'wtf_5', 'wtf_6', 'wtf_7', 'wtf_8', 'wtf_9', 'wtf_10',
        'wtf_11', 'wtf_12', 'wtf_13', 'wtf_14', 'wtf_15', 'wtf_16', 'wtf_17', 'wtf_18',
        'wtf_19', 'wtf_20', 'wtf_21', 'wtf_22', 'wtf_23', 'wtf_24', 'wtf_25',
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
        'wtf_3c1',
        'wtf_5c1',
        'wtf_6c1',
        'wtf_8c1',
        'wtf_14c1',
        'wtf_15c1',
        'wtf_16c1',
        'wtf_16c2',
        'wtf_16c3',
        'wtf_23c1',

    ];

    // public function toArray()
    // {
    //     return $this->attributesToArray();/
    // }
    public function regions()
    {
        return $this->belongsTo(MasterWilayah::class, 'kode_kec', 'kode_kec');
    }
}
