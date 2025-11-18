// Fetch JSON data using async/await
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error("Error loading JSON");

    const members = await response.json();

    // Filtrar Gold y Silver
    const filtered = members.filter(c => c.membershipLevel === 2 || c.membershipLevel === 3);

    // Función para mezclar y tomar n elementos al azar
    function getRandomItems(array, n) {
      const shuffled = array.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, n);
    }

    // Seleccionar 3 empresas al azar
    const selected = getRandomItems(filtered, 3);

    const container = document.getElementById('randomMembers');
    container.innerHTML = ''; // Limpiar contenedor

    selected.forEach(company => {
      const div = document.createElement('div');
      div.innerHTML = `
            <img src="${company.image}" alt="${company.name}">
            <h3>${company.name}</h3>
            <p>${company.description}</p>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Adress:</strong> ${company.address}</p>
            <p><a href="${company.website}" target="_blank">Website</a></p>
      `;
      container.appendChild(div);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

// Llamar a la función para cargar los datos
loadMembers();
