"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useFitLog } from "../../context/FitLogContext";


type SortOption = "duration" | "calories" | "rating";

export default function MyPlan() {
    const {
        plan,
        saved,
        removeFromPlan,
        removeSaved,
    } = useFitLog();

    const searchParams = useSearchParams();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
    const [sortBy, setSortBy] = useState<SortOption>("duration");

    const queryTab = searchParams.get("tab");

    const displayedTab =
        queryTab === "saved"
            ? "saved"
            : queryTab === "plan"
                ? "plan"
                : activeTab;

    const currentWorkouts =
        displayedTab === "plan" ? plan : saved;

    const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
        if (sortBy === "duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "calories") {
            return a.caloriesBurned - b.caloriesBurned;
        }

        return a.rating - b.rating;
    });

    const totalMinutes = currentWorkouts.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = currentWorkouts.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    const handleRemove = (id: number) => {
        if (displayedTab === "plan") {
            removeFromPlan(id);
            toast.success("Workout removed from your plan.");
        } else {
            removeSaved(id);
            toast.success("Workout removed from saved.");
        }
    };

    const handleMarkDone = (id: number) => {
        removeFromPlan(id);
        toast.success("Workout marked as done!");
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#0c0d12] text-white">
            <Navbar />

            <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1100px]">

                    <div className="mb-8">
                        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                            MY PLAN
                        </h1>

                        <p className="mt-1 text-sm text-[#8e95a5]">
                            Cap of five lifts for today. Finish them, then load more.
                        </p>
                    </div>

                    <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-[rgba(38,43,56,0.7)] bg-[#12141c] p-6 sm:grid-cols-3">

                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-medium text-[#8e95a5]">
                                Exercises
                            </span>

                            <span className="text-4xl font-black leading-none text-[#b5f822]">
                                {currentWorkouts.length}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-medium text-[#8e95a5]">
                                Minutes
                            </span>

                            <span className="text-4xl font-black leading-none text-white">
                                {totalMinutes}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-medium text-[#8e95a5]">
                                Calories
                            </span>

                            <span className="text-4xl font-black leading-none text-white">
                                {totalCalories}
                            </span>
                        </div>

                    </div>

                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="inline-flex w-fit gap-1 rounded-xl border border-[rgba(38,43,56,0.7)] bg-[#12141c] p-1">

                            <button
                                type="button"
                                onClick={() => router.push("/my-plan")}
                                className={`rounded-lg px-5 py-2 text-xs font-semibold transition ${displayedTab === "plan"
                                    ? "bg-[#202634] text-white"
                                    : "text-[#8e95a5] hover:text-white"
                                    }`}
                            >
                                Today&apos;s Plan
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push("/my-plan?tab=saved")}
                                className={`rounded-lg px-5 py-2 text-xs font-semibold transition ${displayedTab === "saved"
                                    ? "bg-[#202634] text-white"
                                    : "text-[#8e95a5] hover:text-white"
                                    }`}
                            >
                                Saved
                            </button>

                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#8e95a5]">
                            <span>Sort By</span>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(event) =>
                                        setSortBy(
                                            event.target.value as SortOption
                                        )
                                    }
                                    className="appearance-none rounded-lg border border-[rgba(38,43,56,0.7)] bg-[#12141c] px-3 py-2 pr-8 text-xs text-white outline-none"
                                >
                                    <option value="duration">
                                        Duration
                                    </option>

                                    <option value="calories">
                                        Calories
                                    </option>

                                    <option value="rating">
                                        Rating
                                    </option>
                                </select>

                                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8e95a5]">
                                    ⌄
                                </span>
                            </div>
                        </div>

                    </div>

                    {sortedWorkouts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[rgba(38,43,56,0.8)] px-6 py-20 text-center">

                            <h2 className="text-2xl font-black uppercase tracking-tight">
                                NOTHING HERE YET
                            </h2>

                            <p className="mt-2 max-w-md text-sm text-[#8e95a5]">
                                Browse the library and add a lift to get today moving.
                            </p>

                            <Link
                                href="/#library"
                                className="mt-6 rounded-xl bg-[#b5f822] px-5 py-2.5 text-xs font-extrabold text-black transition hover:bg-[#9ee210]"
                            >
                                Go to workouts
                            </Link>

                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">

                            {sortedWorkouts.map((workout) => (
                                <div
                                    key={workout.id}
                                    className="flex flex-col gap-5 rounded-2xl border border-[rgba(38,43,56,0.7)] bg-[#12141c] p-5 sm:p-6 md:flex-row md:items-center md:justify-between"
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="relative h-[70px] w-[110px] shrink-0 overflow-hidden rounded-xl bg-[#0c0d12]">
                                            <Image
                                                src={workout.image}
                                                alt={workout.name}
                                                fill
                                                sizes="110px"
                                                className="object-cover"
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-black uppercase tracking-tight">
                                                {workout.name}
                                            </h3>

                                            <p className="mt-0.5 text-xs text-[#8e95a5]">
                                                {workout.equipment}
                                            </p>

                                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">

                                                <span className="text-[#b5f822]">
                                                    ◷ {workout.duration} min
                                                </span>

                                                <span className="text-[#b5f822]">
                                                    🔥 {workout.caloriesBurned} kcal
                                                </span>

                                                <span className="text-white">
                                                    ★ {workout.rating}
                                                </span>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto">

                                        <Link
                                            href={`/workout/${workout.id}`}
                                            className="rounded-full border border-white/15 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-[#161922]"
                                        >
                                            View Details
                                        </Link>

                                        {displayedTab === "plan" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleMarkDone(workout.id)
                                                }
                                                className="rounded-full bg-[#b5f822] px-4 py-2 text-xs font-extrabold text-black transition hover:bg-[#9ee210]"
                                            >
                                                ✓ Mark as Done
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(workout.id)
                                            }
                                            className="rounded-md px-2 py-2 text-lg text-gray-500 transition hover:text-white"
                                            aria-label="Remove item"
                                        >
                                            ×
                                        </button>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}