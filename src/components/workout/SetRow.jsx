const SetRow = ({ set, exercise, workout, setWorkout, startRestTimer }) => {
  const getSetTypeColor = (type) => {
    switch (type) {
      case "W":
        return "text-yellow-400";

      case "F":
        return "text-red-500";

      case "D":
        return "text-orange-400";

      default:
        return "text-white";
    }
  };

  const updateSet = (field, value) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((ex) =>
        ex.id === exercise.id
          ? {
              ...ex,
              sets: ex.sets.map((currentSet) =>
                currentSet.id === set.id
                  ? {
                      ...currentSet,
                      [field]: value,
                    }
                  : currentSet,
              ),
            }
          : ex,
      ),
    });
  };

  const handleComplete = () => {
    updateSet("completed", !set.completed);

    if (!set.completed) {
      startRestTimer(exercise.restTime);
    }
  };

  return (
    <div
      className={`grid grid-cols-5 items-center px-4 py-3 border-b border-zinc-800 transition-all duration-300 ${
        set.completed ? "bg-green-500/15" : ""
      }`}
    >
      {/* Set Type */}

      <div className="flex justify-center">
        <select
          value={set.type}
          onChange={(e) => updateSet("type", e.target.value)}
          className={`bg-transparent outline-none font-semibold ${getSetTypeColor(
            set.type,
          )}`}
        >
          <option value="W" className="text-black">
            W
          </option>

          <option value="1" className="text-black">
            1
          </option>

          <option value="2" className="text-black">
            2
          </option>

          <option value="3" className="text-black">
            3
          </option>

          <option value="4" className="text-black">
            4
          </option>

          <option value="5" className="text-black">
            5
          </option>

          <option value="F" className="text-black">
            F
          </option>

          <option value="D" className="text-black">
            D
          </option>
        </select>
      </div>

      {/* Previous */}

      <div className="text-center text-zinc-500 text-sm">
        {set.previous || "--"}
      </div>

      {/* Weight */}

      <input
        type="number"
        value={set.weight}
        placeholder="0"
        onChange={(e) => updateSet("weight", e.target.value)}
        className="w-14 bg-transparent text-center outline-none"
      />

      {/* Reps */}

      <input
        type="number"
        value={set.reps}
        placeholder="0"
        onChange={(e) => updateSet("reps", e.target.value)}
        className="w-14 bg-transparent text-center outline-none"
      />

      {/* Complete */}

      <div className="flex justify-center">
        <button
          onClick={handleComplete}
          className={`w-9 h-9 rounded-lg transition-all duration-300 ${
            set.completed
              ? "bg-green-500 text-white"
              : "border border-zinc-600 hover:border-green-500"
          }`}
        >
          ✓
        </button>
      </div>
    </div>
  );
};

export default SetRow;
