<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
	Route::post('login', [ApiController::class, 'authenticate']);
	Route::post('register', [ApiController::class, 'register']);
	
	Route::group(['middleware' => ['jwt.verify']], function() {
		Route::get('logout', [ApiController::class, 'logout']);
		Route::get('user', [ApiController::class, 'get_user']);
	
		Route::get('assemblies', 'App\Http\Controllers\AssemblyController@index');
		Route::get('assemblies/{id}', 'App\Http\Controllers\AssemblyController@show');
		Route::post('assemblies', 'App\Http\Controllers\AssemblyController@store');
		Route::put('assemblies/{assembly}', 'App\Http\Controllers\AssemblyController@update');
		Route::delete('assemblies/{assembly}', 'App\Http\Controllers\AssemblyController@delete');

		Route::get('products', 'App\Http\Controllers\ProductController@index');
		Route::get('products/{id}', 'App\Http\Controllers\ProductController@show');
		Route::post('products', 'App\Http\Controllers\ProductController@store');
		Route::put('products/{product}', 'App\Http\Controllers\ProductController@update');
		Route::delete('products/{product}', 'App\Http\Controllers\ProductController@delete');
	
		Route::get('factories', 'App\Http\Controllers\FactoryController@index');
		Route::get('factories/{id}', 'App\Http\Controllers\FactoryController@show');
		Route::post('factories', 'App\Http\Controllers\FactoryController@store');
		Route::put('factories/{factory}', 'App\Http\Controllers\FactoryController@update');
		Route::delete('factories/{factory}', 'App\Http\Controllers\FactoryController@delete');
});
