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

// ====================================================
// -----------ENVIO FORMULARIO (ALUMNO)----------------
// ====================================================

function initFormulario() {

  // 1. Buscamos el formulario en el HTML por su ID
  const form = document.getElementById("formEstudiante");

  // 2. Seguridad: si no existe el formulario, no hacemos nada
  if (!form) return;

  // 3. Escuchamos el evento "submit" (cuando el usuario envía el formulario)
  form.addEventListener("submit", async function (e) {  //fetch son peticiones http
    e.preventDefault(); // 4. Evitamos que el formulario recargue la página (comportamiento por defecto)

    // 5. Recogemos los datos del formulario
    // IMPORTANTE: esto funciona porque los inputs tienen atributo "name"

const data = {
  // 👤 DATOS PERSONALES
  NombrePer: form.NombrePer.value,
  ApellidosPer: form.ApellidosPer.value,
  InstiOrigPer: form.InstiOrigPer.value,
  FecNacPer: form.FecNacPer.value,
  TipoAlojPer: form.TipoAlojPer.value,
  EmailPer: form.EmailPer.value,
  TelPer: form.TelPer.value,

  // 📅 SOLICITUD
  curso_inicio: form.curso_inicio.value,
  curso_fin: form.curso_fin.value,

  // 🏫 INSTITUTO
  instituto: form.instituto.value,

  // 🏙️ LOCALIDAD
  NomLocalidad: form.NomLocalidad.value,
  CodPost: form.CodPost.value,

  // 🌍 COMUNIDAD
  NomComAuton: form.NomComAuton.value,

  // 🎓 GRADO
  NomGradoCurso: form.NomGradoCurso.value,
  NivelGrado: form.NivelGrado.value
};

    try {

      // 6. Enviamos los datos al backend PHP usando fetch
      const res = await fetch("http://localhost:9999/api/registro.php", {

        method: "POST", // tipo de petición

        headers: {
          "Content-Type": "application/json" // indicamos que enviamos JSON
        },

        // 7. Convertimos el objeto JS a JSON para enviarlo al backend
        body: JSON.stringify(data)
      });

      // 8. Convertimos la respuesta del PHP a formato JSON
      const result = await res.json();

      // 9. Si el backend responde OK, mostramos mensaje
      if (result.ok) {
        alert("Estudiante guardado correctamente");

        // 10. Reseteamos el formulario (lo dejamos vacío)
        form.reset();
      }

    } catch (error) {

      // 11. Si algo falla (PHP, red, etc.), lo mostramos en consola
      console.error("Error al guardar estudiante:", error);
    }
  });
}

// 12. Ejecutamos la función para activar el formulario
initFormulario();


// ====================================================
// -----------SELECCION DE INSTITUTOS (ALUMNO)---------
// ====================================================
document.addEventListener("DOMContentLoaded", () => {

  // ====================================================
  // DATOS INSTITUTOS → LOCALIDAD + COMUNIDAD
  // ====================================================
  const datosInstitutos = {
    "IES Lluís Vives": { localidad: "valencia", comunidad: "Comunitat Valenciana" },
    "IES Benlliure": { localidad: "valencia", comunidad: "Comunitat Valenciana" },
    "IES Sorolla": { localidad: "valencia", comunidad: "Comunitat Valenciana" },

    "IES La Marxadella": { localidad: "torrent", comunidad: "Comunitat Valenciana" },
    "IES Tirant lo Blanc": { localidad: "torrent", comunidad: "Comunitat Valenciana" },
    "IES Serra Perenxisa": { localidad: "torrent", comunidad: "Comunitat Valenciana" },

    "IES Alonso de Avellaneda": { localidad: "alcala", comunidad: "Comunidad de Madrid" },
    "IES Cardenal Cisneros": { localidad: "alcala", comunidad: "Comunidad de Madrid" },
    "IES Antonio Machado": { localidad: "alcala", comunidad: "Comunidad de Madrid" },

    "IES Isaac Peral": { localidad: "torrejon", comunidad: "Comunidad de Madrid" },
    "IES León Felipe": { localidad: "torrejon", comunidad: "Comunidad de Madrid" },
    "IES Valle Inclán": { localidad: "torrejon", comunidad: "Comunidad de Madrid" },

    "IES Miguel de Unamuno": { localidad: "bilbao", comunidad: "País Vasco" },
    "IES Txurdinaga Behekoa": { localidad: "bilbao", comunidad: "País Vasco" },
    "IES Botikazar": { localidad: "bilbao", comunidad: "País Vasco" },

    "IES Aixerrota": { localidad: "getxo", comunidad: "País Vasco" },
    "IES Artaza-Romo": { localidad: "getxo", comunidad: "País Vasco" },
    "IES Julio Caro Baroja": { localidad: "getxo", comunidad: "País Vasco" },

    "IES Virgen del Carmen": { localidad: "jaen", comunidad: "Andalucía" },
    "IES Auringis": { localidad: "jaen", comunidad: "Andalucía" },
    "IES Jabalcuz": { localidad: "jaen", comunidad: "Andalucía" }
  };

  // ====================================================
  // ELEMENTOS DEL DOM
  // ====================================================
  const selectInstituto = document.getElementById("instituto");
  const inputLocalidad = document.getElementById("localidadAuto");
  const inputComunidad = document.getElementById("comunidadAuto");

  if (!selectInstituto) return;

  // ====================================================
  // CARGAR INSTITUTOS EN SELECT
  // ====================================================
  Object.keys(datosInstitutos).forEach(nombre => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    selectInstituto.appendChild(option);
  });

  // ====================================================
  // AUTO RELLENO LOCALIDAD + COMUNIDAD
  // ====================================================
  selectInstituto.addEventListener("change", function () {

    const inst = datosInstitutos[this.value];

    if (!inst) return;

    inputLocalidad.value = inst.localidad;
    inputComunidad.value = inst.comunidad;
  });

});

console.log("Frontend listo 🚀");
