<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EntriIntiTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    public function test_page_available(): void
    {
        $id = "9e30f90f-b765-4d0a-99c2-c9a27d817c00";

        $user = User::find($id = "9e30f90f-b765-4d0a-99c2-c9a27d817c00");
        $this->actingAs($user);

        $response = $this->get('/entri?kode_kabkot=01&nks=100009&semester=1');
        $response->assertStatus(200);
    }
    public function test_api_get_nks_by_kodekabkot(): void
    {
        $id = "9e30f90f-b765-4d0a-99c2-c9a27d817c00";

        $user = User::find($id = "9e30f90f-b765-4d0a-99c2-c9a27d817c00");
        $this->actingAs($user);
        $response = $this->get('/api/entri/nks?kodeKabkot=02&semester=1');
        $data = $response->json();

        $response->assertStatus(200);
        // Ensure it's an array
        $this->assertIsArray($data);

        // Ensure all items in the array are strings
        foreach ($data as $item) {
            $this->assertIsString($item);
        }
    }
}
