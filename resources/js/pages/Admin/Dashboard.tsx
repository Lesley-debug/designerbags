import { Head, Link } from "@inertiajs/react";
import type { DashboardData } from "@/types/dashboard";

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

function fcfa(n: number | string) {
    return `${Number(n).toLocaleString()} FCFA`;
}

export default function Dashboard({
    revenue,
    orders,
    statusBreakdown,
    lowStock,
    recentOrders,
    topProducts,
    newCustomersThisMonth,
}: DashboardData) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="mx-auto max-w-6xl px-4 py-10">
                <h1 className="mb-6 text-xl font-semibold">Dashboard</h1>

                {/* Revenue + orders summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {(["today", "week", "month"] as const).map((period) => (
                        <div
                            key={period}
                            className="rounded-sm border border-stone-200 p-4"
                        >
                            <p className="text-xs uppercase tracking-wider text-stone-500">
                                {period === "today"
                                    ? "Today"
                                    : period === "week"
                                      ? "This Week"
                                      : "This Month"}
                            </p>
                            <p className="mt-1 text-2xl font-semibold">
                                {fcfa(revenue[period])}
                            </p>
                            <p className="text-sm text-stone-500">
                                {orders[period]} orders
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Order status breakdown */}
                    <div className="rounded-sm border border-stone-200 p-4">
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-500">
                            Orders by Status
                        </h2>
                        <div className="space-y-2">
                            {Object.entries(statusBreakdown).length === 0 && (
                                <p className="text-sm text-stone-400">
                                    No orders yet.
                                </p>
                            )}
                            {Object.entries(statusBreakdown).map(
                                ([status, count]) => (
                                    <div
                                        key={status}
                                        className="flex items-center justify-between"
                                    >
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs capitalize ${STATUS_COLORS[status] ?? ""}`}
                                        >
                                            {status}
                                        </span>
                                        <span className="text-sm font-medium">
                                            {count}
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                        <p className="mt-4 text-sm text-stone-500">
                            {newCustomersThisMonth} new customer
                            {newCustomersThisMonth === 1 ? "" : "s"} this month
                        </p>
                    </div>

                    {/* Low stock alert */}
                    <div className="rounded-sm border border-stone-200 p-4">
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-500">
                            Low Stock
                        </h2>
                        {lowStock.length === 0 ? (
                            <p className="text-sm text-stone-400">
                                Nothing low on stock.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {lowStock.map((v) => (
                                    <div
                                        key={v.id}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <div>
                                            <p>{v.product.name}</p>
                                            <p className="text-xs text-stone-500">
                                                {[v.color, v.size]
                                                    .filter(Boolean)
                                                    .join(" / ") || v.sku}
                                            </p>
                                        </div>
                                        <span
                                            className={`font-semibold ${
                                                v.stock_quantity === 0
                                                    ? "text-red-600"
                                                    : "text-amber-600"
                                            }`}
                                        >
                                            {v.stock_quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Top products */}
                    <div className="rounded-sm border border-stone-200 p-4">
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-500">
                            Top Products
                        </h2>
                        {topProducts.length === 0 ? (
                            <p className="text-sm text-stone-400">
                                No sales yet.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {topProducts.map((p) => (
                                    <div
                                        key={p.sku}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span>{p.product_name}</span>
                                        <span className="text-stone-500">
                                            {p.total_sold} sold
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent orders */}
                <div className="mt-6 rounded-sm border border-stone-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                            Recent Orders
                        </h2>
                        <Link
                            href="/admin/orders"
                            className="text-sm underline"
                        >
                            View all
                        </Link>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-stone-200 text-stone-500">
                                <th className="py-2">Order #</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th className="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-stone-100"
                                >
                                    <td className="py-2">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="underline"
                                        >
                                            {order.order_number}
                                        </Link>
                                    </td>
                                    <td>{order.customer_name}</td>
                                    <td>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs capitalize ${STATUS_COLORS[order.status] ?? ""}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        {fcfa(order.total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {recentOrders.length === 0 && (
                        <p className="py-6 text-center text-sm text-stone-400">
                            No orders yet.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
