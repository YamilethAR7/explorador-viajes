
// VERSION 0.4.0
// Busqueda, filtros y ordenamientos

export function buscarPaises(paises, texto) {
    const textoNormalizado = texto.trim().toLowerCase();

    if (!textoNormalizado) {
        return paises;
    }

    return paises.filter((pais) => {
        const nombre = (
            pais.names?.common ?? ""
        ).toLowerCase();

        return nombre.includes(textoNormalizado);
    });
}

// Filtrar por continente
export function filtrarPorContinente(paises, continente) {
    if (continente === "all") {
        return paises;
    }

    return paises.filter(
        (pais) => pais.region === continente
    );
}

// Ordenar países
export function ordenarPaises(paises, criterio) {
    const paisesOrdenados = [...paises];

    // A-Z
    if (criterio === "az" || criterio === "name-asc") {
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? "";
            const nombreB = b.names?.common ?? "";

            return nombreA.localeCompare(nombreB);
        });
    }

    // Z-A
    if (criterio === "za" || criterio === "name-desc") {
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? "";
            const nombreB = b.names?.common ?? "";

            return nombreB.localeCompare(nombreA);
        });
    }

    // Mayor poblacion
    if (criterio === "population-desc") {
        return paisesOrdenados.sort(
            (a, b) => b.population - a.population
        );
    }

    // Menor poblacion
    if (criterio === "population-asc") {
        return paisesOrdenados.sort(
            (a, b) => a.population - b.population
        );
    }

    return paisesOrdenados;
}

// Procesar todos los filtros
export function procesarPaises(
    paises,
    texto,
    continente,
    criterioOrdenado
) {
    let resultado = buscarPaises(paises, texto);

    resultado = filtrarPorContinente(
        resultado,
        continente
    );

    resultado = ordenarPaises(
        resultado,
        criterioOrdenado
    );

    return resultado;
}
