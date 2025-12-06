// DOM elements
const container = document.querySelector("#exercise-container");
const filterSelect = document.querySelector("#muscle-filter");
const modal = document.querySelector("#exercise-modal");
const modalContent = document.querySelector("#modal-content");
const closeModal = document.querySelector("#close-modal");

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Fetch JSON data
async function loadExercises() {
  try {
    const response = await fetch("data/exercises.json");
    const exercises = await response.json();

    renderExercises(exercises);
    populateFilterOptions(exercises);
    setupFilter(exercises);

  } catch (error) {
    console.error("Error loading exercises:", error);
  }
}

// cards
function renderExercises(list) {
  container.innerHTML = list
    .map(
      (ex) => `
      <div class="card">
        <img src="${ex.image}" alt="${ex.name}" loading="lazy">
        <h3>${ex.name}</h3>
        <p><strong>Muscle:</strong> ${ex.muscle}</p>
        <p><strong>Difficulty:</strong> ${ex.difficulty}</p>

        <button class="details-btn" data-id="${ex.id}">Details</button>

        <button class="fav-btn" data-id="${ex.id}">
          ${favorites.includes(ex.id) ? "★ Favorite" : "☆ Add Favorite"}
        </button>
      </div>
    `
    )
    .join("");

  addEventListeners(list);
}

// filter options
function populateFilterOptions(exercises) {
  const muscles = [...new Set(exercises.map((ex) => ex.muscle))];

  muscles.forEach((muscle) => {
    const option = document.createElement("option");
    option.value = muscle;
    option.textContent = muscle;
    filterSelect.appendChild(option);
  });
}

// filter
function setupFilter(exercises) {
  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;

    if (value === "all") {
      renderExercises(exercises);
    } else {
      const filtered = exercises.filter((ex) => ex.muscle === value);
      renderExercises(filtered);
    }
  });
}

// Add event listeners to buttons
function addEventListeners(exercises) {
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      openModal(id, exercises);
    });
  });

  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      toggleFavorite(id);
      renderExercises(exercises);
    });
  });
}

// Modal
function openModal(id, exercises) {
  const ex = exercises.find((item) => item.id === id);

  modalContent.innerHTML = `
    <h2>${ex.name}</h2>
    <img src="${ex.image}" alt="${ex.name}">
    <p><strong>Muscle:</strong> ${ex.muscle}</p>
    <p><strong>Difficulty:</strong> ${ex.difficulty}</p>
    <p><strong>Equipment:</strong> ${ex.equipment}</p>
    <p>${ex.description}</p>
  `;

  modal.showModal();
}

closeModal.addEventListener("click", () => modal.close());

// LocalStorage favorites
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((fav) => fav !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Initialize
loadExercises();