
let modoVista = "usuario";
// =====================================================
// CSS
// =====================================================
import "./style.css";


// =====================================================
// PERFIL DROPDOWN
// =====================================================
function initDropdown() {
  const btn = document.getElementById("perfilBtn");
  const menu = document.getElementById("menu");

  if (!btn || !menu) return;

  // evitar duplicar listeners (CLAVE en SPA)
  if (btn.dataset.init === "true") return;
  btn.dataset.init = "true";

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });
}


// =====================================================
// CAMBIO DE VISTAS (SPA)
// =====================================================
function cambiarVista(id) {
  // Selecciona todas las secciones <main> de la página
  const secciones = document.querySelectorAll("main");
  // Oculta todas las secciones añadiendo la clase "hidden"
  secciones.forEach(s => s.classList.add("hidden"));

  // Obtiene la vista (sección) que se quiere mostrar según el id
  const vista = document.getElementById(id);
  if (!vista) return; //Sale de la funcion si no existe esa vista

  // Muestra la vista seleccionada quitando la clase "hidden"
  vista.classList.remove("hidden"); 

  // CARGA SOLO CUANDO ENTRAS AL FORMULARIO
  // Si la vista es el formulario, carga datos necesarios
  if (id === "formulario") {
    cargarInstitutos();
    cargarGrados(); 
  }

  // Si la vista es la lista, carga las solicitudes que estan en proceso.
  if (id === "lista") {
    mostrarSolicitudes();
  }

}

// =====================================================
// NAVEGACIÓN
// =====================================================
function initNavegacion() {
  // Escucha cualquier click en toda la página (delegación de eventos);
  document.addEventListener("click", (e) => {

    // Busca si el elemento clicado (o su padre) tiene data-target
    const target = e.target.closest("[data-target]");
    if (!target) return; // si no lo tiene, no hace nada

    e.preventDefault();// evita comportamiento por defecto (links, etc.)

    // Obtiene la vista a la que quiere navegar
    const id = target.getAttribute("data-target");
    // Obtiene el modo (usuario/admin) si existe
    const modo = target.getAttribute("data-modo");

    // Si hay modo, lo guarda globalmente
    if (modo) {
      modoVista = modo;
    }

    // Cambia la vista según el id recibido
    cambiarVista(id);
  });
}

// =====================================================
// CESION: INICIAR Y CERRAR
// =====================================================
function initLoginSimple() {
  // Obtiene el formulario de login
  const form = document.getElementById("formLogin");

  if (!form) return; // Si no existe el formulario, no hace nada

  // Escucha el envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar la página

    // Obtiene los valores introducidos por el usuario
    const usuario = form.usuario.value;
    const password = form.password.value;

    // credenciales mias (YA SE QUE NO ES SEGURO)
    const USER_CORRECTO = "admin";
    const PASSWORD_CORRECTA = "admin123";

  // Comprueba si son correctas
  if (usuario === USER_CORRECTO && password === PASSWORD_CORRECTA) {

  alert("Acceso permitido");

  modoVista = "admin"; // cambia el modo a admin

  localStorage.setItem("login", "true"); // guarda la sesión en localStorage

  cambiarVista("lista"); // navega a la vista de lista

} else {
  alert("Usuario o contraseña incorrectos");
}
  });
}

// -------------------------------------------------------

