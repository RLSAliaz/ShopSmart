// Elementos del DOM
const dropArea = document.getElementById("drop-area");
const fileElem = document.getElementById("fileElem");
const preview = document.getElementById("preview");
const form = document.getElementById("form-producto");

// Abrir explorador cuando se clickea el área
dropArea.addEventListener("click", () => fileElem.click());

// Cuando se selecciona una imagen desde el input
fileElem.addEventListener("change", () => {
  if (fileElem.files.length > 0) {
    mostrarImagen(fileElem.files[0]);
  }
});

// Mantener el archivo en dragover
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("hover");
});

// Quitar el efecto
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("hover");
});

// Cuando sueltan la imagen
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("hover");

  const archivo = e.dataTransfer.files[0];
  fileElem.files = e.dataTransfer.files;
  mostrarImagen(archivo);
});

// Función para validar y previsualizar
function mostrarImagen(archivo) {
  if (!archivo.type.startsWith("image/")) {
    alert("⚠ Solo se permiten archivos de imagen");
    fileElem.value = "";
    return;
  }

  const lector = new FileReader();
  lector.onload = (e) => {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  lector.readAsDataURL(archivo);
}

// Envío simulado sin backend
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!fileElem.files.length) {
    alert("⚠ Debes seleccionar una imagen del producto");
    return;
  }

  alert("📦 Producto cargado con éxito (sin servidor)");

  form.reset();
  preview.style.display = "none";
});
