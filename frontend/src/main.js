// =====================================================
// ---CODIGO QUE IMPORTA EL FICHERO CSS-----
// =====================================================
import "./style.css";

// ====================================================
// -----------CONFIGURACION BOTON PERFIL---------------
// ====================================================

function initDropdown() {
  const btn = document.getElementById("perfilBtn");
  const menu = document.getElementById("menu");

  if (!btn || !menu) return; // seguridad

  // Abrir / cerrar menú
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  // Cerrar al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });
}

initDropdown(); // Ejecutar función

// -----------FIN CONFIGURACION BOTON PERFIL-----------


// ====================================================
// ----CAMBIO DE PAGINAS (SINGLE PAGE APLICATION)------
// ====================================================

// FUNCIÓN QUE CAMBIA LA EL MAIN VISIBLE (home, formulario, contacto, etc.)
function cambiarVista(id) {
  const secciones = document.getElementsByTagName("main"); // Coge todos los elementos <main> de la página
  // For que recorre todos los main y los oculta
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].classList.add("hidden"); 
  }
  document.getElementById(id).classList.remove("hidden"); // Muestra solo el main que tiene el id que hemos recibido
}

// Función que inicializa la navegación del menú
function initNavegacion() {
  const links = document.getElementsByClassName("nav-link"); // nos devuelve un array (clase nav-link)

  // For que recorre todos los enlaces uno por uno
  for (let i = 0; i < links.length; i++) { 

    // A cada enlace le añade un evento de click
    links[i].addEventListener("click", function (e) {
      e.preventDefault(); // Evita que el enlace recargue o cambie de página
      const id = this.getAttribute("data-target"); // Lee el valor del atributo data-target del enlace
      cambiarVista(id); // Llama a la función que cambia la vista
    });
  }
}

initNavegacion(); //llamamos a la funcion

console.log("Frontend listo 🚀");
