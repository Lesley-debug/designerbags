import { Head, Link, router } from "@inertiajs/react";
import type { Cart } from "@/types/cart";

export default function CartPage({ cart }: { cart: Cart }) {
    function updateQuantity(itemId: number, quantity: number) {
        if (quantity < 1) return;
        router.patch(
            `/cart/items/${itemId}`,
            { quantity },
            { preserveScroll: true },
        );
    }

    function removeItem(itemId: number) {
        router.delete(`/cart/items/${itemId}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Your Cart" />
            <div className="mx-auto max-w-4xl px-4 py-10">
                <h1 className="mb-6 text-2xl font-semibold text-stone-900">
                    Your Cart
                </h1>

                {cart.items.length === 0 ? (
                    <div>
                        <p className="text-stone-500">Your cart is empty.</p>
                        <Link
                            href="/shop"
                            className="mt-4 inline-block text-sm underline"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="divide-y divide-stone-200 border-y border-stone-200">
                            {cart.items.map((item) => {
                                const primary =
                                    item.variant.product.images?.[0];
                                const label = [
                                    item.variant.color,
                                    item.variant.size,
                                    item.variant.material,
                                ]
                                    .filter(Boolean)
                                    .join(" / ");

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 py-4"
                                    >
                                        {primary && (
                                            <img
                                                src={primary.url}
                                                alt={item.variant.product.name}
                                                className="h-20 w-20 rounded-sm object-cover"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-stone-900">
                                                {item.variant.product.name}
                                            </p>
                                            {label && (
                                                <p className="text-xs text-stone-500">
                                                    {label}
                                                </p>
                                            )}
                                            <p className="text-xs text-stone-500">
                                                SKU: {item.variant.sku}
                                            </p>
                                        </div>
                                        <div className="flex items-center rounded-sm border border-stone-300">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                className="px-2 py-1 text-stone-600"
                                            >
                                                −
                                            </button>
                                            <span className="w-8 text-center text-sm">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                className="px-2 py-1 text-stone-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="w-24 text-right text-sm font-medium">
                                            {Number(
                                                item.line_total,
                                            ).toLocaleString()}{" "}
                                            FCFA
                                        </p>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-xs text-red-600 underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <Link href="/shop" className="text-sm underline">
                                Continue shopping
                            </Link>
                            <div className="text-right">
                                <p className="text-sm text-stone-500">
                                    Subtotal
                                </p>
                                <p className="text-xl font-semibold">
                                    {Number(cart.subtotal).toLocaleString()}{" "}
                                    FCFA
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="mt-6 block w-full rounded-sm bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white"
                        >
                            Proceed to Checkout
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}
