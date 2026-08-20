<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(string $slug)
    {
        $product = Product::active()
            ->with(['category', 'images', 'variants'])
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Product::active()
            ->with(['images', 'variants'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return Inertia::render('Store/ProductDetail', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}
