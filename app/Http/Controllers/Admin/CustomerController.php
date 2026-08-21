<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::query()
            ->select('customer_email')
            ->selectRaw('MAX(customer_name) as customer_name')
            ->selectRaw('MAX(user_id) as user_id')
            ->selectRaw('COUNT(*) as orders_count')
            ->selectRaw('SUM(total) as total_spent')
            ->selectRaw('MAX(created_at) as last_order_at')
            ->groupBy('customer_email');

        if ($request->filled('search')) {
            $term = $request->string('search');
            $query->having('customer_email', 'like', "%{$term}%")
                ->orHaving('customer_name', 'like', "%{$term}%");
        }

        $customers = $query->orderByDesc('last_order_at')->paginate(20)->withQueryString();

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(string $email)
    {
        $orders = Order::where('customer_email', $email)
            ->with('items')
            ->latest()
            ->get();

        abort_if($orders->isEmpty(), 404);

        $summary = [
            'email' => $email,
            'name' => $orders->first()->customer_name,
            'phone' => $orders->first(fn($o) => $o->customer_phone)?->customer_phone,
            'user_id' => $orders->first(fn($o) => $o->user_id)?->user_id,
            'orders_count' => $orders->count(),
            'total_spent' => $orders->sum('total'),
            'first_order_at' => $orders->last()->created_at,
            'last_order_at' => $orders->first()->created_at,
        ];

        return Inertia::render('Admin/Customers/Show', [
            'summary' => $summary,
            'orders' => $orders,
        ]);
    }
}
