"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getWorkoutById } from "../../../lib/api";
import { useFitLog } from "../../../context/FitLogContext";
import { Workout } from "../../../types/workout";

export default function WorkoutDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { addToPlan, saveWorkout, plan, saved } = useFitLog();

    const [workout, setWorkout] = useState<Workout | null>(null);

    useEffect(() => {
        const loadWorkout = async () => {
            const { id } = await params;
            const data = await getWorkoutById(id);
            setWorkout(data);
        };

        loadWorkout();
    }, [params]);

    if (!workout) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0b0c10] text-white">
                Loading...
            </div>
        );
    }

    const isInPlan = plan.some((item) => item.id === workout.id);
    const isSaved = saved.some((item) => item.id === workout.id);

    const handleAddToPlan = () => {
        const added = addToPlan(workout);

        if (added) {
            toast.success("Workout added to today's plan!");
        } else if (isInPlan) {
            toast.error("Workout is already in your plan.");
        } else {
            toast.error("Your plan can have maximum 5 workouts.");
        }
    };

    const handleSave = () => {
        const savedSuccessfully = saveWorkout(workout);

        if (savedSuccessfully) {
            toast.success("Workout saved for later!");
        } else {
            toast.error("Workout is already saved.");
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#0b0c10] text-white">

            <Navbar />

            <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1200px]">

                    <div className="grid gap-8 rounded-3xl border border-[rgba(38,43,56,0.7)] bg-[#12141c] p-6 lg:grid-cols-2 lg:p-10">

                        <div className="aspect-square overflow-hidden rounded-2xl border-2 border-[#38bdf8] bg-[#0d0f14]">
                            <Image
                                src={workout.image}
                                alt={workout.name}
                                width={700}
                                height={700}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div>

                            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                                {workout.name}
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-[#8e95a5]">
                                {workout.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {workout.muscleGroups.map((group) => (
                                    <span
                                        key={group}
                                        className="rounded-full bg-[#b5f822] px-3 py-1 text-[11px] font-extrabold text-black"
                                    >
                                        {group}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-[#161922] p-4 sm:p-5">

                                <div className="flex items-center justify-between border-b border-[rgba(38,43,56,0.5)] pb-2 text-xs">
                                    <span className="font-semibold text-[#8e95a5]">
                                        EQUIPMENT
                                    </span>
                                    <span className="font-semibold text-white">
                                        {workout.equipment}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-[rgba(38,43,56,0.5)] pb-2 text-xs">
                                    <span className="font-semibold text-[#8e95a5]">
                                        DIFFICULTY
                                    </span>
                                    <span className="font-semibold text-white">
                                        {workout.difficulty}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-[rgba(38,43,56,0.5)] pb-2 text-xs">
                                    <span className="font-semibold text-[#8e95a5]">
                                        SETS
                                    </span>
                                    <span className="font-semibold text-white">
                                        {workout.sets}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-[rgba(38,43,56,0.5)] pb-2 text-xs">
                                    <span className="font-semibold text-[#8e95a5]">
                                        REPS
                                    </span>
                                    <span className="font-semibold text-white">
                                        {workout.reps}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-[rgba(38,43,56,0.5)] pb-2 text-xs">
                                    <span className="font-semibold text-[#8e95a5]">
                                        DURATION
                                    </span>
                                    <span className="font-semibold text-white">
                                        {workout.duration} min
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-[rgba(38,43,56,0.5)] pb-2 text-xs">
                                    <span className="font-semibold text-[#8e95a5]">
                                        CALORIES
                                    </span>
                                    <span className="font-semibold text-white">
                                        {workout.caloriesBurned} kcal
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-[#8e95a5]">
                                        RATING
                                    </span>
                                    <span className="font-semibold text-white">
                                        {workout.rating}
                                    </span>
                                </div>

                            </div>

                            <div className="mt-8">

                                <h2 className="mb-3 text-sm font-black tracking-wider">
                                    INSTRUCTIONS
                                </h2>

                                <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-6 text-[#8e95a5]">
                                    {workout.instructions.map((instruction, index) => (
                                        <li key={index}>
                                            {instruction}
                                        </li>
                                    ))}
                                </ol>

                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">

                                <button
                                    type="button"
                                    onClick={handleAddToPlan}
                                    className="rounded-xl bg-[#b5f822] px-5 py-3 text-xs font-extrabold text-black transition hover:bg-[#9ee210]"
                                >
                                    {isInPlan
                                        ? "✓ Added to plan"
                                        : "+ Add to today's plan"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="rounded-xl border border-[rgba(38,43,56,0.8)] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#161922]"
                                >
                                    {isSaved
                                        ? "✓ Saved"
                                        : "♡ Save for later"}
                                </button>

                            </div>

                        </div>
                    </div>

                </div>
            </main>

            <Footer />

        </div>
    );
}