let usuarioActual = null;

// ========================================
// 🔹 Cargar datos del usuario
// ========================================
window.addEventListener("load", () => {
    usuarioActual = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioActual) {
        alert("No has iniciado sesión.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("nombre").value = usuarioActual.nombre;
    document.getElementById("email").value = usuarioActual.email;
    document.getElementById("cedula").value = usuarioActual.cedula_pasaporte;
    document.getElementById("edad").value = usuarioActual.edad ?? "";
});

// ========================================
// 🔹 Enviar actualización al API
// ========================================
async function actualizarPerfil() {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "";
    mensaje.className = "";

    const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        cedula_pasaporte: document.getElementById("cedula").value.trim(),
        edad: parseInt(document.getElementById("edad").value),
        password: document.getElementById("password").value.trim()
    };

    if (datos.password === "") delete datos.password;

    try {
        const respuesta = await fetch(
            `https://localhost:7029/api/Usuarios/${usuarioActual.id_usuario}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            }
        );

        if (!respuesta.ok) {
            const error = await respuesta.text();
            mensaje.innerHTML = error;
            mensaje.className = "error";
            return;
        }

        mensaje.innerHTML = "Perfil actualizado correctamente ✔️";
        mensaje.className = "success";

        // Actualizar datos locales
        usuarioActual = { ...usuarioActual, ...datos };
        localStorage.setItem("usuario", JSON.stringify(usuarioActual));

    } catch (error) {
        mensaje.innerHTML = "Error al conectar con la API ❌";
        mensaje.className = "error";
    }
}
