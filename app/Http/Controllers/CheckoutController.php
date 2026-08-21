<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function __construct(private CartService $cartService) {}

    public function show()
    {
        $cart = $this->cartService->current()->load(['items.variant.product']);

        if ($cart->items->isEmpty()) {
            return redirect('/cart')->withErrors(['cart' => 'Your cart is empty.']);
        }

        return Inertia::render('Store/Checkout', [
            'cart' => $cart,
            'user' => Auth::user(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email'],
            'customer_phone' => ['nullable', 'string', 'max:30'],
            'shipping_address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'region' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string'],
        ]);

        $cart = $this->cartService->current()->load('items');

        if ($cart->items->isEmpty()) {
            return redirect('/cart')->withErrors(['cart' => 'Your cart is empty.']);
        }

        try {
            $order = DB::transaction(function () use ($cart, $data) {
                // Lock the variant rows for the duration of this transaction so two
                // simultaneous checkouts can't both oversell the same last-in-stock item.
                $variantIds = $cart->items->pluck('product_variant_id');
                $variants = ProductVariant::whereIn('id', $variantIds)
                    ->lockForUpdate()
                    ->get()
                    ->keyBy('id');

                $subtotal = 0;
                $lineItems = [];

                foreach ($cart->items as $cartItem) {
                    $variant = $variants[$cartItem->product_variant_id];

                    if ($variant->stock_quantity < $cartItem->quantity) {
                        throw new \RuntimeException("Not enough stock for SKU {$variant->sku}.");
                    }

                    $unitPrice = (float) ($variant->price_override ?? $variant->product->display_price);
                    $lineTotal = $unitPrice * $cartItem->quantity;
                    $subtotal += $lineTotal;

                    $label = collect([$variant->color, $variant->size, $variant->material])
                        ->filter()
                        ->implode(' / ');

                    $lineItems[] = [
                        'product_variant_id' => $variant->id,
                        'product_name' => $variant->product->name,
                        'variant_label' => $label ?: null,
                        'sku' => $variant->sku,
                        'unit_price' => $unitPrice,
                        'quantity' => $cartItem->quantity,
                        'line_total' => $lineTotal,
                    ];

                    $variant->decrement('stock_quantity', $cartItem->quantity);
                }

                $shippingCost = 0; // flat/free for now — real shipping calculation is a future extension

                $order = Order::create([
                    'user_id' => Auth::id(),
                    'status' => 'pending',
                    'customer_name' => $data['customer_name'],
                    'customer_email' => $data['customer_email'],
                    'customer_phone' => $data['customer_phone'] ?? null,
                    'shipping_address' => $data['shipping_address'],
                    'city' => $data['city'],
                    'region' => $data['region'] ?? null,
                    'notes' => $data['notes'] ?? null,
                    'subtotal' => $subtotal,
                    'shipping_cost' => $shippingCost,
                    'total' => $subtotal + $shippingCost,
                ]);

                foreach ($lineItems as $line) {
                    $order->items()->create($line);
                }

                $cart->items()->delete();

                return $order;
            });
        } catch (\RuntimeException $e) {
            return back()->withErrors(['stock' => $e->getMessage()]);
        }

        return redirect("/orders/{$order->order_number}/confirmation");
    }
}
