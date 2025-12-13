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
async function cargarSeccion(recurso, contenedorId) {
const API_HOTELES = "https://localhost:7029/api/Hoteles";

// --------- helper login ----------
function isLoggedIn() {
  return !!localStorage.getItem("usuario");
}

// --------- cargar hoteles (solo cuando está logeado) ----------
async function cargarHotelesInicio() {
  const cont = document.getElementById("contenedor-hotel");
  if (!cont) return;

  cont.innerHTML = "<p>Cargando hoteles...</p>";

  try {
    const res = await fetch(API_HOTELES);
    if (!res.ok) throw new Error("Error en API Hoteles");

    const data = await res.json();

    // adapta a tu JSON real
    const lista = data.Hoteles || data.hoteles || data || [];

    if (!Array.isArray(lista) || lista.length === 0) {
      cont.innerHTML = "<p>No hay hoteles disponibles.</p>";
      return;
    }

    let html = "";

    lista.slice(0, 6).forEach(h => {
      const nombre = h.nombre_hotel || h.nombre || "Hotel sin nombre";
      const precio =
        h.precio_noche !== undefined
          ? `$${h.precio_noche}`
          : "Precio no disponible";

      html += `
        <div class="prov-card" onclick="verDetalle('Hoteles', ${h.id_hotel || h.id || 0})">
          <div class="prov-info">
            <h3>${nombre}</h3>
            <p>${precio}</p>
          </div>
        </div>
      `;
    });

    cont.innerHTML = html;
  } catch (err) {
    console.error("Error cargando hoteles:", err);
    cont.innerHTML = "<p>Error al cargar hoteles.</p>";
  }
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
