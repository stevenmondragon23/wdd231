import { items } from "./items.mjs";

const container = document.getElementById('cards');

items.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" loading="lazy" class="places">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;

  container.appendChild(card);
});
