/* === LÓGICA SECCIONES === */
function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach((sec) => {
    sec.style.display = "none";
  });

  const seccionActiva = document.getElementById(id);
  if (seccionActiva) {
    if (seccionActiva.classList.contains("custom-inicio")) {
      seccionActiva.style.display = "flex";
    } else {
      seccionActiva.style.display = "block";
    }
  }

  // Cámara activa solo en su sección
  document.getElementById("asistente").style.display =
    id === "asistente" ? "block" : "none";
  document.getElementById("camara").style.display =
    id === "camara" ? "block" : "none";

  if (id === "camara") {
    iniciarCamara();
  }
}

/* === MENU HAMBURGUESA === */
function toggleMenu() {
  document.querySelector("nav").classList.toggle("activo");
  document.querySelector("nav ul").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
}

function closeMenu() {
  document.querySelector("nav").classList.remove("activo");
  document.querySelector("nav ul").classList.remove("active");
  document.querySelector(".hamburger").classList.remove("active");
}

/* === LOGIN / SESIÓN === */
function iniciarSesion(nombre) {
  document.getElementById("userName").textContent = nombre;
  document.getElementById("userPanel").style.display = "flex";
  document.getElementById("nav-login").style.display = "none";
  mostrarSeccion("inicio");
}

function cerrarSesion() {
  document.getElementById("userPanel").style.display = "none";
  document.getElementById("nav-login").style.display = "inline";
  document.getElementById("userDropdown").style.display = "none";
}

function toggleDropdown() {
  const dropdown = document.getElementById("userDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

function procesarLogin() {
  const nombreUsuario = document.getElementById("usuarioInput").value.trim();
  if (nombreUsuario) {
    iniciarSesion(nombreUsuario);
  } else {
    alert("Por favor, ingresa un nombre de usuario válido.");
  }
}

function togglePassword() {
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
}

/* === RESET MENU AL RESIZE === */
window.addEventListener("resize", () => {
  const navUl = document.querySelector("nav ul");
  const hamburger = document.querySelector(".hamburger");
  if (window.innerWidth > 768) {
    navUl?.classList.remove("active");
    hamburger?.classList.remove("active");
  }
});

/* === INICIAR / APAGAR CAMARA === */
let stream = null;

async function encenderCamara() {
  const video = document.getElementById("video");
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("No se pudo acceder a la cámara: " + err.message);
  }
}

function apagarCamara() {
  const video = document.getElementById("video");
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    stream = null;
  }
}

/* === VALIDACION FORMULARIO CONTACTO === */
const form = document.querySelector('form[name="frm"]');
form.addEventListener("submit", (event) => {
  const fname = form.elements["nombres"].value;
  const flastname = form.elements["apellidos"].value;
  const fphone = form.elements["telefono"].value;
  const femail = form.elements["email"].value;

  if (!fname || !flastname || !fphone || !femail) {
    event.preventDefault();
    alert("Por favor, complete todos los campos del formulario");
  } else if (!validateEmail(femail)) {
    event.preventDefault();
    alert("Por favor, ingrese un correo válido");
  } else {
    const confirmation = confirm(
      "Está a punto de enviar el formulario, ¿Desea continuar?"
    );
    if (!confirmation) {
      event.preventDefault();
    }
  }
});

function validateEmail(femail) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(femail).toLowerCase());
}

/* === RANKING FORO === */
let estudiantes = [];

document.getElementById("notaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const usuario = document.getElementById("user").value.trim();
  const nombres = document.getElementById("name").value.trim();
  const apellidos = document.getElementById("lastname").value.trim();
  const pais = document.getElementById("country").value;
  const tipo = document.getElementById("tcoment").value;
  const notaStr = document.getElementById("note").value;
  const nota = Number(notaStr);
  const comentario = document.getElementById("coment").value.trim();

  if (
    usuario === "" ||
    nombres === "" ||
    apellidos === "" ||
    pais === "" ||
    tipo === "" ||
    notaStr === "" ||
    comentario === "" ||
    isNaN(nota) ||
    nota < 0 ||
    nota > 5
  ) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const nuevo = { usuario, nombres, apellidos, pais, tipo, nota, comentario };
  estudiantes.push(nuevo);
  estudiantes.sort((a, b) => b.nota - a.nota);
  mostrarRanking();
  this.reset();
});

