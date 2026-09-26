"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WorkoutCard from "./WorkoutCard";
import { getWorkouts } from "../lib/api";
import { Workout } from "../types/workout";

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState<SortOption>("duration");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWorkouts = async () => {
            const data = await getWorkouts();
            setWorkouts(data);
            setLoading(false);
        };

        loadWorkouts();
    }, []);

    const categories = [
        "All",
        ...Array.from(
            new Set(
                workouts.flatMap((workout) => workout.muscleGroups)
            )
        ),
    ];

    const filteredWorkouts =
        category === "All"
            ? workouts
            : workouts.filter((workout) =>
                workout.muscleGroups.includes(category)
            );

    const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
        if (sortBy === "duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "calories") {
            return a.caloriesBurned - b.caloriesBurned;
        }

        return a.rating - b.rating;
    });

    return (
        <section
            id="library"
            className="scroll-mt-24"
        >
            <div className="mb-6">
                <h2 className="text-[1.75rem] font-black uppercase tracking-tight">
                    THE LIBRARY
                </h2>

                <p className="mt-1 text-sm text-[#8e95a5]">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {loading ? (
                <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#262b38] bg-[#12141c]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#262b38] border-t-[#b5f822]" />

                        <p className="text-sm font-semibold text-[#8e95a5]">
                            Loading workouts...
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex flex-wrap gap-2">
                            {categories.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setCategory(item)}
                                    className={`rounded-full px-4 py-2 text-xs font-bold transition ${category === item
                                        ? "bg-[#b5f822] text-black"
                                        : "border border-[#262b38] bg-[#12141c] text-[#8e95a5] hover:text-white"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#8e95a5]">
                            <span>Sort By</span>

                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value as SortOption)
                                }
                                className="rounded-lg border border-[#262b38] bg-[#12141c] px-3 py-2 text-white outline-none"
                            >
                                <option value="duration">Duration</option>
                                <option value="calories">Calories</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>

                    {sortedWorkouts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-[#262b38] px-6 py-16 text-center">
                            <h3 className="text-xl font-black uppercase">
                                No workouts found
                            </h3>

                            <p className="mt-2 text-sm text-[#8e95a5]">
                                Try another category.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {sortedWorkouts.map((workout) => (
                                <WorkoutCard
                                    key={workout.id}
                                    workout={workout}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}