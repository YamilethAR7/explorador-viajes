console.log('conexion exitosa');
//IMPORTS
 import { obtenerpaises } from "./api/countriesapi.js";
//REFERENCIAS DEL DOM
const destinationsContainer = document.querySelector(
    "#destinations-container"
);
const resultsCount = document.querySelector(
    "#results-count"
);
/* =========================================
   INICIALIZACIÓN DE LA APLICACIÓN
========================================= */
function init() {
    console.log("Explorador de Viajes iniciado");
    resultsCount.textContent = "1 destinos";
}
/* =========================================
   INICIAR APLICACIÓN
========================================= */
init();
