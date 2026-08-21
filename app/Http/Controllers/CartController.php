<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\ProductVariant;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function __construct(private CartService $cartService) {}

    public function index()
    {
        $cart = $this->cartService->current()->load(['items.variant.product.images']);

        return Inertia::render('Store/Cart', [
            'cart' => $cart,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'variant_id' => ['required', 'exists:product_variants,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $variant = ProductVariant::findOrFail($data['variant_id']);

        if ($variant->stock_quantity < $data['quantity']) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $cart = $this->cartService->current();

        $item = CartItem::firstOrNew([
            'cart_id' => $cart->id,
            'product_variant_id' => $variant->id,
        ]);

        $newQuantity = ($item->exists ? $item->quantity : 0) + $data['quantity'];

        if ($newQuantity > $variant->stock_quantity) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $item->quantity = $newQuantity;
        $item->cart_id = $cart->id;
        $item->product_variant_id = $variant->id;
        $item->save();

        return back()->with('success', 'Added to cart.');
    }

    public function update(Request $request, CartItem $item)
    {
        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        if ($data['quantity'] > $item->variant->stock_quantity) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $item->update(['quantity' => $data['quantity']]);

        return back()->with('success', 'Cart updated.');
    }

    public function destroy(CartItem $item)
    {
        $item->delete();

        return back()->with('success', 'Item removed.');
    }
}
