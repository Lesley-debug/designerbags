import { Link } from "@inertiajs/react";
import type { Product } from "@/types/catalog";

export default function ProductCard({ product }: { product: Product }) {
    const primary =
        product.images.find((i) => i.is_primary) ?? product.images[0];
    const price = product.sale_price ?? product.base_price;
    const inStock = product.variants.some((v) => v.stock_quantity > 0);

    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div className="aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm">
                {primary && (
                    <img
                        src={primary.url}
                        alt={primary.alt_text ?? product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
            </div>
            <div className="mt-3 space-y-1">
                {product.brand && (
                    <p className="text-xs uppercase tracking-wider text-stone-500">
                        {product.brand}
                    </p>
                )}
                <h3 className="text-sm font-medium text-stone-900">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-900">
                        {Number(price).toLocaleString()} FCFA
                    </span>
                    {product.sale_price && (
                        <span className="text-xs text-stone-400 line-through">
                            {Number(product.base_price).toLocaleString()} FCFA
                        </span>
                    )}
                </div>
                {!inStock && (
                    <p className="text-xs text-red-600">Out of stock</p>
                )}
            </div>
        </Link>
    );
}
