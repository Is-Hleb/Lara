<?php


namespace App\Http\Controllers\Accessible;


use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class WelcomeController extends Controller
{

    public function show(){
        $this->loadPublicInfo();
        return $this->display("public.index");
    }
}
