import { useEffect, useState } from "react";

const RestTimeModal = ({ isOpen, onClose, exercise, workout, setWorkout }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (exercise) {
      setMinutes(Math.floor(exercise.restTime / 60));
      setSeconds(exercise.restTime % 60);
    }
  }, [exercise]);

  if (!isOpen || !exercise) return null;

  const saveRestTime = () => {
    const totalSeconds = Number(minutes) * 60 + Number(seconds);

    setWorkout({
      ...workout,
      exercises: workout.exercises.map((ex) =>
        ex.id === exercise.id
          ? {
              ...ex,
              restTime: totalSeconds,
            }
          : ex,
      ),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-80 rounded-2xl border border-zinc-700 bg-[#171717] p-6">
        <h2 className="text-xl font-bold">Change Rest Timer</h2>

        <div className="mt-6 flex gap-4">
          <div className="flex-1">
            <p className="mb-2 text-sm text-zinc-500">Minutes</p>

            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 text-center outline-none"
            />
          </div>

          <div className="flex-1">
            <p className="mb-2 text-sm text-zinc-500">Seconds</p>

            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 text-center outline-none"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-zinc-700 px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={saveRestTime}
            className="rounded-xl bg-blue-600 px-5 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestTimeModal;
