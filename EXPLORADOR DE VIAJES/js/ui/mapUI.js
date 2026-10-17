
// VERSION 0.5.0
// Mapas individuales con Leaflet

let mapaActual = null;

// Eliminar el mapa anterior
export function destruirMapa() {
    if (mapaActual) {
        mapaActual.remove();
        mapaActual = null;
    }
}

// Crear mapa del país seleccionado
export function crearMapa(latitud, longitud, nombre) {
    destruirMapa();

    const elemento = document.querySelector("#country-map");

    if (!elemento) {
        return;
    }

    if (
        typeof L === "undefined" ||
        !Number.isFinite(latitud) ||
        !Number.isFinite(longitud) ||
        latitud < -90 ||
        latitud > 90 ||
        longitud < -180 ||
        longitud > 180
    ) {
        elemento.classList.add("hidden");
        return;
    }

    elemento.classList.remove("hidden");

    mapaActual = L.map(elemento).setView(
        [latitud, longitud],
        4
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap"
        }
    ).addTo(mapaActual);

    L.marker([latitud, longitud])
        .addTo(mapaActual)
        .bindPopup(nombre)
        .openPopup();

    setTimeout(() => {
        if (mapaActual) {
            mapaActual.invalidateSize();
        }
    }, 150);
}
