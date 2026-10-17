// Comunicación con la API paises
const API_URL = "https://juancognitus.github.io/explorador-viajes-api/paises.json";

// Obtener los países desde la API
export async function obtenerpaises() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const paises = await response.json();
        return paises;

    } catch (error) {
        console.error("Error al obtener los países:", error);
        return [];
    }
}
