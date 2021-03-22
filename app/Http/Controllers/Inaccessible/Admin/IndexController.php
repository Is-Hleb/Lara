<?php

namespace App\Http\Controllers\Inaccessible\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function show()
    {
        return view("private.admin.index");
    }
}
