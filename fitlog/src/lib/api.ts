import { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const getWorkouts = async (): Promise<Workout[]> => {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error("Failed to fetch workouts");
    }

    return res.json();
};

export const getWorkoutById = async (id: string): Promise<Workout> => {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
        throw new Error("Workout not found");
    }

    return res.json();
};