function mostrarRanking() {
  const lista = document.getElementById("listaEstudiantes");
  lista.innerHTML = "";
  estudiantes.forEach((est) => {
    const li = document.createElement("li");
    li.className = "barra-progreso";
    const barra = document.createElement("div");
    barra.className = "progreso";
    barra.style.width = `${(est.nota / 5) * 100}%`;
    const texto = document.createElement("span");
    texto.innerHTML = `
      <strong>Usuario:</strong> ${est.usuario}<br>
      <strong>Ubicación:</strong> ${est.pais}<br>
      <strong>Tipo de comentario:</strong> ${est.tipo}<br>
      <strong>Valoración:</strong> ${est.nota} / 5<br>
      <strong>Comentario:</strong> ${est.comentario}
    `;
    li.appendChild(barra);
    li.appendChild(texto);
    lista.appendChild(li);
  });
}

/* === CONFIGURACIÓN: MODO OSCURO === */
function toggleModoOscuro() {
  document.body.classList.toggle("dark-mode");
}

/* === CONFIGURACIÓN: CONTRASTE ALTO === */
function toggleContraste() {
  document.body.classList.toggle("high-contrast");
}

/* === CONFIGURACIÓN: CAMBIO DE FUENTE === */
function cambiarFuente() {
  const fuente = document.getElementById("fuente").value;
  document.body.classList.remove("Arial", "Verdana", "Georgia");
  document.body.classList.add(fuente);
}

/* === CONFIGURACIÓN: NEGRITA === */
function toggleNegrita() {
  document.body.classList.toggle("bold-text");
}

/* === CONFIGURACIÓN: CAMBIO DE IDIOMA (demo) === */
let idioma = "ES";
function cambiarIdioma() {
  if (idioma === "ES") {
    idioma = "EN";
    alert("Idioma cambiado a Inglés (demo)");
  } else {
    idioma = "ES";
    alert("Idioma cambiado a Español (demo)");
  }
}

/* === FAVORITOS (SIMULADOR) === */
let favoritos = [];

function guardarFavorito(ruta) {
  favoritos.push(ruta);
  actualizarFavoritos();
}

function actualizarFavoritos() {
  const cont = document.getElementById("listaFavoritos");
  if (favoritos.length === 0) {
    cont.innerHTML = "<p>No tienes rutas guardadas todavía.</p>";
  } else {
    cont.innerHTML = favoritos.map((f, i) => `<p>${i + 1}. ${f}</p>`).join("");
  }
}

const opciones = {
  Universidad: {
    ubicaciones: [
      "UPC Monterrico",
      "UPC San Isidro",
      "UPC Villa",
      "San Miguel",
    ],
    puntos: [
      "Entrada Principal",
      "Salida",
      "Biblioteca",
      "Cafetería",
      "Salón 101",
      "Salón 102",
      "Laboratorio",
      "Ascensores",
    ],
  },
  Hospital: {
    ubicaciones: [
      "Hospital Central",
      "Clínica Salud Total",
      "Centro Médico Norte",
    ],
    puntos: [
      "Recepción",
      "Emergencias",
      "Habitación 101",
      "Habitación 102",
      "Sala de Espera",
      "Ascensores",
      "Cafetería",
      "Laboratorio",
    ],
  },
  Restaurante: {
    ubicaciones: ["Restaurante Gourmet", "Café Express", "Buffet Plaza"],
    puntos: [
      "Entrada Principal",
      "Salida",
      "Mostrador",
      "Cocina",
      "Baños",
      "Área de Mesas",
      "Terraza",
    ],
  },
};

function cargarOpciones() {
  const entorno = document.getElementById("entorno").value;
  const ubicacion = document.getElementById("ubicacion");
  const desde = document.getElementById("desde");
  const hasta = document.getElementById("hasta");

  ubicacion.innerHTML = '<option value="">Selecciona</option>';
  desde.innerHTML = '<option value="">Selecciona</option>';
  hasta.innerHTML = '<option value="">Selecciona</option>';

  if (!entorno) return;

  opciones[entorno].ubicaciones.forEach((op) => {
    const option = document.createElement("option");
    option.value = op;
    option.textContent = op;
    ubicacion.appendChild(option);
  });

  opciones[entorno].puntos.forEach((op) => {
    const optionDesde = document.createElement("option");
    optionDesde.value = op;
    optionDesde.textContent = op;
    desde.appendChild(optionDesde);

    const optionHasta = document.createElement("option");
    optionHasta.value = op;
    optionHasta.textContent = op;
    hasta.appendChild(optionHasta);
  });
}

