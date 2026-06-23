import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import saturdayWorkout from "../data/saturdayWorkout";
import ConfirmModal from "../components/common/ConfirmModal";

const HomePage = () => {
  const navigate = useNavigate();

  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [duration, setDuration] = useState(() => {
    const start = Number(localStorage.getItem("workoutStartTime"));

    if (!start) return 0;

    return Math.floor((Date.now() - start) / 1000);
  });
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = Number(localStorage.getItem("workoutStartTime"));

      if (start) {
        setDuration(Math.floor((Date.now() - start) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const started = JSON.parse(localStorage.getItem("isWorkoutStarted"));

    setIsWorkoutStarted(started || false);
  }, []);

  const totalSets = saturdayWorkout.exercises.reduce(
    (total, exercise) => total + exercise.sets.length,
    0,
  );

  const mins = Math.floor(duration / 60);
  const secs = duration % 60;

  const formattedTime = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 pb-32">
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

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="text-2xl text-zinc-500"
            >
              ⋮
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#222] border border-zinc-700 overflow-hidden z-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    setShowClearModal(true);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-800 text-red-400"
                >
                  🗑 Clear Previous Values
                </button>
              </div>
            )}
          </div>

          <ConfirmModal
            isOpen={showClearModal}
            title="Clear Previous Values"
            message="Remove all previous weight and reps history from this routine?"
            confirmText="Clear"
            confirmColor="bg-red-600 hover:bg-red-700"
            onCancel={() => setShowClearModal(false)}
            onConfirm={() => {
              const workout = JSON.parse(localStorage.getItem("workout"));

              workout.exercises.forEach((exercise) => {
                exercise.sets.forEach((set) => {
                  set.previous = "";
                });
              });

              localStorage.setItem("workout", JSON.stringify(workout));

              setShowClearModal(false);

              window.location.reload();
            }}
          />
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

      {isWorkoutStarted && (
        <div className="fixed bottom-5 left-4 right-4 rounded-2xl bg-[#171717] border border-zinc-700 shadow-2xl px-5 py-4 flex items-center justify-between">
          <div
            className="flex-1 cursor-pointer"
            onClick={() => navigate("/workout")}
          >
            <p className="text-green-400 text-sm font-medium">
              ● Workout {formattedTime}
            </p>

            <p className="text-zinc-400 text-sm mt-1">Tap to resume workout</p>
          </div>

          <button
            onClick={() => setShowDiscardModal(true)}
            className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 text-xl hover:bg-red-500/20 transition"
          >
            🗑
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={showDiscardModal}
        title="Discard Workout"
        message="Your current workout progress will be lost."
        confirmText="Discard"
        confirmColor="bg-red-600 hover:bg-red-700"
        onCancel={() => setShowDiscardModal(false)}
        onConfirm={() => {
          localStorage.removeItem("workoutSnapshot");
          localStorage.removeItem("workout");
          localStorage.removeItem("workoutStartTime");
          localStorage.removeItem("isWorkoutStarted");

          setShowDiscardModal(false);
          window.location.reload();
        }}
      />
    </main>
  );
};

export default HomePage;
