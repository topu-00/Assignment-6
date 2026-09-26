"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "../context/FitLogContext";
import logo from "../assets/logo.png";

export default function Navbar() {
    const { plan, saved } = useFitLog();
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-[#262b38]/40 bg-[#0c0e12]/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">

                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2"
                >
                    <Image
                        src={logo}
                        alt="FitLog logo"
                        width={32}
                        height={32}
                        className="h-7 w-7 sm:h-8 sm:w-8"
                    />

                    <span className="text-lg font-extrabold tracking-wider text-white sm:text-xl">
                        FIT<span className="text-[#b5f822]">LOG</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 rounded-full border border-[#262b38]/50 bg-[#14171f] p-1.5 md:flex">
                    <Link
                        href="/"
                        className={`rounded-full px-4 py-1.5 text-xs font-bold transition lg:px-5 ${pathname === "/"
                            ? "bg-[#b5f822] text-black"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition lg:px-5 ${pathname === "/my-plan"
                            ? "bg-[#b5f822] text-black"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        My Plan
                    </Link>
                </nav>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1 rounded-full border border-[#262b38]/60 bg-[#161922] px-2.5 py-1.5 text-[11px] text-gray-300 sm:px-3 sm:text-xs"
                    >
                        <span>Plan</span>

                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#b5f822] text-[10px] font-bold text-black">
                            {plan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan?tab=saved"
                        className="flex items-center gap-1 rounded-full border border-[#262b38]/60 bg-[#161922] px-2.5 py-1.5 text-[11px] text-gray-300 sm:px-3 sm:text-xs"
                    >
                        <span>Saved</span>

                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-[10px] font-bold text-gray-300">
                            {saved.length}
                        </span>
                    </Link>
                </div>

            </div>
        </header>
    );
}