//FUNCION QUE CIERRA LA SESION
function initLogout() {
  const btn = document.getElementById("cerarsesion");

  if (!btn) return;

  btn.addEventListener("click", () => {

    // borrar sesión
    localStorage.removeItem("login");

    alert("Sesión cerrada");

    // volver a inicio o login
    cambiarVista("inicio");
  });
}
// =====================================================
// FORMULARIO
// =====================================================
function initFormulario() { // Obtiene el formulario QUE RELLENA el estudiante
  const form = document.getElementById("formEstudiante");

  if (!form) return; // Si no existe el formulario, no hace nada

  // Escucha el envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita recargar la página

    try {

      // comienzo del flujo

      // ===== ENVÍO DE DATOS DEL ESTUDIANTE =====

      // Envía los datos del estudiante al backend
      const resEst = await fetch("http://localhost:9999/api/postestudiante.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre: form.NombrePer.value,
          Apellidos: form.ApellidosPer.value,
          Email: form.EmailPer.value,
          Tel: form.TelPer.value,
          FecN: form.FecNacPer.value
        })
      });

      // Convierte la respuesta a JSON
      const estudiante = await resEst.json();
      const idEstudiante = estudiante.CodEstudiante;

      // Guarda el ID del estudiante devuelto por el backend
      console.log("ID estudiante:", idEstudiante);

      // ===== ENVÍO DE LA SOLICITUD =====
      // Envía la solicitud asociada al estudiante creado
      const resSol = await fetch("http://localhost:9999/api/postsolicitud.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CodEstudiante: idEstudiante,
          CodInst: form.instituto.value,
          CodGrado: form.grado.value,
          CursoInicio: form.curso_inicio.value,
          CursoFin: form.curso_fin.value
        })
      });

      // Convierte la respuesta a JSON
      const result = await resSol.json();

      // Si todo salió bien, muestra mensaje y reinicia formulario
      if (result.ok) {
        alert("Solicitud guardada correctamente");
        form.reset();
      }

    } catch (err) {
      // Captura y muestra cualquier error del proceso
      console.error("Error:", err);
    }
  });
}
// =====================================================
// GRADO Y NIVEL
// =====================================================
async function cargarGrados() {   // Obtiene los select del DOM para grado y nivel
  const selectGrado = document.getElementById("grado");
  const selectNivel = document.getElementById("nivel");

  console.log("cargando grados...");

  // Si no existen los elementos, detiene la ejecución
  if (!selectGrado || !selectNivel) return;

  // Petición al backend para obtener los grados
  const res = await fetch("http://localhost:9999/api/getgrados.php");

  console.log("STATUS GRADOS:", res.status);

  // Convierte la respuesta a JSON
  const data = await res.json();

  console.log("DATA GRADOS:", data);

  // Limpia los selects antes de rellenarlos
  selectGrado.innerHTML = `<option value="">Selecciona un grado</option>`;
  selectNivel.innerHTML = `<option value="">Selecciona un nivel</option>`;

  // Array para evitar repetir niveles
  const nivelesUsados = [];
  // Recorre los datos recibidos del backend
  data.forEach(item => {

  // GRADO
  const optGrado = document.createElement("option");
  optGrado.value = item.CodGrado;
  optGrado.textContent = item.Nombre;
  selectGrado.appendChild(optGrado);

  // NIVEL (sin repetir)
  if (!nivelesUsados.includes(item.Nivel)) {

    nivelesUsados.push(item.Nivel);

    const optNivel = document.createElement("option");
    optNivel.value = item.Nivel;
    optNivel.textContent = item.Nivel;
    selectNivel.appendChild(optNivel);
  }
});
}

