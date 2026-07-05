document.addEventListener("DOMContentLoaded", () => {
  const exercises = document.querySelectorAll(".exercise");
  const resetButton = document.getElementById("reset-button");

  exercises.forEach((exercise) => {
    // Make each exercise div behave like a button for accessibility.
    exercise.setAttribute("role", "button");
    exercise.setAttribute("tabindex", "0");

    exercise.addEventListener("click", () => {
      exercise.classList.toggle("completed");
    });

    // Allow toggling with keyboard (Enter or Space), since these are divs, not real buttons.
    exercise.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        exercise.classList.toggle("completed");
      }
    });
  });

  resetButton.addEventListener("click", () => {
    exercises.forEach((exercise) => {
      exercise.classList.remove("completed");
    });
  });
});
