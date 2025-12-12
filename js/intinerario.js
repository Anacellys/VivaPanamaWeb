document.addEventListener("DOMContentLoaded", async () => {
    const tablaBody = document.querySelector("#tabla-itinerario tbody");
    const itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];

    tablaBody.innerHTML = "";

    if (itinerario.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="4">No tienes actividades en tu itinerario.</td>
            </tr>`;
        return;
    }

    let totalCosto = 0;

    itinerario.forEach((a, index) => {
        totalCosto += a.costo;

        tablaBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${a.nombre}</td>
                <td>$${a.costo}</td>
                <td><button class="btn-eliminar" onclick="eliminarActividad(${a.id})">Eliminar</button></td>

            </tr>
        `;
    });

    tablaBody.innerHTML += `
        <tr style="font-weight:bold; background-color:#f0f0f0;">
            <td colspan="2">Total de actividades</td>
            <td colspan="2">${itinerario.length}</td>
        </tr>

        <tr style="font-weight:bold; background-color:#e8e8e8;">
            <td colspan="2">Costo total</td>
            <td colspan="2">$${totalCosto.toFixed(2)}</td>
        </tr>
    `;
});


function eliminarActividad(id) {
    let itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];
    itinerario = itinerario.filter(a => a.id !== id);
    localStorage.setItem("itinerario", JSON.stringify(itinerario));
    location.reload();
}


function guardarItinerarioTXT() {
    const itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];

    if (itinerario.length === 0) {
        showToast("No tienes actividades para guardar.");
        return;
    }

    let contenido = "========= ITINERARIO DE VIAJE =========\n";
    contenido += "           VivaPanama - Estimado\n";
    contenido += "========================================\n\n";

    let totalCosto = 0;

    itinerario.forEach((a, index) => {
        contenido += `Actividad ${index + 1}:\n`;
        contenido += `Nombre: ${a.nombre}\n`;
        contenido += `Costo estimado: $${a.costo}\n`;
        contenido += "----------------------------------------\n";
        totalCosto += a.costo;
    });

    contenido += `\nTOTAL DE ACTIVIDADES: ${itinerario.length}\n`;
    contenido += `COSTO TOTAL ESTIMADO: $${totalCosto.toFixed(2)}\n\n`;
    contenido += "NOTA: Este total es un ESTIMADO y puede variar.\n";
    contenido += "Gracias por planificar tu viaje con VivaPanama.\n";

    
    const blob = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "itinerario_viaje.txt";
    enlace.click();

    URL.revokeObjectURL(url);
    showToast("Itinerario guardado como TXT");
}
