import { useEffect, useRef, useState } from "react";
import SetRow from "./SetRow";
import RestTimeModal from "./RestTimeModal";

const formatRestTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ExerciseCard = ({ exercise, workout, setWorkout, startRestTimer }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showRestModal, setShowRestModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateExercise = (updatedExercise) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex,
      ),
    });
  };

  const addSet = () => {
    const lastSet = exercise.sets[exercise.sets.length - 1];

    let nextType = lastSet.type;

    if (!isNaN(lastSet.type)) {
      nextType = String(Number(lastSet.type) + 1);
    }

    const newSet = {
      id: Date.now(),
      type: nextType,
      previous: "",
      weight: "",
      reps: "",
      completed: false,
    };

    updateExercise({
      ...exercise,
      sets: [...exercise.sets, newSet],
    });
  };

  const removeLastSet = () => {
    if (exercise.sets.length <= 1) return;

    updateExercise({
      ...exercise,
      sets: exercise.sets.slice(0, -1),
    });

    setShowMenu(false);
  };

  return (
    <>
      <div className="bg-[#171717] border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-4 pt-4 pb-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{exercise.name}</h2>

              {exercise.superset && (
                <span className="inline-block mt-2 text-xs font-semibold bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                  SUPERSET
                </span>
              )}
            </div>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="text-2xl text-zinc-400 hover:text-white"
              >
                ⋮
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden border border-zinc-700 bg-[#222] shadow-xl z-50">
                  <button
                    onClick={() => {
                      setShowRestModal(true);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-800"
                  >
                    ⏱ Change Rest Timer
                  </button>

                  <button
                    onClick={removeLastSet}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-zinc-800"
                  >
                    ➖ Remove Last Set
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className="text-sm text-zinc-500 mt-3 hover:text-zinc-300"
          >
            {showNotes ? "Hide Notes" : "+ Add Notes"}
          </button>

          {showNotes && (
            <textarea
              value={exercise.notes}
              onChange={(e) =>
                updateExercise({
                  ...exercise,
                  notes: e.target.value,
                })
              }
              placeholder="Today's focus..."
              className="mt-3 w-full min-h-24 rounded-xl bg-zinc-900 border border-zinc-700 p-3 resize-none outline-none focus:border-blue-500"
            />
          )}

          <div className="flex items-center gap-2 mt-4">
            <span>⏱</span>

            <span className="text-blue-500 font-medium">
              Rest Timer • {formatRestTime(exercise.restTime)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 text-xs uppercase text-zinc-400 border-y border-zinc-800 px-4 py-3">
          <span>Set</span>
          <span className="text-center">Prev</span>
          <span className="text-center">Kg</span>
          <span className="text-center">Reps</span>
          <span></span>
        </div>

        {exercise.sets.map((set) => (
          <SetRow
            key={set.id}
            set={set}
            exercise={exercise}
            workout={workout}
            setWorkout={setWorkout}
            startRestTimer={startRestTimer}
          />
        ))}

        <button
          onClick={addSet}
          className="w-full py-4 border-t border-zinc-800 text-blue-500 hover:bg-zinc-900 transition"
        >
          + Add Set
        </button>
      </div>

      <RestTimeModal
        isOpen={showRestModal}
        onClose={() => setShowRestModal(false)}
        exercise={exercise}
        workout={workout}
        setWorkout={setWorkout}
      />
    </>
  );
};

export default ExerciseCard;
