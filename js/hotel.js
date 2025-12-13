const API_HOTELES = "https://localhost:7029/api/Hoteles";
const IMG_HOTEL_DEFAULT = "img/defaut.jpg";

function getProvincia() {
  const params = new URLSearchParams(window.location.search);
  return params.get("provincia");
}

document.addEventListener("DOMContentLoaded", async () => {
  const provincia = getProvincia();
  const titulo = document.getElementById("titulo-provincia");
  const subtitulo = document.getElementById("subtitulo");
  const contenedor = document.getElementById("contenedor-hoteles");

  if (provincia) {
    titulo.textContent = `Hoteles en ${provincia}`;
    subtitulo.textContent = `Encuentra dónde hospedarte en ${provincia}`;
  }

  contenedor.innerHTML = "<p>Cargando hoteles...</p>";

  try {
    const res = await fetch(API_HOTELES);
    if (!res.ok) throw new Error("Error al cargar hoteles");

    const hoteles = await res.json();

    // filtro por provincia usando Lugar.provincia
    const filtrados = provincia
      ? hoteles.filter(h => h.lugar.provincia === provincia || h.Lugar?.provincia === provincia)
      : hoteles;

    contenedor.innerHTML = "";

    if (filtrados.length === 0) {
      contenedor.innerHTML = "<p>No hay hoteles en esta provincia.</p>";
      return;
    }

    filtrados.forEach(h => {
      // por si tu API viene con mayúsculas (Lugar, Imagenes)
      const lugar = h.Lugar || h.lugar;
      const imgObj = h.Imagenes || h.imagenes || null;

      const imagenUrl = imgObj?.url_imagen || IMG_HOTEL_DEFAULT;
      const nombreHotel = h.nombre_hotel || h.nombre;
      const descripcion = h.descripcion_hotel || h.descripcion;
      const costo = h.precio_noche ?? h.precio ?? 0;

      contenedor.innerHTML += `
        <div class="prov-card">
          <img src="${imagenUrl}">
          <div class="prov-info">
            <h3>${nombreHotel}</h3>
            <p>${descripcion ?? ""}</p>
            <p><strong>Ubicación:</strong> ${lugar?.nombre || lugar?.mombre || ""} – ${lugar?.provincia || ""}</p>
            <p><strong>Precio por noche:</strong> ${costo === 0 ? "Consultar" : "$" + costo}</p>
            <button class="btn-itinerario" onclick="agregarHotelItinerario(${h.id_hotel}, '${nombreHotel.replace(/'/g,"\\'")}', ${costo || 0})">
              Agregar al Itinerario
            </button>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error hoteles:", error);
    contenedor.innerHTML = "<p>Error al cargar hoteles.</p>";
  }
});

function agregarHotelItinerario(id, nombre, costo) {
  let itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];

  // diferenciamos tipo por si mezclas actividades y hoteles
  if (!itinerario.some(e => e.id === id && e.tipo === "hotel")) {
    itinerario.push({ id, nombre, costo, tipo: "hotel" });
    localStorage.setItem("itinerario", JSON.stringify(itinerario));
    showToast(`${nombre} agregado al itinerario`);
  } else {
    showToast(`${nombre} ya está agregado al itinerario`);
  }
}

function showToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    provincia: params.get("provincia"),
    idProvincia: params.get("idProvincia")
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const { provincia, idProvincia } = getParams();
  const btnActividades = document.getElementById("btnVerActividades");

  if (!btnActividades) return;

 btnActividades.addEventListener("click", () => {
  let url = "actividades.html";

  const params = new URLSearchParams();
  if (provincia) params.set("provincia", provincia);
  if (idProvincia) params.set("idProvincia", idProvincia);

  window.location.href = `${url}?${params.toString()}`;
});
  
});
document.addEventListener("DOMContentLoaded", () => {
  const { provincia, idProvincia } = getParams();
  const btnRestaurantes = document.getElementById("btnVerRestaurantes");

  if (!btnRestaurantes) return;

 btnRestaurantes.addEventListener("click", () => {
  let url = "restaurantes.html";

  const params = new URLSearchParams();
  if (provincia) params.set("provincia", provincia);
  if (idProvincia) params.set("idProvincia", idProvincia);

  window.location.href = `${url}?${params.toString()}`;
});
  
});
