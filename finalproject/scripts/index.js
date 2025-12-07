// index.js

const container = document.querySelector("#featured-container");

async function loadFeatured() {
  try {
    const response = await fetch("./data/exercises.json");
    const exercises = await response.json();

    // Group exercises by muscle
    const byMuscle = exercises.reduce((acc, ex) => {
      if (!acc[ex.muscle]) acc[ex.muscle] = [];
      acc[ex.muscle].push(ex);
      return acc;
    }, {});

    // Get all muscle groups
    const muscles = Object.keys(byMuscle);

    // Shuffle muscles and pick 3
    const randomMuscles = muscles.sort(() => Math.random() - 0.5).slice(0, 3);

    // Pick 1 random exercise per muscle
    const featured = randomMuscles.map(muscle => {
      const list = byMuscle[muscle];
      return list[Math.floor(Math.random() * list.length)];
    });

    renderFeatured(featured);

  } catch (error) {
    console.error("Error loading featured exercises:", error);
  }
}

function renderFeatured(list) {
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

loadFeatured();