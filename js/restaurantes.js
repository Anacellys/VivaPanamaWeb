const API_REST = "https://localhost:7029/api/Restaurantes";
const IMG_REST_DEFAULT = "img/defaut_rest.jpg";

function getProvincia() {
  const params = new URLSearchParams(window.location.search);
  return params.get("provincia");
}

document.addEventListener("DOMContentLoaded", async () => {
  const provincia = getProvincia();
  const titulo = document.getElementById("titulo-provincia");
  const subtitulo = document.getElementById("subtitulo");
  const contenedor = document.getElementById("contenedor-restaurantes");

  if (!contenedor) {
    console.error("No existe #contenedor-restaurantes");
    return;
  }

  if (provincia) {
    titulo.textContent = `Restaurantes en ${provincia}`;
    subtitulo.textContent = `Encuentra dónde comer en ${provincia}`;
  }

  contenedor.innerHTML = "<p>Cargando restaurantes...</p>";

  try {
    const res = await fetch(API_REST);
    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    console.log("DATA RESTAURANTES:", data);

    if (!data || !Array.isArray(data.Restaurantes)) {
      throw new Error("Formato inválido de la API");
    }

    const restaurantes = data.Restaurantes;

    const filtrados = provincia
      ? restaurantes.filter(r => (r.Lugar || r.lugar)?.provincia === provincia)
      : restaurantes;

    contenedor.innerHTML = "";

    if (filtrados.length === 0) {
      contenedor.innerHTML = "<p>No hay restaurantes en esta provincia.</p>";
      return;
    }

    filtrados.forEach(r => {
      const lugar = r.Lugar || r.lugar;
      const imgObj = r.ImagenPrincipal || r.imagenPrincipal;

      const imagenUrl = imgObj?.url || IMG_REST_DEFAULT;
      const nombre = r.nombre_restaurante;
      const descripcion = r.descripcion_restaurante ?? "";
      const costo = r.precio_promedio ?? 0;
      const hA = r.horario_apertura;
      const hC = r.horario_cierre;
      
      contenedor.innerHTML += `
        <div class="prov-card">
          <img src="${imagenUrl}">
          <div class="prov-info">
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            <p><strong>Ubicación:</strong> ${lugar?.nombre || ""} – ${lugar?.provincia || ""}</p>
            <p><strong>Precio promedio:</strong> ${costo === 0 ? "Consultar" : "$" + costo}</p>
            <button class="btn-itinerario"
              onclick="agregarRestItinerario(${r.id_restaurante}, '${nombre.replace(/'/g,"\\'")}', ${costo})">
              Agregar al Itinerario
            </button>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("ERROR RESTAURANTES:", error);
    contenedor.innerHTML = "<p>Error al cargar restaurantes.</p>";
  }
});

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
