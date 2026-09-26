export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0b0c10]">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#262b38] border-t-[#b5f822]" />

                <p className="text-sm font-semibold text-[#8e95a5]">
                    Loading workouts...
                </p>
            </div>
        </div>
    );
}
