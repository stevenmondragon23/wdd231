document.addEventListener("DOMContentLoaded", () => {

  // Abrir diálogos
  document.getElementById("non-buttom").addEventListener("click", () => openDialog("nonprofit"));
  document.getElementById("bronze-buttom").addEventListener("click", () => openDialog("bronze"));
  document.getElementById("silver-status").addEventListener("click", () => openDialog("silver"));
  document.getElementById("gold-status").addEventListener("click", () => openDialog("gold"));

  // Cerrar diálogos
  document.getElementById("close1").addEventListener("click", () => closeDialog("nonprofit"));
  document.getElementById("close2").addEventListener("click", () => closeDialog("bronze"));
  document.getElementById("close3").addEventListener("click", () => closeDialog("silver"));
  document.getElementById("close4").addEventListener("click", () => closeDialog("gold"));
});


// Funciones de abrir/cerrar
function openDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog) dialog.showModal();
}

function closeDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog) dialog.close();
}
