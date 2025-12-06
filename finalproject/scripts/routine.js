const container = document.querySelector("#routine-container");

// Load favorites from localStorage
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Fetch exercises JSON
async function loadRoutine() {
  try {
    const response = await fetch("./data/exercises.json");
    const exercises = await response.json();

    // Filter only favorites
    const favoriteExercises = exercises.filter(ex => favorites.includes(ex.id));

    renderRoutine(favoriteExercises);

  } catch (error) {
    console.error("Error loading routine:", error);
  }
}

// Render favorite exercises
function renderRoutine(list) {
  if (list.length === 0) {
    container.innerHTML = `
      <p class="no-favorites">You have no favorite exercises yet.</p>
    `;
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

loadRoutine();

