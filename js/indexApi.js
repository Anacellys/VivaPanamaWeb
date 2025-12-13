// =========================
//  CONSTANTES API
// =========================
const API_HOTELES      = "https://localhost:7029/api/Hoteles";
const API_REST         = "https://localhost:7029/api/Restaurantes";
const API_ACTIVIDADES  = "https://localhost:7029/api/Actividades";

const IMG_HOTEL_DEFAULT = "img/defaut.jpg";
const IMG_REST_DEFAULT  = "img/defaut_rest.jpg";
const IMG_ACT_DEFAULT   = "img/defaut.jpg";

// =========================
//  INICIALIZAR EN INDEX
// =========================
document.addEventListener("DOMContentLoaded", () => {
  cargarHotelesHome();
  cargarRestaurantesHome();
  cargarActividadesHome();
});

// =========================
//  HOTELES (HOME)
// =========================
async function cargarHotelesHome() {
  const cont = document.getElementById("contenedor-hotel");
  if (!cont) return;

  cont.innerHTML = "<p>Cargando hoteles...</p>";

  try {
    const res = await fetch(API_HOTELES);
    if (!res.ok) throw new Error("HTTP " + res.status);

    const hoteles = await res.json();

    cont.innerHTML = "";
    hoteles.slice(0, 2).forEach(h => {
      const lugar   = h.Lugar || h.lugar;
      const imgObj  = h.Imagenes || h.imagenes || null;

      const imagenUrl   = imgObj?.url_imagen || IMG_HOTEL_DEFAULT;
      const nombreHotel = h.nombre_hotel || h.nombre;
      const descripcion = h.descripcion_hotel || h.descripcion || "";
      const costo       = h.precio_noche ?? h.precio ?? 0;

      cont.innerHTML += `
        <div class="prov-card">
          <img src="${imagenUrl}">
          <div class="prov-info">
            <h3>${nombreHotel}</h3>
            <p>${descripcion}</p>
            <p><strong>Precio por noche:</strong> ${costo === 0 ? "Consultar" : "$" + costo}</p>
            <button class="btn-itinerario"
              onclick="agregarHotelItinerario(${h.id_hotel}, '${nombreHotel.replace(/'/g,"\\'")}', ${costo || 0})">
              Agregar al Itinerario
            </button>
          </div>
        </div>`;
    });
  } catch (err) {
    console.error("Error hoteles home:", err);
    cont.innerHTML = "<p>Error al cargar hoteles.</p>";
  }
}

// =========================
//  RESTAURANTES (HOME)
// =========================
async function cargarRestaurantesHome() {
  const cont = document.getElementById("contenedor-restaurantes");
  if (!cont) return;

  cont.innerHTML = "<p>Cargando restaurantes...</p>";

  try {
    const res = await fetch(API_REST);
    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();

    // En tu página de restaurantes usas data.restaurantes
    const restaurantes = Array.isArray(data.restaurantes) ? data.restaurantes : data;

    cont.innerHTML = "";
    restaurantes.slice(0, 2).forEach(r => {
      const lugar  = r.Lugar || r.lugar;
      const imgObj = r.ImagenPrincipal || r.imagenPrincipal;

      const imagenUrl   = imgObj?.url || IMG_REST_DEFAULT;
      const nombre      = r.nombre_restaurante;
      const descripcion = r.descripcion_restaurante ?? "";
      const costo       = r.precio_promedio ?? 0;

      cont.innerHTML += `
        <div class="prov-card">
          <img src="${imagenUrl}">
          <div class="prov-info">
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            <p><strong>Precio promedio:</strong> ${costo === 0 ? "Consultar" : "$" + costo}</p>
            <button class="btn-itinerario"
              onclick="agregarRestItinerario(${r.id_restaurante}, '${nombre.replace(/'/g,"\\'")}', ${costo || 0})">
              Agregar al Itinerario
            </button>
          </div>
        </div>`;
    });
  } catch (err) {
    console.error("ERROR RESTAURANTES HOME:", err);
    cont.innerHTML = "<p>Error al cargar restaurantes.</p>";
  }
}

// =========================
//  ACTIVIDADES (HOME)
//  (basado en tu actividades.js)
// =========================
async function cargarActividadesHome() {
  const cont = document.getElementById("contenedor-actividades");
  if (!cont) return;

  cont.innerHTML = "<p>Cargando actividades...</p>";

  try {
    const res = await fetch(API_ACTIVIDADES);
    if (!res.ok) throw new Error("Error al cargar actividades");

    const actividades = await res.json();

    cont.innerHTML = "";
    actividades.slice(0, 2).forEach(a => {
      const imagenUrl = a.imagen || IMG_ACT_DEFAULT;

      cont.innerHTML += `
        <div class="prov-card">
          <img src="${imagenUrl}">
          <div class="prov-info">
            <h3>${a.nombre}</h3>
            <p>${a.descripcion}</p>
            <p><strong>Costo:</strong> ${a.costo === 0 ? "Gratis" : "$" + a.costo}</p>
            <button class="btn-itinerario"
              onclick="agregarItinerario(${a.id_actividad}, '${a.nombre.replace(/'/g,"\\'")}', ${a.costo || 0})">
              Agregar al Itinerario
            </button>
          </div>
        </div>`;
    });
  } catch (err) {
    console.error("Error actividades home:", err);
    cont.innerHTML = "<p>Error al cargar actividades.</p>";
  }
}

// =========================
//  FUNCIONES COMUNES ITINERARIO
// =========================
function agregarHotelItinerario(id, nombre, costo) {
  let itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];

  if (!itinerario.some(e => e.id === id && e.tipo === "hotel")) {
    itinerario.push({ id, nombre, costo, tipo: "hotel" });
    localStorage.setItem("itinerario", JSON.stringify(itinerario));
    showToast(`${nombre} agregado al itinerario`);
  } else {
    showToast(`${nombre} ya está agregado al itinerario`);
  }
}

function agregarRestItinerario(id, nombre, costo) {
  let itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];

  if (!itinerario.some(e => e.id === id && e.tipo === "restaurante")) {
    itinerario.push({ id, nombre, costo, tipo: "restaurante" });
    localStorage.setItem("itinerario", JSON.stringify(itinerario));
    showToast(`${nombre} agregado al itinerario`);
  } else {
    showToast(`${nombre} ya está agregado al itinerario`);
  }
}

function agregarItinerario(id, nombre, costo) {
  let itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];

  if (!itinerario.some(e => e.id === id && e.tipo === "actividad")) {
    itinerario.push({ id, nombre, costo, tipo: "actividad" });
    localStorage.setItem("itinerario", JSON.stringify(itinerario));
    showToast(`${nombre} agregado al itinerario`);
  } else {
    showToast(`${nombre} ya está agregado al itinerario`);
  }
}

function showToast(mensaje) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = mensaje;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
