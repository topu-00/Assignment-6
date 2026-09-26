
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0b0c10] px-4 text-white">
            <div className="w-full max-w-lg rounded-3xl border border-[#262b38] bg-[#12141c] p-8 text-center sm:p-12">

                <p className="text-sm font-black tracking-[0.25em] text-[#b5f822]">
                    FITLOG
                </p>

                <h1 className="mt-5 text-7xl font-black text-white sm:text-8xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-black uppercase">
                    Workout Not Found
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#8e95a5]">
                    The workout or page you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-7 inline-flex rounded-xl bg-[#b5f822] px-6 py-3 text-sm font-black text-black transition hover:bg-[#9ee210]"
                >
                    Back to Workouts
                </Link>

            </div>
        </main>
    );
}
