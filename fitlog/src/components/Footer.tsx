import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-[rgba(38,43,56,0.6)] bg-[#0b0c10] px-8 py-6">
            <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 sm:flex-row">

                <Link href="/" className="flex items-center gap-2">
                    <svg
                        className="h-5 w-5 text-[#b5f822]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M6 5a1 1 0 0 0-1 1v12a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1zm12 0a1 1 0 0 0-1 1v12a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1zM2 9a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1zm20 0a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1zM7 11h10v2H7z" />
                    </svg>

                    <span className="text-base font-black uppercase tracking-wider text-white">
                        FITLOG
                    </span>
                </Link>

                <p className="text-center text-xs font-normal text-gray-500 sm:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
}