async function iniciarSesion() {
    const usuario = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("mensaje");

    mensaje.innerHTML = "";
    mensaje.className = "";

    if (!usuario || !password) {
        mensaje.innerHTML = "Todos los campos son obligatorios.";
        mensaje.className = "error";
        return;
    }

    try {
        const respuesta = await fetch("https://localhost:7029/api/Usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre_usuario: usuario,
                password: password
            })
        });

        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            mensaje.innerHTML = errorTexto;
            mensaje.className = "error";
            return;
        }

        const data = await respuesta.json();
        mensaje.innerHTML = "Login exitoso. Redirigiendo...";
        mensaje.className = "success";

        localStorage.setItem("usuario", JSON.stringify(data));

       
       
       setTimeout(() => {
    localStorage.setItem("usuario", JSON.stringify(data));
    window.location.href = "index.html";
     }, 1500);


    } catch (error) {
        mensaje.innerHTML = "Error al conectar con la API.";
        mensaje.className = "error";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById("password");
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            iniciarSesion();
        }
    });
});