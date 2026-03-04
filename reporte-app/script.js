// Registrar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

// Verificar sesión al cargar
window.onload = function() {
    if(localStorage.getItem("sesionActiva") === "true"){
        mostrarApp();
    }
    cargarAlumnos();
}

// Clave ofuscada (PROFRCALL en base64)
const claveCorrecta = "UFJPRlJDQUxM";

function verificarClave(){
    let claveIngresada = document.getElementById("clave").value;
    let claveBase64 = btoa(claveIngresada);

    if(claveBase64 === claveCorrecta){
        localStorage.setItem("sesionActiva","true");
        mostrarApp();
    } else {
        document.getElementById("error").innerText = "Clave incorrecta";
    }
}

function mostrarApp(){
    document.getElementById("login-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
}

function cerrarSesion(){
    localStorage.removeItem("sesionActiva");
    location.reload();
}

// Guardar alumnos
function guardarAlumno(){
    let alumnoInput = document.getElementById("alumno");
    let nombre = alumnoInput.value.toUpperCase();

    if(nombre === "") return;

    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

    alumnos.push(nombre);

    localStorage.setItem("alumnos", JSON.stringify(alumnos));

    alumnoInput.value = "";
    cargarAlumnos();
}

function cargarAlumnos(){
    let lista = document.getElementById("listaAlumnos");
    lista.innerHTML = "";

    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

    alumnos.forEach(function(alumno){
        let li = document.createElement("li");
        li.textContent = alumno;
        lista.appendChild(li);
    });
}