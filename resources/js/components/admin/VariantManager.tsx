import { router, useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import type { ProductVariant } from "@/types/catalog";

export default function VariantManager({
    productId,
    variants,
}: {
    productId: number;
    variants: ProductVariant[];
}) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        color: "",
        size: "",
        material: "",
        sku: "",
        stock_quantity: 0,
        price_override: "",
    });

    function startAdd() {
        setEditingId(-1); // -1 = "adding new"
        reset();
    }

    function startEdit(v: ProductVariant) {
        setEditingId(v.id);
        setData({
            color: v.color ?? "",
            size: v.size ?? "",
            material: v.material ?? "",
            sku: v.sku,
            stock_quantity: v.stock_quantity,
            price_override: "",
        });
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        if (editingId === -1) {
            post(`/admin/products/${productId}/variants`, {
                onSuccess: () => setEditingId(null),
            });
        } else if (editingId !== null) {
            put(`/admin/products/${productId}/variants/${editingId}`, {
                onSuccess: () => setEditingId(null),
            });
        }
    }

    function destroy(id: number) {
        if (confirm("Remove this variant?")) {
            router.delete(`/admin/products/${productId}/variants/${id}`);
        }
    }

    return (
        <div className="mt-8 border-t border-stone-200 pt-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                    Variants
                </h2>
                {editingId === null && (
                    <button
                        type="button"
                        onClick={startAdd}
                        className="rounded-sm border border-stone-300 px-3 py-1.5 text-xs"
                    >
                        + Add Variant
                    </button>
                )}
            </div>

            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-stone-200 text-stone-500">
                        <th className="py-2">Color</th>
                        <th>Size</th>
                        <th>Material</th>
                        <th>SKU</th>
                        <th>Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {variants.map((v) => (
                        <tr key={v.id} className="border-b border-stone-100">
                            <td className="py-2">{v.color ?? "—"}</td>
                            <td>{v.size ?? "—"}</td>
                            <td>{v.material ?? "—"}</td>
                            <td>{v.sku}</td>
                            <td>{v.stock_quantity}</td>
                            <td className="space-x-3 text-right">
                                <button
                                    type="button"
                                    onClick={() => startEdit(v)}
                                    className="text-stone-600 underline"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => destroy(v.id)}
                                    className="text-red-600 underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingId !== null && (
                <form
                    onSubmit={submit}
                    className="mt-4 grid grid-cols-2 gap-3 rounded-sm border border-stone-200 p-4"
                >
                    <div>
                        <label className="mb-1 block text-xs font-medium">
                            Color
                        </label>
                        <input
                            value={data.color}
                            onChange={(e) => setData("color", e.target.value)}
                            className="w-full rounded-sm border border-stone-300 px-2 py-1.5 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium">
                            Size
                        </label>
                        <input
                            value={data.size}
                            onChange={(e) => setData("size", e.target.value)}
                            className="w-full rounded-sm border border-stone-300 px-2 py-1.5 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium">
                            Material
                        </label>
                        <input
                            value={data.material}
                            onChange={(e) =>
                                setData("material", e.target.value)
                            }
                            className="w-full rounded-sm border border-stone-300 px-2 py-1.5 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium">
                            SKU *
                        </label>
                        <input
                            value={data.sku}
                            onChange={(e) => setData("sku", e.target.value)}
                            className="w-full rounded-sm border border-stone-300 px-2 py-1.5 text-sm"
                        />
                        {errors.sku && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.sku}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium">
                            Stock Quantity *
                        </label>
                        <input
                            type="number"
                            value={data.stock_quantity}
                            onChange={(e) =>
                                setData(
                                    "stock_quantity",
                                    Number(e.target.value),
                                )
                            }
                            className="w-full rounded-sm border border-stone-300 px-2 py-1.5 text-sm"
                        />
                        {errors.stock_quantity && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.stock_quantity}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium">
                            Price Override (optional)
                        </label>
                        <input
                            type="number"
                            value={data.price_override}
                            onChange={(e) =>
                                setData("price_override", e.target.value)
                            }
                            className="w-full rounded-sm border border-stone-300 px-2 py-1.5 text-sm"
                        />
                    </div>

                    <div className="col-span-2 flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-sm bg-stone-900 px-4 py-1.5 text-xs text-white disabled:opacity-50"
                        >
                            Save Variant
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="rounded-sm border border-stone-300 px-4 py-1.5 text-xs"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
