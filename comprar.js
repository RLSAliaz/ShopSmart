const modal = document.getElementById("modal-compra");
const cerrar = document.querySelector(".cerrar");
const btnComprarList = document.querySelectorAll(".btn-comprar");

const nombreProductoElem = document.getElementById("nombreProducto");
const precioProductoElem = document.getElementById("precioProducto");

const radiosEntrega = document.querySelectorAll('input[name="entrega"]');
const campoDireccion = document.getElementById('campoDireccion');

// ✔ Mostrar campo dirección SOLO si selecciona envío
radiosEntrega.forEach(radio => {
  radio.addEventListener('change', () => {
    campoDireccion.style.display = (radio.value === "envio") ? "block" : "none";
  });
});

// ✔ Abre el modal con datos del producto
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

// ✔ Cerrar modal tocando la X
cerrar.addEventListener('click', () => {
  modal.style.display = "none";
});

// ✔ Cerrar tocando fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// ✔ Botón "Comprar Ahora" — Abre el modal con datos del producto
btnComprarList.forEach(boton => {
  boton.addEventListener('click', () => {
    const card = boton.closest(".producto-item");
    const nombre = card.querySelector("h3").textContent;

    const precioCrudo = parseFloat(
      card.querySelector(".precio").dataset.precio
    );
    // Mostrar en el modal
    nombreProductoElem.textContent = `Producto: ${nombre}`;
    precioProductoElem.textContent = `Precio: $${precioNumerico.toLocaleString('es-AR')}`;

    // Guardar el precio real dentro del elemento para el cálculo
    precioProductoElem.dataset.valor = precioNumerico;

    // Reset cantidad
    cantidadInput.value = 1;

    // Calcular TOTAL al abrir
    actualizarPrecioFinal();

    modal.style.display = "flex";
  });
});

// 🔹 Variables globales
const cantidadInput = document.getElementById("cantidad");
const totalCompra = document.getElementById("totalCompra");
let precioPorUnidad = 0;

// 🔹 Lee el precio crudo del producto
function obtenerPrecioCrudo(card) {
  const precioSpan = card.querySelector(".precio");
  return parseFloat(precioSpan.dataset.precio);
}

// 🔹 Calcula y muestra el total en el DOM
function calcularTotal(precioCrudo) {
  const cantidad = parseInt(cantidadInput.value);
  const precioTotal = precioCrudo * cantidad;
  totalCompra.textContent = `$${precioTotal.toLocaleString('es-AR')}`;
}

// 🔹 Evento del botón "Comprar Ahora"
btnComprarList.forEach(boton => {
  boton.addEventListener("click", () => {
    const card = boton.closest(".producto-item");
    precioPorUnidad = obtenerPrecioCrudo(card); // Guardamos precio para usar luego
    calcularTotal(precioPorUnidad); // Total inicial al abrir el modal
  });
});

// 🔹 Cuando cambia la cantidad, se recalcula el total
cantidadInput.addEventListener("input", () => {
  calcularTotal(precioPorUnidad);
});   
document.querySelector(".btn-confirmar").addEventListener("click", () => {
  alert("¡Compra registrada con éxito! 🛍️");
  modal.style.display = "none";
});