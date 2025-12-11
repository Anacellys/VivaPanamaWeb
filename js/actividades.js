const API = "https://localhost:7029/api/Actividades";
const IMG_DEFAULT = "img/default.jpg";

// ===============================
// LEER PARAMETRO DE LA URL
// ===============================
function getProvincia() {
    const params = new URLSearchParams(window.location.search);
    return params.get("provincia");
}

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
    const provincia = getProvincia();
    const titulo = document.getElementById("titulo-provincia");
    const subtitulo = document.getElementById("subtitulo");
    const contenedor = document.getElementById("contenedor-actividades");

    if (provincia) {
        titulo.textContent = `Actividades en ${provincia}`;
        subtitulo.textContent = `Descubre qué hacer en ${provincia}`;
    }

    contenedor.innerHTML = "<p>Cargando actividades...</p>";

    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("Error al cargar actividades");

        const actividades = await res.json();

        // FILTRAR POR PROVINCIA
        const filtradas = provincia
            ? actividades.filter(a => a.lugar.provincia === provincia)
            : actividades;

        contenedor.innerHTML = "";

        if (filtradas.length === 0) {
            contenedor.innerHTML = "<p>No hay actividades en esta provincia.</p>";
            return;
        }

        // Renderizar actividades
        filtradas.forEach(a => {
            contenedor.innerHTML += `
                <div class="prov-card" onclick="verActividad(${a.id_actividad})">
                    <img src="${IMG_DEFAULT}">
                    <div class="prov-info">
                        <h3>${a.nombre}</h3>
                        <p>${a.descripcion}</p>
                        <p><strong>Costo:</strong> ${a.costo === 0 ? "Gratis" : "$" + a.costo}</p>
                        <p><strong>Horario:</strong> ${a.horario}</p>
                        <p><strong>Disponibilidad:</strong> ${a.disponibilidad}</p>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        contenedor.innerHTML = "<p>Error al cargar actividades.</p>";
    }
});

// ===============================
// REDIRIGIR A DETALLE (opcional)
// ===============================
function verActividad(id) {
    window.location.href = "actividad.html?id=" + id;
}
