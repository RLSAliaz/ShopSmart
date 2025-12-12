const modal = document.getElementById("modal-compra");
const cerrar = document.querySelector(".cerrar");
const btnComprarList = document.querySelectorAll(".btn-comprar");

const nombreProductoElem = document.getElementById("nombreProducto");
const precioProductoElem = document.getElementById("precioProducto");


//Mostrar campo dirección SOLO si selecciona envío
const selectEntrega = document.getElementById("entrega");
const campoDireccion = document.getElementById("campoDireccion");

selectEntrega.addEventListener("change", () => {
  if (selectEntrega.value === "envio") {
    campoDireccion.style.display = "block";
  } else {
    campoDireccion.style.display = "none";
  }
});

//Abre el modal con datos del producto
btnComprarList.forEach(boton => {
  boton.addEventListener('click', () => {
    const card = boton.closest(".producto-item");
    const nombre = card.querySelector("h3").textContent;
    const precio = card.querySelector(".precio").textContent;

    nombreProductoElem.textContent = "Producto: " + nombre;
    precioProductoElem.textContent = "Precio: " + precio;

    modal.style.display = "flex";
  });
});

//Cerrar modal tocando la X
cerrar.addEventListener('click', () => {
  modal.style.display = "none";
});

//Cerrar tocando fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = "none";
});

//Botón "Comprar Ahora" — Abre el modal con datos del producto
document.addEventListener("click", (e) => {

  const botonComprar = e.target.closest(".btn-comprar");
  if (!botonComprar) return;

  const card = botonComprar.closest(".producto-item");

  // Nombre COMPLETO (no truncado)
  const nombre = card.querySelector(".product-full-title")
    ? card.querySelector(".product-full-title").textContent.trim()
    : card.querySelector("h3").textContent.trim();

  // Precio crudo real
  const precioCrudo = parseFloat(
    card.querySelector(".precio").dataset.precio
  );

  // Mostrar en el modal
  nombreProductoElem.textContent = `Producto: ${nombre}`;
  precioProductoElem.textContent =
    `Precio: $${precioCrudo.toLocaleString("es-AR")}`;

  // Guardar precio para cálculos
  precioPorUnidad = precioCrudo;

  // Reset cantidad
  cantidadInput.value = 1;

  // Calcular total inicial
  calcularTotal(precioPorUnidad);

  // Abrir modal
  modal.style.display = "flex";
});


// Variables globales
const cantidadInput = document.getElementById("cantidad");
const totalCompra = document.getElementById("totalCompra");
let precioPorUnidad = 0;

//Lee el precio crudo del producto
function obtenerPrecioCrudo(card) {
  const precioSpan = card.querySelector(".precio");
  return parseFloat(precioSpan.dataset.precio);
}

// Calcula y muestra el total en el DOM
function calcularTotal(precioCrudo) {
  const cantidad = parseInt(cantidadInput.value);
  const precioTotal = precioCrudo * cantidad;
  totalCompra.textContent = `$${precioTotal.toLocaleString('es-AR')}`;
}

//Evento del botón "Comprar Ahora"
btnComprarList.forEach(boton => {
  boton.addEventListener("click", () => {
    const card = boton.closest(".producto-item");
    precioPorUnidad = obtenerPrecioCrudo(card); // Guardamos precio para usar luego
    calcularTotal(precioPorUnidad); // Total inicial al abrir el modal
  });
});

//Cuando cambia la cantidad, se recalcula el total
cantidadInput.addEventListener("input", () => {
  calcularTotal(precioPorUnidad);
});   
document.querySelector(".btn-confirmar").addEventListener("click", () => {

  const nombre = document.getElementById("nombreComprador").value.trim();
  const medioPago = document.getElementById("medioPago").value;
  const tipoEntrega = document.getElementById("entrega").value;
  const direccion = document.getElementById("direccion").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);

  // VALIDACIONES
  if (!nombre) {
    alert("⚠ Por favor ingresá el nombre del comprador.");
    return;
  }

  if (!medioPago) {
    alert("⚠ Por favor seleccioná un medio de pago.");
    return;
  }

  if (tipoEntrega === "envio" && !direccion) {
    alert("⚠ Por favor ingresá la dirección de envío.");
    return;
  }

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("⚠ La cantidad ingresada no es válida.");
    return;
  }

  // TODO OK
  alert("✔ Compra confirmada con éxito! 🛍️");

  modal.style.display = "none";
});
