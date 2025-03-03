<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_login_page_available(): void
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }
    public function test_user_can_login_with_valid_credentials(): void
    {
        $id = "9e30f90f-b765-4d0a-99c2-c9a27d817c00";
        $user = User::find($id);
        $response = $this->postJson('/login?preserveState=1', ["username" => "ponim", "password" => "123"]);

        $response->assertStatus(302);
        $this->assertAuthenticatedAs($user);
    }
}
