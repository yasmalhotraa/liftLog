const WorkoutHeader = ({
  workout,
  duration,
  isWorkoutStarted,
  startWorkout,
  finishWorkout,
}) => {
  const completedSets = workout.exercises.reduce((total, exercise) => {
    return total + exercise.sets.filter((set) => set.completed).length;
  }, 0);

  const volume = workout.exercises.reduce((total, exercise) => {
    return (
      total +
      exercise.sets.reduce((exerciseTotal, set) => {
        const weight = Number(set.weight) || 0;
        const reps = Number(set.reps) || 0;

        return exerciseTotal + weight * reps;
      }, 0)
    );
  }, 0);

  const mins = Math.floor(duration / 60);
  const secs = duration % 60;

  const formattedTime = `${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">{workout.name}</h1>

      {!isWorkoutStarted ? (
        <button
          onClick={startWorkout}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
        >
          Start Workout
        </button>
      ) : (
        <button
          onClick={finishWorkout}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold transition"
        >
          Finish Workout
        </button>
      )}

      <div className="grid grid-cols-3 mt-8">
        <div>
          <p className="text-blue-500 text-3xl font-semibold font-mono">
            {formattedTime}
          </p>

          <p className="text-zinc-500 text-sm mt-1">Duration</p>
        </div>

        <div>
          <p className="text-3xl font-semibold">{volume} kg</p>

          <p className="text-zinc-500 text-sm mt-1">Volume</p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-semibold">{completedSets}</p>

          <p className="text-zinc-500 text-sm mt-1">Sets</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHeader;
