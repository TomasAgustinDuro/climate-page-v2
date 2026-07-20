/**
 * Servicio de geocodificación usando la API de Open-Meteo.
 * Busca ciudades por nombre y devuelve coordenadas + metadata.
 */

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

/**
 * Busca ciudades que coincidan con el texto ingresado.
 * @param {string} input - Texto de búsqueda (nombre parcial o completo de ciudad).
 * @returns {Promise<Array<{name: string, country: string, latitude: number, longitude: number}>>}
 *   Array de ciudades con nombre, país y coordenadas. Vacío si no hay input.
 * @throws {Error} Si la petición HTTP falla.
 */
export async function searchCities(input) {
  if (!input) {
    return [];
  }

  const requestUrl = `${BASE_URL}?name=${encodeURIComponent(input)}&count=10&language=es`;

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error("Error fetching data from Open-Meteo Geocoding");
    }
    const data = await response.json();

    if (!data.results) {
      return [];
    }

    return data.results.map((item) => ({
      name: item.name,
      country: item.country,
      latitude: item.latitude,
      longitude: item.longitude,
    }));
  } catch (error) {
    console.error("Error in searchCities:", error);
    throw error;
  }
}
