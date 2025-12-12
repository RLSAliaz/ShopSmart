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


fetch('https://fakestoreapi.com/products/category/electronics')
  .then(res => res.json())
  .then(productos => {

    const contenedor = document.getElementById('listado-productos');
    contenedor.innerHTML = '';

    productos
      .slice(0, 3)
      .forEach(prod => {

        const nombreCompleto = prod.title;
        const nombreCorto =
          nombreCompleto.length > 70
            ? nombreCompleto.slice(0, 50).trim() + '…'
            : nombreCompleto;

        contenedor.innerHTML += `
          <article class="producto-item">
            <img src="${prod.image}" alt="${nombreCompleto}">
            <div class="info">
              <h3 class="product-title" title="${nombreCompleto}">
                ${nombreCorto}
              </h3>

              <!-- Nombre completo guardado, no visible -->
              <span class="product-full-title" style="display: none;">
                ${nombreCompleto}
              </span>

              <p>${prod.description.substring(0, 80)}...</p>
              <span class="precio" data-precio="${prod.price}">
                USD$${prod.price}
              </span>
            </div>

            <div class="botonera-mobile">
              <button class="btn-agregar-carrito" data-id="${prod.id}">
                <i class="bi bi-cart-plus"></i> Agregar al carrito
              </button>
              <button class="btn-comprar" data-id="${prod.id}">
                <i class="bi bi-bag-check"></i> Comprar Ahora
              </button>
            </div>
          </article>
        `;
      });
  })
  .catch(err => console.error(err));
