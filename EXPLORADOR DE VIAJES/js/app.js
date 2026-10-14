console.log('conexion exitosa');
//IMPORTS
 import { obtenerpaises } from "./api/countriesapi.js";
//edo de app
let paises =[]




//REFERENCIAS DEL DOM
const destinationsContainer = document.querySelector(
    "#destinations-container"
);
const resultsCount = document.querySelector(
    "#results-count"
);
const initialMessage = document.querySelector('#initial-message');
/* =========================================
   INICIALIZACIÓN DE LA APLICACIÓN
========================================= */
async function init() {
    console.log("Explorador de Viajes iniciado");
    //resultsCount.textContent = "1 destino";

//mostrar estado de carga
initialMessage.innerHTML = /*html*/`
<div class="text-5xl mb-4">
🌍
</div>

<h3 class="
            text-xl
            font-semibold
            text-slate-800
            mb-2
        " >
        cargando destinos
</h3>

<p>
estamos consultando paises alrededor del mundo... 
</p>
`;

//obtener paises desde la api
paises = await obtenerpaises();
console.log('paises  obtenidos: ', paises)

// actualizar contador
resultsCount.textContent = `${paises.length} destinos`;

//mostrar resultados de la carga
if(paises.length > 0) {
    initialMessage.innerHTML = /*html*/ `
    <div>
    ✅
    </div>
<h3>
destinos cargados

</h3>


<p>
se obtendra ${paises.length} destinos correctamente
    </p>

    `;
}

else{
    //mostrar un mensaje si ocurre un error
    initialMessage.innerHTML = /*html*/`
    

    <div>
    ⚠️
    </div>
    
<h3>
no fue posible cargar los paises
</h3>


<p>
verifica tu conexion e intenta nuevamente
</p>


    `;
}


}
/* =========================================
   INICIAR APLICACIÓN
========================================= */
init();
