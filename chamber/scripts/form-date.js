document.addEventListener("DOMContentLoaded", () => {
  const field = document.getElementById("timestamp");
  if (field) {
    field.value = new Date().toISOString();
  }
});