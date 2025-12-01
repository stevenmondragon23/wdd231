const messageArea = document.getElementById('visit-message');

const lastVisit = localStorage.getItem('last-visit');

const now = Date.now();

if (!lastVisit) {
  messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const difference = now - Number(lastVisit);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days < 1) {
    messageArea.textContent = "Back so soon! Awesome!";
  } else {
    const dayWord = days === 1 ? "day" : "days";
    messageArea.textContent = `You last visited ${days} ${dayWord} ago.`;
  }
}

localStorage.setItem('last-visit', now);
