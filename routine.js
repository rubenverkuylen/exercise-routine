// Marks an exercise as done when clicked, and resets all when the reset button is clicked.
// On mobile, tapping an exercise also jumps down so the next exercise's top
// lands just below the sticky header (handled via CSS scroll-margin-top).

// Keep this in sync with the media query breakpoint in the <style> block.
const MOBILE_BREAKPOINT_QUERY = "(max-width: 500px)";

function isMobile() {
  return window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
}

function jumpToNextExercise(allExercises, currentExercise) {
  if (!isMobile()) return;

  const currentIndex = allExercises.indexOf(currentExercise);
  const nextExercise = allExercises[currentIndex + 1];
  if (!nextExercise) return;

  // scroll-margin-top on .exercise (set in CSS, mobile only) makes this
  // land just below the sticky header automatically.
  nextExercise.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", () => {
  const exercises = Array.from(document.querySelectorAll(".exercise"));
  const resetButton = document.getElementById("reset-button");

  exercises.forEach((exercise) => {
    // Make each exercise div behave like a button for accessibility.
    exercise.setAttribute("role", "button");
    exercise.setAttribute("tabindex", "0");

    exercise.addEventListener("click", () => {
      exercise.classList.toggle("completed");
      jumpToNextExercise(exercises, exercise);
    });

    // Allow toggling with keyboard (Enter or Space), since these are divs, not real buttons.
    exercise.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        exercise.classList.toggle("completed");
        jumpToNextExercise(exercises, exercise);
      }
    });
  });

  resetButton.addEventListener("click", () => {
    exercises.forEach((exercise) => {
      exercise.classList.remove("completed");
    });
  });
});
