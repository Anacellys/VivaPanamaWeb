// Obtener parámetro provincia desde la URL
const params = new URLSearchParams(window.location.search);
const provincia = params.get("provincia");

document.getElementById("titulo-provincia").innerText = 
    `Actividades en ${provincia}`;

// Cargar actividades desde la API
async function cargarActividades() {
    const contenedor = document.getElementById("lista-actividades");

    try {
        const res = await fetch(`http://185.202.239.31:5000/api/actividad/provincia/${provincia}`);
        const actividades = await res.json();

        actividades.forEach(act => {
            contenedor.innerHTML += `
                <div class="actividad-card">
                    <img class="actividad-img" 
                         src="${act.imagenUrl || 'img/placeholder.jpg'}" 
                         alt="${act.nombre_actividad}">

                    <div class="actividad-info">
                        <h3>${act.nombre_actividad}</h3>
                        <p>${act.descripcion_actividad}</p>
                        <p><strong>Costo:</strong> $${act.costo_actividad ?? '0'}</p>
                        <p><strong>Horario:</strong> ${act.horario_apertura} - ${act.horario_cierre}</p>
                        <p><strong>Duración:</strong> ${act.duracion_estimada} min</p>

                        <button class="btn-agregar" onclick="añadir(${act.id_actividad})">
                            Añadir al itinerario
                        </button>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error cargando actividades:", error);
    }
}

cargarActividades();

// Añadir al Itinerario
function añadir(idActividad) {

    const usuario = localStorage.getItem("idUsuario");
    if (!usuario) {
        alert("Debes registrarte para armar un itinerario.");
        return;
    }

    // Enviar al API
    fetch("http://185.202.239.31:5000/api/itinerario/agregarActividad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_usuario: usuario,
            id_actividad: idActividad
        })
    })
    .then(res => {
        if (res.ok) {
            alert("Actividad añadida al itinerario!");
        } else {
            alert("Hubo un error al añadir la actividad.");
        }
    })
    .catch(err => console.log(err));
}
