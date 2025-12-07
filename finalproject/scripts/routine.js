// routine.js

const container = document.querySelector("#routine-container");
const missingContainer = document.querySelector("#missing-muscles");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function loadRoutine() {
  try {
    const response = await fetch("./data/exercises.json");
    const exercises = await response.json();

    const favoriteExercises = exercises.filter(ex => favorites.includes(ex.id));

    renderRoutine(favoriteExercises);
    showMissingMuscles(exercises, favoriteExercises);

  } catch (error) {
    console.error("Error loading routine:", error);
  }
}

function renderRoutine(list) {
  if (list.length === 0) {
    container.innerHTML = `<p class="no-favorites">You have no favorite exercises yet.</p>`;
    return;
  }

  container.innerHTML = list
    .map(
      (ex) => `
      <div class="card">
        <img src="${ex.image}" alt="${ex.name}">
        <h3>${ex.name}</h3>
        <p><strong>Muscle:</strong> ${ex.muscle}</p>
        <p><strong>Difficulty:</strong> ${ex.difficulty}</p>
      </div>
    `
    )
    .join("");
}

function showMissingMuscles(allExercises, favoriteExercises) {
  const allMuscles = [...new Set(allExercises.map(ex => ex.muscle))];
  const workedMuscles = [...new Set(favoriteExercises.map(ex => ex.muscle))];

  const missingMuscles = allMuscles.filter(m => !workedMuscles.includes(m));

  if (missingMuscles.length === 0) {
    missingContainer.innerHTML = `<p>You are working all muscle groups!</p>`;
    return;
  }

  missingContainer.innerHTML = `
    <ul>
      ${missingMuscles.map(m => `<li>${m}</li>`).join("")}
    </ul>
  `;
}

loadRoutine();