
"use client";

import Image from "next/image";
import Link from "next/link";
import banner from "../assets/banner.png";
import { useFitLog } from "../context/FitLogContext";

export default function Hero() {
    const { plan, saved } = useFitLog();

    return (
        <section className="mb-10 overflow-hidden rounded-3xl border border-[#262b38]/60 bg-gradient-to-r from-[#141720] via-[#161923] to-[#12141c] sm:mb-12">
            <div className="grid items-center lg:grid-cols-2">

                <div className="px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-12 lg:py-14 lg:text-left">

                    <div className="mb-4 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] text-[#b5f822] lg:justify-start">
                        <span className="h-2 w-2 rounded-full bg-[#b5f822]" />
                        WORKOUT LIBRARY
                    </div>

                    <h1 className="text-3xl font-black leading-[1.05] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        TRAIN WITH INTENT.
                        <br />
                        <span className="text-[#8e95a5]">
                            LOG EVERY SET.
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#8e95a5] sm:text-base lg:mx-0">
                        FitLog is a dark, no-nonsense gym companion: pick a lift,
                        lock it into today's plan, and watch the week's work add up.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">

                        <Link
                            href="#library"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#b5f822] px-5 py-3 text-xs font-extrabold text-black transition hover:bg-[#9ee210] sm:px-6 sm:py-3.5 sm:text-sm"
                        >
                            BROWSE WORKOUTS
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            href="/my-plan"
                            className="inline-flex items-center gap-2 rounded-xl border border-[#262b38] bg-[#12141c] px-4 py-3 text-xs font-bold text-white transition hover:border-[#b5f822] sm:px-5 sm:py-3.5"
                        >
                            Today's Plan
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b5f822] px-1 text-[10px] font-black text-black">
                                {plan.length}
                            </span>
                        </Link>

                        <Link
                            href="/my-plan?tab=saved"
                            className="inline-flex items-center gap-2 rounded-xl border border-[#262b38] bg-[#12141c] px-4 py-3 text-xs font-bold text-white transition hover:border-[#b5f822] sm:px-5 sm:py-3.5"
                        >
                            Saved
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#b5f822] px-1 text-[10px] font-black text-[#b5f822]">
                                {saved.length}
                            </span>
                        </Link>

                    </div>

                </div>

                <div className="flex items-center justify-center px-5 pb-7 sm:px-8 sm:pb-10 lg:px-6 lg:py-8">
                    <Image
                        src={banner}
                        alt="FitLog workout banner"
                        priority
                        className="h-auto w-full max-w-lg object-contain"
                    />
                </div>

            </div>
        </section>
    );
}

