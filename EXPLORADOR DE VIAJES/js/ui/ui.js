
// Mostrar cargando
export function mostrarCargando(contenedor) {
    contenedor.textContent = "Cargando países...";
}

// Mostrar error
export function mostrarError(contenedor) {
    contenedor.textContent = "No fue posible cargar los países.";
}

// Actualizar contador
export function actualizarContador(cantidad, contador) {
    contador.textContent = `${cantidad} destinos encontrados`;
}

// Mostrar tarjetas
export function renderPaises(paises, contenedor, favoritos) {
    contenedor.innerHTML = "";

    if (paises.length === 0) {
        contenedor.textContent = "No se encontraron países.";
        return;
    }

    paises.forEach((pais) => {
        const nombre = pais.names?.common ?? "Sin nombre";
        const codigo = pais.codes?.alpha_3 ?? "";
        const bandera = pais.flag?.url_png ?? "";

        const marcado = favoritos.some(
            (item) => item.codes?.alpha_3 === codigo
        );

        const tarjeta = document.createElement("article");
        tarjeta.className =
            "bg-white rounded-xl shadow-md p-5 border border-slate-200";

        const imagen = document.createElement("img");
        imagen.src = bandera;
        imagen.alt = `Bandera de ${nombre}`;
        imagen.className = "w-full h-36 object-contain mb-4";

        const titulo = document.createElement("h3");
        titulo.className = "text-xl font-bold mb-2";
        titulo.textContent = nombre;

        const region = document.createElement("p");
        region.textContent = `Continente: ${pais.region}`;

        const poblacion = document.createElement("p");
        poblacion.textContent =
            `Población: ${(pais.population ?? 0).toLocaleString("es-MX")}`;

        const botones = document.createElement("div");
        botones.className = "flex gap-3 mt-5";

        const verMas = document.createElement("button");
        verMas.type = "button";
        verMas.textContent = "Ver más";
        verMas.dataset.action = "detail";
        verMas.dataset.countryCode = codigo;
        verMas.className =
            "bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer";

        const favorito = document.createElement("button");
        favorito.type = "button";
        favorito.textContent = marcado ? "♥ Favorito" : "♡ Favorito";
        favorito.dataset.action = "favorite";
        favorito.dataset.countryCode = codigo;
        favorito.className =
            "border border-red-400 text-red-600 px-4 py-2 rounded-lg cursor-pointer";

        botones.append(verMas, favorito);
        tarjeta.append(
            imagen, titulo, region, poblacion, botones
        );

        contenedor.appendChild(tarjeta);
    });
}

// Mostrar información del país
export function mostrarDetalle(pais, contenedor) {
    contenedor.innerHTML = "";

    const nombre = pais.names?.common ?? "Sin nombre";

    const titulo = document.createElement("h2");
    titulo.textContent = nombre;
    titulo.className = "text-2xl font-bold mb-4";

    const bandera = document.createElement("img");
    bandera.src = pais.flag?.url_png ?? "";
    bandera.alt = `Bandera de ${nombre}`;
    bandera.className = "w-40 h-24 object-contain mb-4";

    const capital = Array.isArray(pais.capitals)
        ? pais.capitals.map((c) => c.name ?? c).join(", ")
        : Array.isArray(pais.capital)
            ? pais.capital.join(", ")
            : pais.capital ?? "No disponible";

    const datos = [
        `Continente: ${pais.region ?? "No disponible"}`,
        `Capital: ${capital}`,
        `Población: ${(pais.population ?? 0).toLocaleString("es-MX")}`,
        `Código: ${pais.codes?.alpha_3 ?? ""}`
    ];

    contenedor.append(titulo, bandera);

    datos.forEach((dato) => {
        const parrafo = document.createElement("p");
        parrafo.textContent = dato;
        parrafo.className = "mb-2";
        contenedor.appendChild(parrafo);
    });
}
