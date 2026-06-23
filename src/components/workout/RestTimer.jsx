const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const RestTimer = ({ restTimer, setRestTimer }) => {
  if (!restTimer.isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#171717] border-t border-zinc-700 rounded-t-3xl px-6 py-3 shadow-2xl">
      <p className="text-center text-zinc-400 text-sm mb-2">Rest Timer</p>

      <h1 className="text-6xl font-bold text-center text-white">
        {formatTime(restTimer.seconds)}
      </h1>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() =>
            setRestTimer((prev) => ({
              ...prev,
              seconds: Math.max(prev.seconds - 15, 0),
            }))
          }
          className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700"
        >
          -15s
        </button>

        <button
          onClick={() =>
            setRestTimer((prev) => ({
              ...prev,
              seconds: prev.seconds + 15,
            }))
          }
          className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700"
        >
          +15s
        </button>
      </div>

      <button
        onClick={() =>
          setRestTimer({
            isOpen: false,
            seconds: 0,
          })
        }
        className="w-full mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
      >
        Skip
      </button>
    </div>
  );
};

export default RestTimer;
