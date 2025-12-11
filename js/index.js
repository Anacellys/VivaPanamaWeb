window.onload = function () {
    actualizarNavbar();
};

function actualizarNavbar() {
    const usuario = localStorage.getItem("usuario");

    const login = document.getElementById("link-login");
    const perfil = document.getElementById("link-perfil");
    const logoutBtn = document.getElementById("btn-logout");

    // Reset de visibilidad
    login.style.display = "none";
    perfil.style.display = "none";
    logoutBtn.style.display = "none";

    if (usuario) {
        // Usuario autenticado
        perfil.style.display = "inline-block";
        logoutBtn.style.display = "inline-block";
    } else {
        // Visitante
        login.style.display = "inline-block";
    }
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
} 
// para el pop-up 
function accederItinerario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        // Mostrar popup
        document.getElementById("popup-login").style.display = "flex";
        return;
    }

    // Si está logeado, lo manda a su itinerario
    window.location.href = "itinerario.html";
}

// Botones del popup
function irLogin() {
    window.location.href = "login.html";
}
function irRegistro() {
    window.location.href = "registro.html";
}
function cerrarPopup() {
    document.getElementById("popup-login").style.display = "none";
}