let ultimoSimulacion = null;

function simularRuta() {
  const entorno = document.getElementById("entorno").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const desde = document.getElementById("desde").value;
  const hasta = document.getElementById("hasta").value;
  const alerta = document.getElementById("alertaSimulador");
  const resultado = document.getElementById("resultadoSimulador");
  const tiempo = document.getElementById("tiempoEstimado");

  alerta.textContent = "";
  resultado.innerHTML = "";
  tiempo.textContent = "";

  if (!entorno || !ubicacion || !desde || !hasta) {
    alerta.textContent = "Por favor, completa todos los campos.";
    return;
  }

  if (desde === hasta) {
    alerta.textContent = "El punto de partida y destino no pueden ser iguales.";
    return;
  }

  let pasos = [];

  if (entorno === "Universidad") {
    pasos = [
      `Sal desde ${desde}.`,
      `Camina por el pasillo principal de ${ubicacion}.`,
      `Gira a la derecha al ver el patio central.`,
      `Sube las escaleras o usa los ascensores.`,
      `Sigue los carteles hacia la zona académica.`,
      `Has llegado a ${hasta}.`,
    ];
    if (hasta.includes("Laboratorio") || hasta.includes("Biblioteca")) {
      pasos.push("Recuerda tener tu carnet de estudiante a mano.");
    }
  } else if (entorno === "Hospital") {
    pasos = [
      `Inicia en ${desde}.`,
      `Dirígete a la recepción de ${ubicacion}.`,
      `Toma el ascensor al piso correspondiente.`,
      `Sigue la señalización hasta tu destino.`,
      `Has llegado a ${hasta}.`,
    ];
    if (hasta.includes("Emergencias")) {
      pasos.unshift("Llama al personal de apoyo si es necesario.");
    }
    if (hasta.includes("Habitación")) {
      pasos.push("Toca la puerta antes de entrar.");
    }
  } else if (entorno === "Restaurante") {
    pasos = [
      `Empieza desde ${desde}.`,
      `Camina hasta la zona principal de ${ubicacion}.`,
      `Busca el área de mesas asignadas.`,
      `Ubica tu mesa y siéntate.`,
      `Has llegado a ${hasta}.`,
    ];
    if (hasta.includes("Cocina")) {
      pasos.push("Recuerda tener permiso para entrar a la cocina.");
    }
    if (hasta.includes("Terraza")) {
      pasos.splice(2, 0, "Cruza la puerta de la terraza.");
    }
  }

  pasos.forEach((paso) => {
    const li = document.createElement("li");
    li.textContent = paso;
    resultado.appendChild(li);
  });

  // Calcular tiempo estimado (2–10 min aleatorio)
  const tiempoMin = Math.floor(Math.random() * 9) + 2;
  tiempo.textContent = `Tiempo estimado: ${tiempoMin} minutos`;

  // Guardar datos actuales para usar en "Guardar"
  ultimoSimulacion = {
    entorno,
    ubicacion,
    desde,
    hasta,
    tiempo: tiempoMin,
  };
}

function reiniciarSimulador() {
  document.getElementById("entorno").value = "";
  document.getElementById("ubicacion").innerHTML =
    '<option value="">Selecciona</option>';
  document.getElementById("desde").innerHTML =
    '<option value="">Selecciona</option>';
  document.getElementById("hasta").innerHTML =
    '<option value="">Selecciona</option>';
  document.getElementById("alertaSimulador").textContent = "";
  document.getElementById("resultadoSimulador").innerHTML = "";
  document.getElementById("tiempoEstimado").textContent = "";
  ultimoSimulacion = null;
}

