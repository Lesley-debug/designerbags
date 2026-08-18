<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShopController;

Route::get('/', function () {
    return Inertia::render('Store/Home');
});

Route::get('/shop', [ShopController::class, 'index'])->name('shop');