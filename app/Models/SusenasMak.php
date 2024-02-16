<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SusenasMak extends Model
{
    use HasFactory;
    protected $table = "vsusenas_mak";
    protected $fillable = [
        'r108', 'r109', 'r110', 'r111', 'kode_prov', 'kode_kabkot', 'nks', 'kode_bs4', 'kode_kec', 'kode_desa',
        'r203', 'r201_nama', 'r201_jabatan', "r202_nama", "r202_jabatan", 'wtf_2',
        'wtf_3',        'wtf_4',        'wtf_5',        'wtf_6',        'wtf_7',        'wtf_8',        'wtf_9',        'wtf_10',        'wtf_11',        'wtf_12',        'wtf_13',        'wtf_14',        'wtf_15',        'wtf_16',        'wtf_17',        'wtf_18',        'wtf_19',        'wtf_20',        'wtf_21',        'wtf_22',        'wtf_23',        'wtf_24',        'wtf_25',        'wtf_26',
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
