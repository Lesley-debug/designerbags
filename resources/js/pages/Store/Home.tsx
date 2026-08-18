import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Home" />

            <main className="min-h-screen bg-[#F8F5EF] text-[#171310]">
                <section className="flex min-h-screen items-center justify-center px-6">
                    <div className="text-center">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#B89B6A]">
                            Designer Bags Boutique
                        </p>

                        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
                            Your Signature Style
                        </h1>

                        <p className="mx-auto mt-6 max-w-xl text-lg text-[#252525]/70">
                            Discover elegant, affordable fashion pieces
                            designed to make every look unforgettable.
                        </p>

                        <div className="mt-10 flex justify-center gap-4">
                            <button className="rounded-full bg-[#171310] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#B89B6A]">
                                Shop Collection
                            </button>

                            <button className="rounded-full border border-[#171310]/20 px-7 py-3 text-sm font-medium transition hover:border-[#B89B6A] hover:text-[#B89B6A]">
                                New Arrivals
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
