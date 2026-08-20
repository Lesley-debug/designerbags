import { router, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import type { ProductImage } from "@/types/catalog";

export default function ImageManager({
    productId,
    images,
}: {
    productId: number;
    images: ProductImage[];
}) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        images: File[];
    }>({
        images: [],
    });

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setData("images", Array.from(e.target.files));
        }
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        post(`/admin/products/${productId}/images`, {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    }

    function setPrimary(imageId: number) {
        router.patch(`/admin/products/${productId}/images/${imageId}/primary`);
    }

    function destroy(imageId: number) {
        if (confirm("Delete this image?")) {
            router.delete(`/admin/products/${productId}/images/${imageId}`);
        }
    }

    function move(index: number, direction: -1 | 1) {
        const newOrder = [...images];
        const target = index + direction;
        if (target < 0 || target >= newOrder.length) return;
        [newOrder[index], newOrder[target]] = [
            newOrder[target],
            newOrder[index],
        ];
        router.post(`/admin/products/${productId}/images/reorder`, {
            order: newOrder.map((img) => img.id),
        });
    }

    return (
        <div className="mt-8 border-t border-stone-200 pt-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">
                Images
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {images.map((img, i) => (
                    <div
                        key={img.id}
                        className="relative rounded-sm border border-stone-200 p-2"
                    >
                        <img
                            src={img.url}
                            alt={img.alt_text ?? ""}
                            className="aspect-square w-full rounded-sm object-cover"
                        />
                        {img.is_primary && (
                            <span className="absolute left-3 top-3 rounded-sm bg-stone-900 px-1.5 py-0.5 text-[10px] text-white">
                                Primary
                            </span>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1 text-xs">
                            {!img.is_primary && (
                                <button
                                    type="button"
                                    onClick={() => setPrimary(img.id)}
                                    className="text-stone-600 underline"
                                >
                                    Set primary
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => move(i, -1)}
                                className="text-stone-600 underline"
                            >
                                ↑
                            </button>
                            <button
                                type="button"
                                onClick={() => move(i, 1)}
                                className="text-stone-600 underline"
                            >
                                ↓
                            </button>
                            <button
                                type="button"
                                onClick={() => destroy(img.id)}
                                className="text-red-600 underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={submit} className="mt-4">
                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={handleFileChange}
                    className="block text-sm"
                />
                {errors.images && (
                    <p className="mt-1 text-xs text-red-600">{errors.images}</p>
                )}
                <button
                    type="submit"
                    disabled={processing || data.images.length === 0}
                    className="mt-2 rounded-sm bg-stone-900 px-4 py-1.5 text-xs text-white disabled:opacity-50"
                >
                    Upload{" "}
                    {data.images.length > 0 ? `(${data.images.length})` : ""}
                </button>
            </form>
        </div>
    );
}
