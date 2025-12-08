// ===============================
// CLASE PRODUCTO
// ===============================
class Producto {
  constructor(nombre, precio, stock, imagen) {
    this.id = Date.now();
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
  }
}
// =============================================
// SISTEMA DE GESTIÓN DE PRODUCTOS
// =============================================


// Cargar productos desde localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// ---------------------------------------------
// Validación básica (evita datos corruptos)
// ---------------------------------------------
function validarProducto(p) {
  if (!p.nombre || typeof p.nombre !== "string")
    throw new Error("El producto necesita un nombre válido.");

  if (typeof p.precio !== "number" || p.precio <= 0)
    throw new Error("El precio debe ser un número mayor a 0.");

  if (typeof p.stock !== "number" || p.stock < 0)
    throw new Error("El stock debe ser un número válido.");

  if (!p.imagen || typeof p.imagen !== "string")
    throw new Error("El producto necesita una imagen.");
}

// ---------------------------------------------
// Agregar producto
// ---------------------------------------------
function agregarProducto(producto) {
  validarProducto(producto);

  producto.id = Date.now(); // ID único
  productos.push(producto);

  localStorage.setItem("productos", JSON.stringify(productos));
}

// ---------------------------------------------
// Obtener todos los productos
// ---------------------------------------------
function obtenerProductos() {
  return productos;
}

// ---------------------------------------------
// Buscar producto por ID
// ---------------------------------------------
function obtenerProductoPorId(id) {
  return productos.find(p => p.id === id);
}

// ---------------------------------------------
// Eliminar producto
// ---------------------------------------------
function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem("productos", JSON.stringify(productos));
}