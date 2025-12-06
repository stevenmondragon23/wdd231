
const params = new URLSearchParams(window.location.search);

const resultsHTML = `
  <h2>Submitted Information</h2>
  <p><strong>First Name:</strong> ${params.get("fname")}</p>
  <p><strong>Last Name:</strong> ${params.get("lname")}</p>
  <p><strong>Email:</strong> ${params.get("email")}</p>
  <p><strong>Training Goal:</strong> ${params.get("goal")}</p>
  <p><strong>Message:</strong> ${params.get("message") || "No message provided"}</p>
`;

document.querySelector("#form-results").innerHTML = resultsHTML;