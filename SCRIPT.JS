// ===============================
// 📌 CONFIGURACIÓN
// ===============================

// Código secreto para abrir la caja fuerte
const codigoCorrecto = "1234";

// Fecha de inicio de la relación (para el contador ❤️)
const fechaInicio = new Date("2023-06-01T00:00:00");

// ===============================
// 📌 VARIABLES
// ===============================
const textoCodigo = document.getElementById("texto-codigo");
const botones = document.querySelectorAll(".botones button");
const seccionContador = document.getElementById("seccion-contador");
const seccionGaleria = document.querySelector(".seccion-galeria");
const seccionCarta = document.querySelector(".seccion-carta");
const loadingCarta = document.getElementById("loadingCarta");

let inputCodigo = "";

// ===============================
// 📌 MANEJO DEL TECLADO
// ===============================
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;

    if (valor === "←") {
      inputCodigo = inputCodigo.slice(0, -1);
    } else if (valor === "✔") {
      if (inputCodigo === codigoCorrecto) {
        document.querySelector(".container").style.display = "none";
        seccionContador.style.display = "block";
        iniciarContador();
      } else {
        alert("❌ Código incorrecto, intenta de nuevo.");
        inputCodigo = "";
      }
    } else {
      if (inputCodigo.length < 6) {
        inputCodigo += valor;
      }
    }

    textoCodigo.textContent = inputCodigo;
  });
});

// ===============================
// 📌 CONTADOR
// ===============================
function iniciarContador() {
  setInterval(() => {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    // Línea superior
    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;

    // Cajas inferiores
    document.getElementById("diasBox").textContent = dias;
    document.getElementById("horasBox").textContent = horas;
    document.getElementById("minutosBox").textContent = minutos;
    document.getElementById("segundosBox").textContent = segundos;
  }, 1000);
}

// ===============================
// 📌 NAVEGACIÓN ENTRE SECCIONES
// ===============================

// Botón de "Ver galería"
document.querySelector(".boton-contador").addEventListener("click", () => {
  seccionContador.style.display = "none";
  seccionGaleria.style.display = "block";
});

// Botón de "Ver carta"
document.querySelector(".boton-transparente").addEventListener("click", () => {
  seccionGaleria.style.display = "none";
  loadingCarta.style.display = "flex";

  // Simular carga de la carta
  let progreso = 0;
  const barra = document.querySelector(".loading-bar");

  const interval = setInterval(() => {
    progreso += 10;
    barra.style.width = progreso + "%";

    if (progreso >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingCarta.classList.add("hidden");
        seccionCarta.style.display = "block";
      }, 500);
    }
  }, 300);
});

// Botón de volver en carta
document.querySelector(".seccion-carta button").addEventListener("click", () => {
  seccionCarta.style.display = "none";
  seccionContador.style.display = "block";
});
