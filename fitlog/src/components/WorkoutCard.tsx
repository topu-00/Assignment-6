import Image from "next/image";
import Link from "next/link";
import { Workout } from "../types/workout";

interface WorkoutCardProps {
    workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
    return (
        <Link href={`/workout/${workout.id}`} className="block">
            <div className="group cursor-pointer overflow-hidden rounded-2xl border border-[rgba(38,43,56,0.7)] bg-[#161922] transition duration-200 hover:-translate-y-0.5 hover:border-[#383f52]">

                <div className="aspect-[16/9] w-full overflow-hidden bg-[#0d0f14]">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        width={600}
                        height={338}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                </div>

                <div className="p-5">

                    <div className="mb-3 flex flex-wrap gap-1.5">
                        {workout.muscleGroups.map((group) => (
                            <span
                                key={group}
                                className="rounded-full bg-[#b5f822] px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-black"
                            >
                                {group}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-[15px] font-black uppercase tracking-tight text-white">
                        {workout.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-[#8e95a5]">
                        {workout.equipment}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-[rgba(38,43,56,0.5)] pt-3 text-xs text-[#8e95a5]">

                        <span>{workout.duration} min</span>

                        <span>{workout.caloriesBurned} kcal</span>

                        <span className="font-semibold text-white">
                            ⭐ {workout.rating}
                        </span>

                    </div>
                </div>
            </div>
        </Link>
    );
}