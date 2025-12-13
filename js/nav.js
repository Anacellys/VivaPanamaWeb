// ========================================
// 🔹 NAVBAR GLOBAL
// ========================================

// Ejecutar al cargar la página (SIN pisar otros scripts)
window.addEventListener("load", () => {
    actualizarNavbar();
});

// ----------------------------------------
// Mostrar / ocultar opciones del navbar
// ----------------------------------------
function actualizarNavbar() {
    const usuario = localStorage.getItem("usuario");

    const login = document.getElementById("link-login");
    const perfil = document.getElementById("link-perfil");
    const logoutBtn = document.getElementById("btn-logout");

    if (!login || !perfil || !logoutBtn) return;

    // Reset
    login.style.display = "none";
    perfil.style.display = "none";
    logoutBtn.style.display = "none";

    if (usuario) {
        perfil.style.display = "inline-block";
        logoutBtn.style.display = "inline-block";
    } else {
        login.style.display = "inline-block";
    }
}

// ----------------------------------------
// Logout
// ----------------------------------------
function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

// ----------------------------------------
// Acceso a Itinerario con popup
// ----------------------------------------
function accederItinerario() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        const popup = document.getElementById("popup-login");
        if (popup) popup.style.display = "flex";
        return;
    }

    // Se respeta el nombre que estás usando
    window.location.href = "itenerario.html";
}

// ----------------------------------------
// Botones del popup
// ----------------------------------------
function irLogin() {
    window.location.href = "login.html";
}

function irRegistro() {
    window.location.href = "registro.html";
}

function cerrarPopup() {
    const popup = document.getElementById("popup-login");
    if (popup) popup.style.display = "none";
}
