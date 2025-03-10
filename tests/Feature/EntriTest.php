<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EntriTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    protected $user;

    protected function setUp(): void
    {
        parent::setUp(); // Always call the parent setUp()

        // Find or create the user once for all tests in this class
        $this->user = User::find('9e30f90f-b765-4d0a-99c2-c9a27d817c00') ?? User::factory()->create([
            'id' => '9e30f90f-b765-4d0a-99c2-c9a27d817c00'
        ]);

        // Authenticate the user
        $this->actingAs($this->user);
    }
    public function test_make_a_new_entry(): void
    {
        $response = $this->get('/entri/mak/create?kode_prov=71&semester=1&kode_kabkot=01&nks=100009');

        $response->assertStatus(200);
    }
}
