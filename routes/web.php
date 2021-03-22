<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Accessible;
use App\Http\Controllers\Inaccessible\Admin;
use App\Http\Controllers\Inaccessible\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::get('/', [Accessible\WelcomeController::class, 'show'])->name("index");

Route::group(["name" => "user", "middleware" => 'auth', 'prefix' => 'user', 'as' => 'user.'], function(){
   Route::group(['name' => 'article', 'prefix' => 'article', 'as' => 'article.'], function(){
       Route::get('/create', [User\ArticleController::class, 'show_create'])->name('show_create');
       Route::post('/create', [User\ArticleController::class, 'make_create'])->name('make_create');

       Route::get('/edit/{id}', [User\ArticleController::class, 'show_edit'])->name('show_edit');
       Route::post('/make_edit', [User\ArticleController::class, 'make_edit'])->name('make_edit');
   });
});

Route::group(['name' => 'admin', 'middleware' => 'is_admin', 'prefix' => 'admin', 'as' => 'admin.'], function(){
    Route::get('/', [Admin\IndexController::class, 'show'])->name("index");

    Route::group(['name' => 'category', 'as' => 'category.', 'prefix' => 'category'], function(){
       Route::get('/', [Admin\CategoryController::class, 'show'])->name("index");
       Route::post('/create', [Admin\CategoryController::class, 'create'])->name("create");
       Route::post("/delete", [Admin\CategoryController::class, 'delete'])->name("delete");
    });

});
