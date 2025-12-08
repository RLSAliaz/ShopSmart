// ==============================
// BOTONES PRINCIPALES
// ==============================
const botonMenu = document.getElementById("boton-menu");
const botonCerrarMenu = document.getElementById("boton-close-menu");

// ==============================
// MENÚ RESPONSIVE (el <nav>)
// ==============================
const menu = document.querySelector("header nav");

// ==============================
// ABRIR MENÚ
// ==============================
botonMenu.addEventListener("click", () => {
  menu.classList.add("active");
});

// ==============================
// CERRAR MENÚ
// ==============================
botonCerrarMenu.addEventListener("click", () => {
  menu.classList.remove("active");
});

// ==============================
// CERRAR MENÚ AL HACER CLICK FUERA
// ==============================
document.addEventListener("click", (e) => {
  const clickDentroMenu = menu.contains(e.target);
  const clickEnBotonMenu = botonMenu.contains(e.target);

  if (!clickDentroMenu && !clickEnBotonMenu) {
    menu.classList.remove("active");
  }
});
