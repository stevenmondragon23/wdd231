const form = document.querySelector("#contact-form");

// Load saved data if exists
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("formData"));

  if (saved) {
    document.querySelector("#fname").value = saved.fname || "";
    document.querySelector("#lname").value = saved.lname || "";
    document.querySelector("#email").value = saved.email || "";
    document.querySelector("#goal").value = saved.goal || "";
    document.querySelector("#message").value = saved.message || "";
  }
});

// Save data to localStorage on input
form.addEventListener("input", () => {
  const data = {
    fname: form.fname.value,
    lname: form.lname.value,
    email: form.email.value,
    goal: form.goal.value,
    message: form.message.value
  };

  localStorage.setItem("formData", JSON.stringify(data));
});

// Clear localStorage on submit
form.addEventListener("submit", () => {
  localStorage.removeItem("formData");
});

