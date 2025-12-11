function accederItinerario() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        // No logueado → mensaje + redirección
        alert("Oops 😅\nNo tienes una cuenta activa. Debes registrarte para ver tu itinerario.");
        window.location.href = "registro.html";
    } else {
        // Logueado → acceso permitido
        window.location.href = "itinerario.html";
    }
}
