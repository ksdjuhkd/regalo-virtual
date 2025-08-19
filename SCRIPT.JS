// Contraseña predefinida
const CONTRASENA = "22125"; 

let contrasenaIngresada = "";

// ==========================
// FUNCIONES DE CONTRASEÑA
// ==========================
function agregarNumero(numero) {
    const textoCodigo = document.getElementById('texto-codigo');
    const display = document.querySelector('.display');

    if (textoCodigo.textContent === 'Contraseña') {
        textoCodigo.textContent = '';
    }

    textoCodigo.textContent += '*';
    contrasenaIngresada += numero;
    display.classList.add('modo-password');

    if (contrasenaIngresada.length === CONTRASENA.length) {
        if (contrasenaIngresada === CONTRASENA) {
            mostrarContador(); 
        } else {
            alert("Contraseña incorrecta. Inténtalo de nuevo."); 
            textoCodigo.textContent = 'Contraseña';
            display.classList.remove('modo-password');
            contrasenaIngresada = "";
        }
    }
}

function mostrarContador() {
    const container = document.querySelector('.container');
    const seccionContador = document.getElementById('seccion-contador');

    container.style.display = 'none';
    seccionContador.style.display = 'block';
}

// ==========================
// CONTADOR
// ==========================
function actualizarContador() {
    const fechaInicio = new Date('2001-06-02'); 
    const ahora = new Date();

    let anos = ahora.getFullYear() - fechaInicio.getFullYear();
    let meses = ahora.getMonth() - fechaInicio.getMonth();
    let dias = ahora.getDate() - fechaInicio.getDate();
    let horas = ahora.getHours() - fechaInicio.getHours();
    let minutos = ahora.getMinutes() - fechaInicio.getMinutes();
    let segundos = ahora.getSeconds() - fechaInicio.getSeconds();

    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    document.getElementById('anos').textContent = anos;
    document.getElementById('meses').textContent = meses;
    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas;
    document.getElementById('minutos').textContent = minutos;
    document.getElementById('segundos').textContent = segundos;
}

setInterval(actualizarContador, 1000);

// ==========================
// GALERÍA
// ==========================
function mostrarGaleria() {
    document.getElementById('seccion-contador').style.display = 'none';
    document.getElementById('seccion-carta').style.display = 'none';
    document.getElementById('seccion-galeria').style.display = 'block';
}

// ==========================
// CARTA (con pantalla de carga)
// ==========================
function mostrarCarta() {
    const seccionGaleria = document.getElementById('seccion-galeria');
    const seccionCarta = document.getElementById('seccion-carta');

    // Crear pantalla de carga temporal
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loading-screen');
    loadingScreen.innerHTML = `
        <div class="loading-heart">♥</div>
        <div class="loading-bar-container">
            <div class="loading-bar" id="loadingBar"></div>
        </div>
        <div class="loading-text">Cargando carta...</div>
    `;
    document.body.appendChild(loadingScreen);

    const loadingBar = loadingScreen.querySelector('#loadingBar');
    let progress = 0;

    function updateProgress() {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        loadingBar.style.width = progress + '%';

        if (progress < 100) {
            setTimeout(updateProgress, 100 + Math.random() * 200);
        } else {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();

                    // Ocultar la galería y mostrar carta
                    seccionGaleria.style.display = 'none';
                    seccionCarta.style.display = 'block';

                    // =====================
                    // INICIAR CORAZONCITOS AQUÍ
                    // =====================
                    setInterval(lanzarCorazones, 800);

                }, 500);
            }, 300);
        }
    }

    updateProgress();
}

// ==========================
// GENERADOR DE CORAZONCITOS
// ==========================
function lanzarCorazones() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}