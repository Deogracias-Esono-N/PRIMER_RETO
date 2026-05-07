
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
  const secciones = document.querySelectorAll("main");

  secciones.forEach(s => s.classList.add("hidden"));

  const vista = document.getElementById(id);
  if (!vista) return;

  vista.classList.remove("hidden");

  // CARGA SOLO CUANDO ENTRAS AL FORMULARIO
  if (id === "formulario") {
    cargarInstitutos();
    cargarGrados(); 
  }


  if (id === "lista") {
    mostrarSolicitudes();
  }

}


// =====================================================
// NAVEGACIÓN
// =====================================================
function initNavegacion() {
  document.addEventListener("click", (e) => {

    const target = e.target.closest("[data-target]");
    if (!target) return;

    e.preventDefault();

    const id = target.getAttribute("data-target");
    const modo = target.getAttribute("data-modo");

    if (modo) {
      modoVista = modo;
    }

    cambiarVista(id);
  });
}

// =====================================================
// CESION: INICIAR Y CERRAR
// =====================================================
function initLoginSimple() {
  const form = document.getElementById("formLogin");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = form.usuario.value;
    const password = form.password.value;

    // credenciales que tú decides
    const USER_CORRECTO = "admin";
    const PASSWORD_CORRECTA = "admin123";

    if (usuario === USER_CORRECTO && password === PASSWORD_CORRECTA) {

  alert("Acceso permitido");

  modoVista = "admin";

  localStorage.setItem("login", "true");

  cambiarVista("lista");

} else {
  alert("Usuario o contraseña incorrectos");
}
  });
}

// -------------------------------------------------------

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
function initFormulario() {
  const form = document.getElementById("formEstudiante");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

      // AQUÍ EMPIEZA TU NUEVO FLUJO

      // estudiante
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

      const estudiante = await resEst.json();
      const idEstudiante = estudiante.CodEstudiante;

      console.log("ID estudiante:", idEstudiante);

      // solicitud
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

      const result = await resSol.json();

      if (result.ok) {
        alert("Solicitud guardada correctamente");
        form.reset();
      }

    } catch (err) {
      console.error("Error:", err);
    }
  });
}
// =====================================================
// GRADO Y NIVEL
// =====================================================
async function cargarGrados() {

  const selectGrado = document.getElementById("grado");
  const selectNivel = document.getElementById("nivel");

  console.log("cargando grados...");

  if (!selectGrado || !selectNivel) return;

  const res = await fetch("http://localhost:9999/api/getgrados.php");

  console.log("STATUS GRADOS:", res.status);

  const data = await res.json();

  console.log("DATA GRADOS:", data);

  // limpiar selects
  selectGrado.innerHTML = `<option value="">Selecciona un grado</option>`;
  selectNivel.innerHTML = `<option value="">Selecciona un nivel</option>`;

  // evitar repetir niveles
  const nivelesUsados = [];

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

  const selectInstituto = document.getElementById("instituto");
  const inputLocalidad = document.getElementById("localidadAuto");
  const inputComunidad = document.getElementById("comunidadAuto");

  if (!selectInstituto || !inputLocalidad || !inputComunidad) return;

  console.log("cargando institutos...");

  const res = await fetch("http://localhost:9999/api/getinstitutos.php");

  console.log("STATUS:", res.status);

  const data = await res.json();

  console.log("DATA:", data);

  selectInstituto.innerHTML = "";

  const optDefault = document.createElement("option");
  optDefault.value = "";
  optDefault.textContent = "Selecciona un instituto";
  selectInstituto.appendChild(optDefault);

  data.forEach(inst => {
    const option = document.createElement("option");
    option.value = inst.CodInst;
    option.textContent = inst.Nombre;
    selectInstituto.appendChild(option);
  });

  selectInstituto.onchange = (e) => {
    const seleccionado = data.find(i => i.CodInst === e.target.value);
    if (!seleccionado) return;

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
document.addEventListener("DOMContentLoaded", () => {
  initDropdown();
  initFormulario();
  initNavegacion();
  initLoginSimple();
  initLogout();

  console.log("Frontend listo 🚀");
});