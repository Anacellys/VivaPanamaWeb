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

// ------------------ Tarjetas estilo lugares.html ------------------
async function cargarSeccion(endpoint, contenedorId) {
    const cont = document.getElementById(contenedorId);
    cont.innerHTML = "<p>Cargando...</p>";

    try {
        const res = await fetch(`${API}/${endpoint}`);
        if (!res.ok) throw new Error("Error en API");

        const data = await res.json();

        let html = "";

        data.slice(0, 6).forEach(item => {

            const img = item.Imagenes?.url_imagen ||
                        item.imagen_url ||
                        item.url_imagen ||
                        "img/default.jpg";

            const nombre =
                item.nombre ||
                item.nombre_hotel ||
                item.nombre_restaurante ||
                "Sin nombre";

            const descripcion =
                item.descripcion ||
                item.descripcion_hotel ||
                item.descripcion_restaurante ||
                "Sin descripción";

            html += `
                <div class="prov-card" onclick="verDetalle('${endpoint}', ${item.id})">
                    <img src="${img}" alt="${nombre}">
                    <div class="prov-info">
                        <h3>${nombre}</h3>
                        <p>${descripcion.substring(0, 70)}...</p>
                    </div>
                </div>
            `;
        });

        cont.innerHTML = html;

    } catch (err) {
        cont.innerHTML = "<p>Error al cargar datos</p>";
    }
}

// ------------------ Ver detalle ------------------
function verDetalle(tipo, id) {
    window.location.href = `detalle.html?tipo=${tipo}&id=${id}`;
}

// ------------------ Preview invitados ------------------
function cargarHotelesPreview() {
    const cont = document.getElementById('contenedor-hoteles');

    cont.innerHTML = `
        <div class="prov-card">
            <img src="img/default.jpg">
            <div class="prov-info">
                <h3>Hotel Ejemplo</h3>
                <p>Inicia sesión para ver todos los hoteles.</p>
            </div>
        </div>
    `;
}

// ------------------ Inicio página ------------------
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
