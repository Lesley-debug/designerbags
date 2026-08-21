<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        $startOfToday = $now->copy()->startOfDay();
        $startOfWeek = $now->copy()->startOfWeek();
        $startOfMonth = $now->copy()->startOfMonth();

        $nonCancelled = fn($query) => $query->where('status', '!=', 'cancelled');

        $revenueToday = $nonCancelled(Order::where('created_at', '>=', $startOfToday))->sum('total');
        $revenueWeek = $nonCancelled(Order::where('created_at', '>=', $startOfWeek))->sum('total');
        $revenueMonth = $nonCancelled(Order::where('created_at', '>=', $startOfMonth))->sum('total');

        $ordersToday = $nonCancelled(Order::where('created_at', '>=', $startOfToday))->count();
        $ordersWeek = $nonCancelled(Order::where('created_at', '>=', $startOfWeek))->count();
        $ordersMonth = $nonCancelled(Order::where('created_at', '>=', $startOfMonth))->count();

        $statusBreakdown = Order::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $lowStock = ProductVariant::with('product')
            ->where('stock_quantity', '<=', 5)
            ->orderBy('stock_quantity')
            ->limit(10)
            ->get();

        $recentOrders = Order::latest()->limit(8)->get([
            'id',
            'order_number',
            'customer_name',
            'status',
            'total',
            'created_at',
        ]);

        $topProducts = OrderItem::selectRaw('product_name, sku, sum(quantity) as total_sold, sum(line_total) as total_revenue')
            ->whereHas('order', $nonCancelled)
            ->groupBy('product_name', 'sku')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        $newCustomersThisMonth = Order::where('created_at', '>=', $startOfMonth)
            ->distinct('customer_email')
            ->count('customer_email');

        return Inertia::render('Admin/Dashboard', [
            'revenue' => [
                'today' => $revenueToday,
                'week' => $revenueWeek,
                'month' => $revenueMonth,
            ],
            'orders' => [
                'today' => $ordersToday,
                'week' => $ordersWeek,
                'month' => $ordersMonth,
            ],
            'statusBreakdown' => $statusBreakdown,
            'lowStock' => $lowStock,
            'recentOrders' => $recentOrders,
            'topProducts' => $topProducts,
            'newCustomersThisMonth' => $newCustomersThisMonth,
        ]);
    }
}
