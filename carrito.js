// Seleccionar elementos
const modalCarrito = document.getElementById("modal-carrito");
const botonCarrito = document.querySelector(".item-carrito .link-carrito");
const botonCerrar = document.getElementById("cerrar-modal");


// Abrir modal al hacer clic en el botón del carrito
botonCarrito.addEventListener("click", (e) => {
    e.preventDefault();        // evita que navegue a productos.html
    renderCarrito();
    actualizarTotalCarrito();   // ← 🔥 Este calcula y muestra el total

    modalCarrito.style.display = "flex";
});
// Botón de carrito responsive (mobile)



// Cerrar modal al tocar la X
botonCerrar.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});

// Cerrar si hace clic fuera del contenido
modalCarrito.addEventListener("click", (e) => {
    if (e.target === modalCarrito) {
        modalCarrito.style.display = "none";
    }
});

// ======================
// CARRITO DINÁMICO
// ======================

// array del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// función para agregar productos desde card
function agregarProductoDesdeCard(card) {

    const nombre = card.querySelector("h3").textContent.trim();
    const precio = parseFloat(card.querySelector(".precio").dataset.precio);

    const existente = carrito.find(item => item.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre,
            cantidad: 1,
            precio
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.table(carrito);
    // ⚠️ ALERT DE CONFIRMACIÓN
    alert(`✔ Producto "${nombre}" agregado al carrito con éxito`);
}

// listeners para botones de agregar al carrito
const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        const card = boton.closest(".producto-item");
        agregarProductoDesdeCard(card);
    });
});

function renderCarrito() {
  const tbody = document.getElementById("tbody-carrito");
  tbody.innerHTML = ""; 

  carrito.forEach((item, index) => {
    const precioTotal = item.precio * item.cantidad;

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${item.nombre}</td>

      <td>
        <button class="btn-cant" data-index="${index}" data-op="restar">−</button>
        <span class="cantidad">${item.cantidad}</span>
        <button class="btn-cant" data-index="${index}" data-op="sumar">+</button>
      </td>

      <td>$${precioTotal}</td>

      <td><button class="btn-eliminar" data-index="${index}">❌</button></td>
    `;

    tbody.appendChild(fila);
  });

  // después de generar la tabla:
  actualizarListenersCarrito();
}

function actualizarListenersCarrito() {

  // ELIMINAR
  document.querySelectorAll(".btn-eliminar").forEach(boton => {
    boton.addEventListener("click", () => {
      const i = boton.dataset.index;
      carrito.splice(i, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
      actualizarTotalCarrito();
    });
  });

  // SUMAR / RESTAR CANTIDAD
  document.querySelectorAll(".btn-cant").forEach(boton => {
    boton.addEventListener("click", () => {

      const idx = boton.dataset.index;
      const op = boton.dataset.op;

      if (op === "sumar") {
        carrito[idx].cantidad++;
      } else {
        carrito[idx].cantidad--;
        if (carrito[idx].cantidad <= 0) {
          carrito.splice(idx, 1);
        }
      }


      localStorage.setItem("carrito", JSON.stringify(carrito));

      renderCarrito();
      actualizarTotalCarrito();
    });
  });
}




function eliminarProducto(indice) {
    carrito.splice(indice, 1);  // elimina 1 elemento en ese índice
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarTotalCarrito();   // ← 🔥 Este calcula y muestra el total
    renderCarrito(); // refresca tabla
}

function calcularTotalCarrito() {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

function actualizarTotalCarrito() {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById("totalCarrito").textContent = "$" + total;
}


document.getElementById("btn-confirmar-compra").addEventListener("click", () => {

    const nombre = document.getElementById("nombreUsuario").value.trim();
    const medio = document.getElementById("medioPagoCheckout").value;
    const entrega = document.getElementById("tipoEntrega").value;

    if (!nombre || !medio) {
        alert("⚠ Por favor complete nombre y medio de pago.");
        return;
    }

    if (entrega === "envio") {
        const dir = document.getElementById("direccionCheckout").value.trim();
        if (!dir) {
            alert("⚠ Por favor complete la dirección de envío.");
            return;
        }
    }

    alert("✔ Compra confirmada con éxito!");

    // limpiar carrito
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
    actualizarTotalCarrito();

    // cerrar modal
    modalCarrito.style.display = "none";
});


const tipoEntrega = document.getElementById("tipoEntrega");
const campoDireccionCheckout = document.getElementById("campoDireccionCheckout");

tipoEntrega.addEventListener("change", () => {
    if (tipoEntrega.value === "envio") {
        campoDireccionCheckout.style.display = "block";
    } else {
        campoDireccionCheckout.style.display = "none";
    }
});

