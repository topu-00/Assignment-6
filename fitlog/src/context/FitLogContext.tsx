"use client";

import { createContext, useContext, useState } from "react";
import { Workout } from "@/types/workout";

interface FitLogContextType {
    plan: Workout[];
    saved: Workout[];
    addToPlan: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    saveWorkout: (workout: Workout) => void;
    removeSaved: (id: number) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export const FitLogProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);

    const addToPlan = (workout: Workout) => {
        if (plan.length >= 5) return;

        const alreadyAdded = plan.some((item) => item.id === workout.id);

        if (!alreadyAdded) {
            setPlan([...plan, workout]);
        }
    };

    const removeFromPlan = (id: number) => {
        setPlan(plan.filter((item) => item.id !== id));
    };

    const saveWorkout = (workout: Workout) => {
        const alreadySaved = saved.some((item) => item.id === workout.id);

        if (!alreadySaved) {
            setSaved([...saved, workout]);
        }
    };

    const removeSaved = (id: number) => {
        setSaved(saved.filter((item) => item.id !== id));
    };

    return (
        <FitLogContext.Provider
            value={{
                plan,
                saved,
                addToPlan,
                removeFromPlan,
                saveWorkout,
                removeSaved,
            }}
        >
            {children}
        </FitLogContext.Provider>
    );
};

export const useFitLog = () => {
    const context = useContext(FitLogContext);

    if (!context) {
        throw new Error("useFitLog must be used inside FitLogProvider");
    }

    return context;
};