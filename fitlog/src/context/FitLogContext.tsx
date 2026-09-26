"use client";

import { createContext, useContext, useState } from "react";
import { Workout } from "@/types/workout";

interface FitLogContextType {
    plan: Workout[];
    saved: Workout[];
    addToPlan: (workout: Workout) => boolean;
    removeFromPlan: (id: number) => void;
    saveWorkout: (workout: Workout) => boolean;
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
        if (plan.length >= 5) {
            return false;
        }

        const alreadyAdded = plan.some(
            (item) => item.id === workout.id
        );

        if (alreadyAdded) {
            return false;
        }

        const newPlan = [...plan, workout];

        setPlan(newPlan);

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(newPlan)
        );

        return true;
    };

    const removeFromPlan = (id: number) => {
        const newPlan = plan.filter(
            (item) => item.id !== id
        );

        setPlan(newPlan);

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(newPlan)
        );
    };

    const saveWorkout = (workout: Workout) => {
        const alreadySaved = saved.some(
            (item) => item.id === workout.id
        );

        if (alreadySaved) {
            return false;
        }

        const newSaved = [...saved, workout];

        setSaved(newSaved);

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(newSaved)
        );

        return true;
    };

    const removeSaved = (id: number) => {
        const newSaved = saved.filter(
            (item) => item.id !== id
        );

        setSaved(newSaved);

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(newSaved)
        );
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
        throw new Error(
            "useFitLog must be used inside FitLogProvider"
        );
    }

    return context;
};