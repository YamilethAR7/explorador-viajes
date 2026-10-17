
// VERSION 0.6.0
// Guardar favoritos con LocalStorage

const miStorage = window.localStorage;

const CLAVE = "favoritos-viajes";

// Obtener favoritos guardados
export function obtenerFavoritos() {
    try {
        const datos = miStorage.getItem(CLAVE);

        const favoritos = JSON.parse(datos || "[]");

        return Array.isArray(favoritos) ? favoritos : [];
    } catch (error) {
        console.error("Error al leer favoritos:", error);
        return [];
    }
}

// Verificar si un país es favorito
export function esFavorito(codigo) {
    const favoritos = obtenerFavoritos();

    return favoritos.some(
        (pais) => pais.codes?.alpha_3 === codigo
    );
}

// Agregar un país a favoritos
export function agregarFavorito(pais) {
    const codigo = pais.codes?.alpha_3;

    if (!codigo || esFavorito(codigo)) {
        return false;
    }

    const favoritos = obtenerFavoritos();

    favoritos.push(pais);

    miStorage.setItem(
        CLAVE,
        JSON.stringify(favoritos)
    );

    return true;
}

// Eliminar un país de favoritos
export function eliminarFavorito(codigo) {
    const favoritos = obtenerFavoritos();

    const nuevosFavoritos = favoritos.filter(
        (pais) => pais.codes?.alpha_3 !== codigo
    );

    miStorage.setItem(
        CLAVE,
        JSON.stringify(nuevosFavoritos)
    );

    return nuevosFavoritos;
}