function guardarRuta() {
  if (!ultimoSimulacion) {
    alert("Primero simula una ruta antes de guardar.");
    return;
  }

  const lista = document.getElementById("listaFavoritos");

  const div = document.createElement("div");
  div.className = "ruta-guardada";
  div.innerHTML = `
    <strong>Entorno:</strong> ${ultimoSimulacion.entorno}<br>
    <strong>Ubicación:</strong> ${ultimoSimulacion.ubicacion}<br>
    <strong>Desde:</strong> ${ultimoSimulacion.desde}<br>
    <strong>Hasta:</strong> ${ultimoSimulacion.hasta}<br>
    <strong>Tiempo Estimado:</strong> ${ultimoSimulacion.tiempo} min
    <hr>
  `;

  lista.appendChild(div);

  reiniciarSimulador();
}

// Simula publicaciones guardadas (puedes conectarlo a tu botón de Publicar)
let publicaciones = [
  {
    usuario: "Carlos",
    pais: "Perú",
    valoracion: 5,
    tipo: "Bueno",
    comentario: "Excelente servicio",
  },
  {
    usuario: "Ana",
    pais: "España",
    valoracion: 2,
    tipo: "Malo",
    comentario: "No me gustó",
  },
];

function filtrarForo() {
  const filtroPais = document
    .getElementById("filtroPais")
    .value.trim()
    .toLowerCase();
  const filtroValoracion = document.getElementById("filtroValoracion").value;

  const cards = document.querySelectorAll(".alquiler-card");
  const publicaciones = document.querySelectorAll("#listaEstudiantes li");

  let encontrados = 0;

  cards.forEach((card) => {
    let pais = card.getAttribute("data-pais").toLowerCase();
    const valoracion = card.getAttribute("data-valoracion");

    let coincide = true;
    if (filtroPais && !pais.includes(filtroPais)) coincide = false;
    if (filtroValoracion && valoracion !== filtroValoracion) coincide = false;

    card.style.display = coincide ? "block" : "none";
    if (coincide) encontrados++;
  });

  publicaciones.forEach((publi) => {
    let pais = publi.getAttribute("data-pais")?.toLowerCase() || "";
    const valoracion = publi.getAttribute("data-valoracion") || "";

    let coincide = true;
    if (filtroPais && !pais.includes(filtroPais)) coincide = false;
    if (filtroValoracion && valoracion !== filtroValoracion) coincide = false;

    publi.style.display = coincide ? "block" : "none";
    if (coincide) encontrados++;
  });

  if (encontrados === 0) {
    alert("No se encontraron resultados con los filtros aplicados.");
  }
}

function publicarComentario() {
  const usuario = document.getElementById("usuarioPublicar").value.trim();
  const pais = document.getElementById("paisPublicar").value.trim();
  const valoracion = document.getElementById("valoracionPublicar").value.trim();
  const comentario = document.getElementById("comentarioPublicar").value.trim();

  if (!usuario || !pais || !valoracion || !comentario) {
    alert("Por favor completa todos los campos antes de publicar.");
    return;
  }

  // 👉 MIS PUBLICACIONES
  const listaMisPublicaciones = document.getElementById("listaEstudiantes");
  const nuevaPublicacion = document.createElement("li");
  nuevaPublicacion.setAttribute("data-pais", pais); // IMPORTANTE
  nuevaPublicacion.setAttribute("data-valoracion", valoracion); // IMPORTANTE

  nuevaPublicacion.innerHTML = `
    <p><strong>Usuario:</strong> ${usuario}</p>
    <p><strong>Ubicación:</strong> ${pais}</p>
    <p><strong>Valoración:</strong> ${valoracion} / 5</p>
    <p><strong>Comentario:</strong> ${comentario}</p>
  `;

  listaMisPublicaciones.appendChild(nuevaPublicacion);

  // 👉 CARDS FORO
  const cardsForo = document.getElementById("alquilerCards");
  const nuevaCard = document.createElement("div");
  nuevaCard.className = "alquiler-card";
  nuevaCard.setAttribute("data-pais", pais);
  nuevaCard.setAttribute("data-valoracion", valoracion);

  nuevaCard.innerHTML = `
    <p><strong>Usuario:</strong> ${usuario}</p>
    <p><strong>Ubicación:</strong> ${pais}</p>
    <p><strong>Valoración:</strong> ${valoracion} / 5</p>
    <p><strong>Comentario:</strong> ${comentario}</p>
  `;

  cardsForo.appendChild(nuevaCard);

  document.getElementById("formPublicar").reset();
  alert("¡Publicación registrada y añadida al Foro!");
}
