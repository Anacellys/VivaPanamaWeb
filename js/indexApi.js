const API = "https://localhost:7029/api";

// ------------------ Redirecciones ------------------
function irRegistro() { window.location.href = "registro.html"; }
function irLogin() { window.location.href = "login.html"; }

// ------------------ Modal ------------------
function mostrarModalAcceso() {
    document.getElementById('modal-acceso').style.display = 'flex';
}

function continuarInvitado() {
    document.getElementById('modal-acceso').style.display = 'none';
    cargarHotelesPreview();
}

// ------------------ Rutas protegidas ------------------
function verItinerario() {
    if (isLoggedIn()) window.location.href = "itinerario.html";
    else mostrarModalAcceso();
}

// ------------------ Cargar secciones robusta (solo nombre y precio) ------------------
async function cargarSeccion(endpoint, contenedorId) {
    const cont = document.getElementById(contenedorId);
    cont.innerHTML = "<p>Cargando...</p>";

    try {
        const res = await fetch(`${API}/Hoteles${endpoint}`);
        if (!res.ok) throw new Error("Error en API");

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
            cont.innerHTML = "<p>No hay datos disponibles.</p>";
            return;
        }

        let html = "";

        data.slice(0, 6).forEach(item => {
            const nombre = item.nombre || item.nombre_hotel || "Sin nombre";
            const precio = item.precio_noche !== undefined ? `$${item.precio_noche}` : "Precio no disponible";

            html += `
                <div class="prov-card" onclick="verDetalle('${endpoint}', ${item.id || 0})">
                    <div class="prov-info">
                        <h3>${nombre}</h3>
                        <p>${precio}</p>
                    </div>
                </div>
            `;
        });

        cont.innerHTML = html;

    } catch (err) {
        console.error(err);
        cont.innerHTML = "<p>Error al cargar datos.</p>";
    }
}

// ------------------ Ver detalle ------------------
function verDetalle(tipo, id) {
    window.location.href = `detalle.html?tipo=${tipo}&id=${id}`;
}


function cargarHotelesPreview() {
    const cont = document.getElementById('contenedor-hoteles');

    cont.innerHTML = `
        <div class="prov-card">
            <div class="prov-info">
                <h3>Hotel Ejemplo</h3>
                <p>Inicia sesión para ver precios reales.</p>
            </div>
        </div>
    `;
}


document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();

    if (!isLoggedIn()) {
        setTimeout(() => mostrarModalAcceso(), 1000);
        cargarHotelesPreview();
    } else {
        cargarSeccion("Hoteles", "contenedor-hoteles");
        cargarSeccion("Restaurantes", "contenedor-restaurantes");
        cargarSeccion("Actividades", "contenedor-actividades");
    }
});
