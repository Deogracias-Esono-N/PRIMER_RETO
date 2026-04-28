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

function cambiarVista(id) {
  const secciones = document.querySelectorAll("main");

  // Ocultar todas las secciones
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].classList.add("hidden");
  }

  // Mostrar la sección seleccionada
  document.getElementById(id).classList.remove("hidden");
}


console.log("Frontend listo 🚀");