// =====================================================
// CARGAR INSTITUTO
// =====================================================
async function cargarInstitutos() {

  // Obtiene el select de institutos
  const selectInstituto = document.getElementById("instituto");
  const inputLocalidad = document.getElementById("localidadAuto");
  const inputComunidad = document.getElementById("comunidadAuto");

  // Si falta algún elemento, no ejecuta la función
  if (!selectInstituto || !inputLocalidad || !inputComunidad) return;

  console.log("cargando institutos...");

  // Petición al backend para obtener institutos
  const res = await fetch("http://localhost:9999/api/getinstitutos.php");

  console.log("STATUS:", res.status); 

  const data = await res.json(); // Convierte la respuesta a JSON

  console.log("DATA:", data); 

  selectInstituto.innerHTML = ""; // Limpia el select antes de rellenarlo

  // Crea opción por defecto
  const optDefault = document.createElement("option");
  optDefault.value = "";
  optDefault.textContent = "Selecciona un instituto";
  selectInstituto.appendChild(optDefault);

  // Añade cada instituto como opción en el select
  data.forEach(inst => {
    const option = document.createElement("option");
    option.value = inst.CodInst;
    option.textContent = inst.Nombre;
    selectInstituto.appendChild(option);
  });

  // Cuando el usuario selecciona un instituto
  selectInstituto.onchange = (e) => {
    // Busca el instituto seleccionado en los datos
    const seleccionado = data.find(i => i.CodInst === e.target.value);
    if (!seleccionado) return;

    // Rellena automáticamente los campos
    inputLocalidad.value = seleccionado.Localidad;
    inputComunidad.value = seleccionado.Comunidad;
  };
}

// =====================================================
// MOSTRAR TABLA
// =====================================================

async function mostrarSolicitudes() {

  // 1. Buscar la tabla en el HTML
  const tabla = document.getElementById("tablaSolicitudes");
  if (!tabla) return;

  try {
    // 2. Pedir datos al backend
    const res = await fetch("http://localhost:9999/api/getmostrar.php");
    const response = await res.json();

    const data = response.solicitudes || [];
    const total = response.totalExpedientes || 0;

// limpiar tabla
tabla.innerHTML = "";

// mostrar total
const totalHTML = document.getElementById("numExpedientes");

if (totalHTML && total !== undefined) {
  totalHTML.textContent = `Número de expedientes: ${total}`;
}

    // 5. Limpiar la tabla antes de pintar
    tabla.innerHTML = "";

    // 6. Recorrer cada solicitud y crear una fila
    data.forEach(item => {

      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td class="p-2">${item.Nombre}</td>
        <td class="p-2">${item.Apellidos}</td>
        <td class="p-2">${item.Tel}</td>
        <td class="p-2">${item.CursoInicio} - ${item.CursoFin}</td>
        <td class="p-2">${item.Estado}</td>

        ${
          modoVista === "admin"
            ? `<td class="p-2">
                 <button class="btn-eliminar bg-red-600 text-white px-3 py-1 rounded">
                   Eliminar
                 </button>
               </td>`
            : ""
        }
      `;

      // 7. Solo admin puede eliminar
      if (modoVista === "admin") {
        const btn = fila.querySelector(".btn-eliminar");

        if (btn) {
          btn.addEventListener("click", () => {
            eliminarEstudiante(item.CodEstudiante);
          });
        }
      }

      // 8. Añadir fila a la tabla
      tabla.appendChild(fila);
    });

  } catch (error) {

    // Si algo falla, lo mostramos en consola
    console.error("Error cargando solicitudes:", error);
  }
}
// =====================================================
// ELIMINAR ESTUDIANTE
// =====================================================

async function eliminarEstudiante(id) {

  if (!confirm("¿Seguro que quieres eliminar este estudiante?")) return;

  const res = await fetch("http://localhost:9999/api/geteliminar.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ CodEstudiante: id })
  });

  const data = await res.json();

  if (data.ok) {
    alert("Eliminado correctamente");
    mostrarSolicitudes(); // recarga tabla
  } else {
    alert("Error al eliminar");
  }
}

// =====================================================
// INIT GENERAL (ESTO ES LO CLAVE)
// =====================================================
// Espera a que todo el HTML esté cargado antes de ejecutar el JS
document.addEventListener("DOMContentLoaded", () => {
  initDropdown(); // Inicializa el menú desplegable del perfil
  initFormulario();  // Inicializa el formulario de estudiantes
  initNavegacion(); // Activa la navegación entre vistas (SPA con data-target)
  initLoginSimple(); // Inicializa el sistema de login simple
  initLogout(); // Inicializa el botón de cerrar sesión

  console.log("Frontend listo 🚀");
});