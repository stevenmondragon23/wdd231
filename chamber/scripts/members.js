// Fetch JSON data using async/await
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error("Error loading JSON");

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Display members on the page
function displayMembers(members) {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    // Membership style
    if (member.membershipLevel === 3) card.classList.add('gold');
    else if (member.membershipLevel === 2) card.classList.add('silver');
    else card.classList.add('member');

    card.innerHTML = `
      <img src="${member.image}">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p>${member.description}</p>
    `;
    container.appendChild(card);
  });
}

// Load data when the page is ready
loadMembers();