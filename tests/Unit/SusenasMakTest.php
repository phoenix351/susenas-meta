<?php

namespace Tests\Unit;

use App\Http\Controllers\MakController;
use App\Models\MasterWilayah;
use App\Models\SusenasMak;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class SusenasMakTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    use DatabaseTransactions;

    public function testChangeNks(): void
    {
        // dd(Config::get('database.connections') . Config::get('database.default'));

        $susenas_mak = new MakController();

        $user_id = '9b673d90-6dc6-4819-80c8-27e2577eeff0';
        $data_baru = [
            'users_id' => $user_id,
            'status_dok' => 'error',
            'kode_prov' => '71',
            'kode_kabkot' => '07',
            'kode_kec' => '060',
            'kode_desa' => '013',
            'kode_bs4' => '001B',
            'nks' => '100196',
            'semester' => '1',

        ];


        $mak = SusenasMak::create($data_baru);
        $nks_baru = '100003';
        $wilayah_baru = MasterWilayah::where('nks', $nks_baru)->where('kode_kabkot', '07')->first();
        $result = $susenas_mak->change_nks($mak->id, $nks_baru);
        $this->assertTrue($result);

        $mak_new = SusenasMak::find($mak->id);

        $this->assertEquals($mak_new->nks, $nks_baru);
        $this->assertEquals($mak_new->kode_kabkot, $wilayah_baru->kode_kabkot);
        $this->assertEquals($mak_new->kode_kec, $wilayah_baru->kode_kec);
        $this->assertEquals($mak_new->kode_desa, $wilayah_baru->kode_desa);
        $this->assertEquals($mak_new->kode_bs4, $wilayah_baru->kode_bs4);
        // $this->assertModelExists(SusenasMak::class, [
        //     'id' => $mak->id,
        //     'kode_desa' => $wilayah_baru->kode_desa,
        //     'kode_kec' => $wilayah_baru->kode_kec,
        //     'nks' => $nks_baru,
        // ]);
    }
    public function testChangeNksInvalid(): void
    {
        // dd(Config::get('database.connections') . Config::get('database.default'));

        $susenas_mak = new MakController();

        $user_id = '9b673d90-6dc6-4819-80c8-27e2577eeex0';
        $data_baru = [
            'users_id' => $user_id,
            'status_dok' => 'error',
            'kode_prov' => '71',
            'kode_kabkot' => '07',
            'kode_kec' => '060',
            'kode_desa' => '013',
            'kode_bs4' => '001B',
            'nks' => '100196',
            'semester' => '1',

        ];

        $mak = SusenasMak::create($data_baru);
        $nks_baru = '123456';
        $wilayah_baru = MasterWilayah::where('nks', $nks_baru)->where('kode_kabkot', '07')->first();
        $result = $susenas_mak->change_nks($mak->id, $nks_baru);
        $this->assertFalse($result);
    }
}
