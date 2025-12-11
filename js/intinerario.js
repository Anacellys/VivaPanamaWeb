document.addEventListener("DOMContentLoaded", async () => {
    const tablaBody = document.querySelector("#tabla-itinerario tbody");
    const itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];

    tablaBody.innerHTML = "";

    if(itinerario.length === 0){
        tablaBody.innerHTML = `<tr><td colspan="3">No tienes actividades en tu itinerario.</td></tr>`;
    } else {
        itinerario.forEach((a, index) => {
            tablaBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${a.nombre}</td>
                    <td><button onclick="eliminarActividad(${a.id})">Eliminar</button></td>
                </tr>
            `;
        });

        tablaBody.innerHTML += `
            <tr style="font-weight:bold; background-color:#f0f0f0;">
                <td colspan="2">Total de actividades</td>
                <td>${itinerario.length}</td>
            </tr>
        `;
    }
});

function eliminarActividad(id) {
    let itinerario = JSON.parse(localStorage.getItem("itinerario")) || [];
    itinerario = itinerario.filter(a => a.id !== id);
    localStorage.setItem("itinerario", JSON.stringify(itinerario));
    location.reload();
}
