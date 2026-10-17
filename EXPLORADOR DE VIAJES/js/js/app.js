
// MODULO 3 - EXPLORADOR DE VIAJES

import { obtenerpaises } from "../api/countrinesapi.js";

import { procesarPaises } from "./utils/filters.js";

import {
    mostrarCargando,
    mostrarError,
    renderPaises,
    actualizarContador,
    mostrarDetalle
} from "../ui/ui.js";

import {
    crearMapa,
    destruirMapa
} from "../ui/mapUI.js";

import {
    obtenerFavoritos,
    agregarFavorito,
    eliminarFavorito,
    esFavorito
} from "../services/favoritesService.js";

// Estado
let paises = [];
let vistaFavoritos = false;

// Elementos del HTML
const contenedor = document.querySelector("#destinations-container");
const contador = document.querySelector("#results-count");
const mensaje = document.querySelector("#initial-message");
const buscador = document.querySelector("#search-input");
const continente = document.querySelector("#continent-filter");
const orden = document.querySelector("#sort-filter");
const modal = document.querySelector("#detail-modal");

// Normalizar datos de la API
function normalizarPais(pais) {
    const nombre = pais.names?.common ??
        pais.name?.common ?? pais.name ?? "Sin nombre";

    const codigo = pais.codes?.alpha_3 ??
        pais.alpha_3 ?? pais.cca3 ?? "";

    const bandera = pais.flag?.url_png ??
        pais.flags?.png ?? "";

    const coordenadas = pais.coordinates ?? pais.latlng;

    const lat = Array.isArray(coordenadas)
        ? Number(coordenadas[0])
        : Number(coordenadas?.lat);

    const lng = Array.isArray(coordenadas)
        ? Number(coordenadas[1])
        : Number(coordenadas?.lng);

    return {
        ...pais,
        names: { common: nombre },
        codes: { alpha_3: codigo },
        flag: { url_png: bandera },
        coordinates: { lat, lng }
    };
}

// Mostrar resultados
function aplicarFiltros() {
    const favoritos = obtenerFavoritos();

    const datos = vistaFavoritos ? favoritos : paises;

    const resultados = procesarPaises(
        datos,
        buscador.value,
        continente.value,
        orden.value
    );

    document.querySelector("#section-title").textContent =
        vistaFavoritos ? "Mis favoritos" : "Destinos";

    actualizarContador(resultados.length, contador);

    renderPaises(resultados, contenedor, favoritos);
}

// Buscar un país por código
function buscarPais(codigo) {
    return paises.find(
        (pais) => pais.codes?.alpha_3 === codigo
    ) ?? obtenerFavoritos().find(
        (pais) => pais.codes?.alpha_3 === codigo
    );
}

// Mostrar detalles y mapa
function verDetalle(codigo) {
    const pais = buscarPais(codigo);

    if (!pais) return;

    destruirMapa();

    mostrarDetalle(
        pais,
        document.querySelector("#detail-content")
    );

    modal.classList.remove("hidden");

    crearMapa(
        Number(pais.coordinates?.lat),
        Number(pais.coordinates?.lng),
        pais.names?.common ?? "País"
    );
}

// Cerrar detalles
function cerrarDetalle() {
    destruirMapa();
    modal.classList.add("hidden");
}

// Agregar o quitar favorito
async function cambiarFavorito(codigo) {
    const pais = buscarPais(codigo);

    if (!pais) return;

    if (esFavorito(codigo)) {
        let confirmar = true;

        if (typeof Swal !== "undefined") {
            const respuesta = await Swal.fire({
                title: "¿Eliminar favorito?",
                text: `¿Quieres quitar ${pais.names.common}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

            confirmar = respuesta.isConfirmed;
        } else {
            confirmar = window.confirm(
                `¿Quitar ${pais.names.common} de favoritos?`
            );
        }

        if (!confirmar) return;

        eliminarFavorito(codigo);

        if (typeof Swal !== "undefined") {
            Swal.fire("Eliminado", "Favorito eliminado", "success");
        }
    } else {
        agregarFavorito(pais);

        if (typeof Swal !== "undefined") {
            Swal.fire(
                "Guardado",
                `${pais.names.common} está en tus favoritos`,
                "success"
            );
        }
    }

    aplicarFiltros();
}

// Eventos de búsqueda
buscador.addEventListener("input", aplicarFiltros);
continente.addEventListener("change", aplicarFiltros);
orden.addEventListener("change", aplicarFiltros);

document.querySelector("#search-form")
    .addEventListener("submit", (evento) => {
        evento.preventDefault();
        aplicarFiltros();
    });

// Navegación
document.querySelector("#btn-explorar")
    .addEventListener("click", () => {
        vistaFavoritos = false;
        aplicarFiltros();
    });

document.querySelector("#btn-favoritos")
    .addEventListener("click", () => {
        vistaFavoritos = true;
        aplicarFiltros();
    });

// Botones de las tarjetas
contenedor.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-action]");

    if (!boton) return;

    const codigo = boton.dataset.countryCode;

    if (boton.dataset.action === "detail") {
        verDetalle(codigo);
    }

    if (boton.dataset.action === "favorite") {
        cambiarFavorito(codigo);
    }
});

// Cerrar modal
document.querySelector("#close-modal")
    .addEventListener("click", cerrarDetalle);

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        cerrarDetalle();
    }
});

// Iniciar aplicación
async function init() {
    mostrarCargando(contenedor);
    mensaje.textContent = "Consultando países...";

    try {
        const datos = await obtenerpaises();

        if (!Array.isArray(datos) || datos.length === 0) {
            mostrarError(contenedor);
            actualizarContador(0, contador);
            mensaje.textContent = "";
            return;
        }

        paises = datos.map(normalizarPais);

        mensaje.textContent = "";
        aplicarFiltros();
    } catch (error) {
        console.error(error);
        mostrarError(contenedor);
        mensaje.textContent = "Error al cargar países.";
    }
}

init();
