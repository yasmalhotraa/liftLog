import { useNavigate } from "react-router-dom";
import saturdayWorkout from "../data/saturdayWorkout";

const HomePage = () => {
  const navigate = useNavigate();

  const totalSets = saturdayWorkout.exercises.reduce(
    (total, exercise) => total + exercise.sets.length,
    0,
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">🏋️ LiftLog</h1>

        <p className="text-zinc-500 mt-2">
          Track your workouts. Stay consistent.
        </p>
      </div>

      <p className="text-zinc-400 uppercase text-sm tracking-[0.25em]">
        My Routine (1)
      </p>

      <div
        onClick={() => navigate("/workout")}
        className="mt-5 rounded-3xl bg-[#171717] border border-zinc-800 p-6 cursor-pointer active:scale-[0.98] transition"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{saturdayWorkout.name}</h2>

            <div className="flex gap-5 mt-3 text-zinc-400">
              <span>{saturdayWorkout.exercises.length} Exercises</span>
              <span>•</span>
              <span>{totalSets} Sets</span>
            </div>

            <p className="text-sm text-zinc-500 mt-5 line-clamp-2 leading-6">
              {saturdayWorkout.exercises
                .map((exercise) => exercise.name)
                .join(", ")}
            </p>
          </div>

          <button className="text-2xl text-zinc-500">⋮</button>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Saturday Routine</span>

          <span className="text-green-400 font-medium">Ready</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();

            navigate("/workout", {
              state: {
                autoStart: true,
              },
            });
          }}
          className="w-full mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
        >
          Start Routine
        </button>
      </div>
    </main>
  );
};

export default HomePage;
