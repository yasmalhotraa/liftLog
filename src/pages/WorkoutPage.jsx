import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import saturdayWorkout from "../data/saturdayWorkout";

import WorkoutHeader from "../components/workout/WorkoutHeader";
import ExerciseCard from "../components/workout/ExerciseCard";
import RestTimer from "../components/workout/RestTimer";
import ConfirmModal from "../components/common/ConfirmModal";

const WorkoutPage = () => {
  const location = useLocation();
  const [workout, setWorkout] = useState(() => {
    const savedWorkout = localStorage.getItem("workout");
    return savedWorkout ? JSON.parse(savedWorkout) : saturdayWorkout;
  });

  const [isWorkoutStarted, setIsWorkoutStarted] = useState(() => {
    const saved = localStorage.getItem("isWorkoutStarted");
    return saved ? JSON.parse(saved) : false;
  });

  const [duration, setDuration] = useState(() => {
    const saved = localStorage.getItem("duration");
    return saved ? JSON.parse(saved) : 0;
  });

  const [restTimer, setRestTimer] = useState({
    isOpen: false,
    seconds: 0,
  });

  const [showStartModal, setShowStartModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("workout", JSON.stringify(workout));
  }, [workout]);

  useEffect(() => {
    localStorage.setItem("isWorkoutStarted", JSON.stringify(isWorkoutStarted));
  }, [isWorkoutStarted]);

  useEffect(() => {
    localStorage.setItem("duration", JSON.stringify(duration));
  }, [duration]);

  useEffect(() => {
    if (location.state?.autoStart && !isWorkoutStarted) {
      setIsWorkoutStarted(true);
    }
  }, []);

  useEffect(() => {
    if (!isWorkoutStarted) return;

    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isWorkoutStarted]);

  useEffect(() => {
    if (!restTimer.isOpen) return;

    if (restTimer.seconds <= 0) {
      setRestTimer({
        isOpen: false,
        seconds: 0,
      });
      return;
    }

    const interval = setInterval(() => {
      setRestTimer((prev) => ({
        ...prev,
        seconds: prev.seconds - 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [restTimer]);

  const startRestTimer = (seconds) => {
    setRestTimer({
      isOpen: true,
      seconds,
    });
  };

  const finishWorkout = () => {
    const finishedWorkout = structuredClone(workout);

    finishedWorkout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        set.previous =
          set.weight && set.reps ? `${set.weight} × ${set.reps}` : "";

        set.weight = "";
        set.reps = "";
        set.completed = false;
      });
    });

    setWorkout(finishedWorkout);

    setDuration(0);
    setIsWorkoutStarted(false);

    localStorage.setItem("lastWorkout", JSON.stringify(finishedWorkout));

    setShowFinishModal(false);
    window.history.replaceState({}, "");
  };

  return (
    <>
      <main className="min-h-screen bg-black text-white px-3 py-4 pb-44">
        <button
          onClick={() => window.history.back()}
          className="mb-5 text-blue-500"
        >
          ← Back
        </button>
        <WorkoutHeader
          workout={workout}
          duration={duration}
          isWorkoutStarted={isWorkoutStarted}
          startWorkout={() => setShowStartModal(true)}
          finishWorkout={() => setShowFinishModal(true)}
        />

        <section className="mt-6 space-y-5">
          {workout.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              workout={workout}
              setWorkout={setWorkout}
              startRestTimer={startRestTimer}
            />
          ))}
        </section>

        <RestTimer restTimer={restTimer} setRestTimer={setRestTimer} />
      </main>

      <ConfirmModal
        isOpen={showStartModal}
        title="Start Workout"
        message={`Ready to begin "${workout.name}"?`}
        confirmText="Start"
        confirmColor="bg-blue-600 hover:bg-blue-700"
        onCancel={() => setShowStartModal(false)}
        onConfirm={() => {
          setIsWorkoutStarted(true);
          setShowStartModal(false);
        }}
      />

      <ConfirmModal
        isOpen={showFinishModal}
        title="Finish Workout"
        message="This will save today's workout, update your previous values and reset the current workout."
        confirmText="Finish"
        confirmColor="bg-red-600 hover:bg-red-700"
        onCancel={() => setShowFinishModal(false)}
        onConfirm={finishWorkout}
      />
    </>
  );
};

export default WorkoutPage;
