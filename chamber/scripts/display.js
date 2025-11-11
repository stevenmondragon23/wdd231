const buttom = document.getElementById('list-btn');
const gridbuttm = document.getElementById('grd-btn');
const box = document.getElementById('cards');



// Botón de vista lista
buttom.addEventListener('click', () => {
  if (!box.classList.contains('list-view')) {
    box.classList.remove('cards');
    box.classList.add('list-view');
  }
});

// Botón de vista cuadrícula
gridbuttm.addEventListener('click', () => {
  if (!box.classList.contains('cards')) {
    box.classList.remove('list-view');
    box.classList.add('cards');
  }
});


