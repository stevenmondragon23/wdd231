const params = new URLSearchParams(window.location.search);

document.getElementById("outFirst").textContent = params.get("firstName");
document.getElementById("outLast").textContent = params.get("lastName");
document.getElementById("outEmail").textContent = params.get("email");
document.getElementById("outMobile").textContent = params.get("telephone");
document.getElementById("outBusiness").textContent = params.get("organizationName");
document.getElementById("outTimestamp").textContent = params.get("timestamp");