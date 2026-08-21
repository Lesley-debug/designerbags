import { Head, Link } from "@inertiajs/react";
import type { Order } from "@/types/order";

export default function OrderConfirmation({ order }: { order: Order }) {
    return (
        <>
            <Head title="Order Confirmed" />
            <div className="mx-auto max-w-2xl px-4 py-16 text-center">
                <h1 className="text-2xl font-semibold text-stone-900">
                    Thank you, {order.customer_name}!
                </h1>
                <p className="mt-2 text-stone-600">
                    Your order{" "}
                    <span className="font-medium">{order.order_number}</span>{" "}
                    has been placed.
                </p>

                <div className="mt-8 rounded-sm border border-stone-200 p-6 text-left">
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between border-b border-stone-100 py-2 text-sm"
                        >
                            <span>
                                {item.product_name}
                                {item.variant_label &&
                                    ` (${item.variant_label})`}{" "}
                                × {item.quantity}
                            </span>
                            <span>
                                {Number(item.line_total).toLocaleString()} FCFA
                            </span>
                        </div>
                    ))}
                    {Number(order.discount_amount) > 0 && (
                        <div className="flex justify-between border-b border-stone-100 py-2 text-sm text-green-700">
                            <span>
                                Discount{" "}
                                {order.discount_code
                                    ? `(${order.discount_code})`
                                    : ""}
                            </span>
                            <span>
                                −{Number(order.discount_amount).toLocaleString()}{" "}
                                FCFA
                            </span>
                        </div>
                    )}
                    <div className="mt-3 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{Number(order.total).toLocaleString()} FCFA</span>
                    </div>
                </div>

                <p className="mt-6 text-sm text-stone-500">
                    Shipping to: {order.shipping_address}, {order.city}
                </p>

                <Link
                    href="/shop"
                    className="mt-8 inline-block text-sm underline"
                >
                    Continue shopping
                </Link>
            </div>
        </>
    );
}
