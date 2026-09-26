import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WorkoutLibrary from "../components/WorkoutLibrary";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0f14] text-white">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">

          <Hero />

          <WorkoutLibrary />

        </div>
      </main>

      <Footer />
    </div>
  );
}