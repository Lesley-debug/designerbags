<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ProductVariantController;
use App\Http\Controllers\Admin\ProductImageController;

// Public homepage — renders the hero/welcome page
Route::get('/', function () {
    return Inertia::render('Store/Home');
});

// Public shop listing — filters, search, sort, pagination (ShopController@index)
Route::get('/shop', [ShopController::class, 'index'])->name('shop');

// Public single product page — gallery, variant picker, related products (ProductController@show)
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// Everything below requires: logged in (auth) + is_admin = true (admin middleware alias)
// All route names are prefixed "admin." — e.g. admin.products.index, admin.categories.edit
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    // Full CRUD (index/create/store/edit/update/destroy) for categories — admin.categories.*
    Route::resource('categories', AdminCategoryController::class);

    // Full CRUD for products (core fields: name, price, status, etc.) — admin.products.*
    Route::resource('products', AdminProductController::class);

    // Variant management for a given product — add/edit/remove SKU + color/size/stock
    Route::post('products/{product}/variants', [ProductVariantController::class, 'store'])->name('products.variants.store');
    Route::put('products/{product}/variants/{variant}', [ProductVariantController::class, 'update'])->name('products.variants.update');
    Route::delete('products/{product}/variants/{variant}', [ProductVariantController::class, 'destroy'])->name('products.variants.destroy');

    // Image management for a given product — upload, set primary, reorder, delete
    Route::post('products/{product}/images', [ProductImageController::class, 'store'])->name('products.images.store');
    Route::patch('products/{product}/images/{image}/primary', [ProductImageController::class, 'setPrimary'])->name('products.images.primary');
    Route::post('products/{product}/images/reorder', [ProductImageController::class, 'reorder'])->name('products.images.reorder');
    Route::delete('products/{product}/images/{image}', [ProductImageController::class, 'destroy'])->name('products.images.destroy');
});
