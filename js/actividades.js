const API = "https://localhost:7029/api/Actividades";
const IMG_DEFAULT = "img/defaut.jpg";

function getProvincia() {
    const params = new URLSearchParams(window.location.search);
    return params.get("provincia");
}

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

        const filtradas = provincia
            ? actividades.filter(a => a.lugar.provincia === provincia)
            : actividades;

        contenedor.innerHTML = "";

        if (filtradas.length === 0) {
            contenedor.innerHTML = "<p>No hay actividades en esta provincia.</p>";
            return;
        }

        filtradas.forEach(a => {
            contenedor.innerHTML += `
                <div class="prov-card">
                    <img src="${IMG_DEFAULT}">
                    <div class="prov-info">
                        <h3>${a.nombre}</h3>
                        <p>${a.descripcion}</p>
                        <p><strong>Costo:</strong> ${a.costo === 0 ? "Gratis" : "$" + a.costo}</p>
                        <p><strong>Horario:</strong> ${a.horario}</p>
                        <p><strong>Disponibilidad:</strong> ${a.disponibilidad}</p>
                        <button onclick="agregarItinerario(${a.id_actividad}, '${a.nombre}')">
                            Agregar al Itinerario
                        </button>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        contenedor.innerHTML = "<p>Error al cargar actividades.</p>";
    }
});


function agregarItinerario(id, nombre) {
   
    let itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];

   
    if (!itinerario.some(a => a.id === id)) {
        itinerario.push({ id, nombre });
        localStorage.setItem("itinerario", JSON.stringify(itinerario));
        alert(`${nombre} agregado al itinerario.`);
    } else {
        alert(`${nombre} ya está en tu itinerario.`);
    }
}


