// Mostrar modal solo si NO está logeado
window.onload = function () {
    const usuario = localStorage.getItem("idUsuario");

    if (!usuario) {
        const modal = document.getElementById("modal-acceso");
        if (modal) modal.style.display = "flex";
    }
};

// Continuar sin cuenta
function continuarInvitado() {
    localStorage.setItem("invitado", "true");
    const modal = document.getElementById("modal-acceso");
    if (modal) modal.style.display = "none";
}

// Ir a registro
function irRegistro() {
    window.location.href = "registro.html";
}
