import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post("/register");
    }

    return (
        <>
            <Head title="Register" />
            <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
                <h1 className="mb-6 text-xl font-semibold text-stone-900">
                    Create an account
                </h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Name
                        </label>
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full rounded-sm border border-stone-300 px-3 py-2 text-sm"
                            autoFocus
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full rounded-sm border border-stone-300 px-3 py-2 text-sm"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full rounded-sm border border-stone-300 px-3 py-2 text-sm"
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full rounded-sm border border-stone-300 px-3 py-2 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-sm bg-stone-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-sm text-stone-600">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Log in
                    </Link>
                </p>
            </div>
        </>
    );
}
