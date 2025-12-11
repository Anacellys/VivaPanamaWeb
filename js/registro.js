

async function registrar() {
    const nombre = document.getElementById("nombre_usuario").value.trim();
    const pass = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const mensaje = document.getElementById("mensaje");

   
    mensaje.innerHTML = "";
    mensaje.className = "";

   
    if (!nombre || !pass) {
        mostrarError("Nombre de usuario y contraseña son obligatorios.");
        return;
    }

    if (nombre.length < 3) {
        mostrarError("El nombre de usuario debe tener al menos 3 caracteres.");
        return;
    }

    if (pass.length < 6) {
        mostrarError("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    if (edad && (edad < 1 || edad > 120)) {
        mostrarError("Por favor, ingresa una edad válida (1-120).");
        return;
    }

    try {
        
        const resp = await fetch("https://localhost:7029/api/Usuarios", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                nombre_usuario: nombre,
                password: pass,
                email_usuario: email,
                cedula_pasaporte: cedula,
                edad_usuario: edad ? parseInt(edad) : null,
                tipo_usuario: "cliente"
            })
        });

        const text = await resp.text();

        if (!resp.ok) {
            // Intentar parsear como JSON si es posible
            try {
                const errorData = JSON.parse(text);
                mostrarError(errorData.message || text);
            } catch {
                mostrarError(text || "Error en el registro");
            }
            return;
        }

     
        mostrarExito("Registro exitoso. Redirigiendo a login...");

        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        console.error("Error en registro:", error);
        mostrarError("Error al conectar con el servidor. Verifica tu conexión.");
    }
}


function mostrarError(texto) {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = texto;
    mensaje.className = "error";
}

function mostrarExito(texto) {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = texto;
    mensaje.className = "success";
}


document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-container input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                registrar();
            }
        });
    });
});