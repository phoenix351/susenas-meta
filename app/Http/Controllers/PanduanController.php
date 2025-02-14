<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PanduanController extends Controller
{
    public function index()
    {
        return Inertia::render("Panduan/index");
    }
}
