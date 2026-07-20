/**
 * Servicio de clima usando la API de Open-Meteo.
 * Obtiene clima actual y pronóstico diario en una sola llamada.
 */

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Obtiene datos meteorológicos actuales y pronóstico diario para las coordenadas dadas.
 * @param {number} latitude - Latitud de la ubicación.
 * @param {number} longitude - Longitud de la ubicación.
 * @returns {Promise<{current: object, daily: object} | null>}
 *   Objeto con datos actuales (temperature_2m, humidity, etc.) y pronóstico diario
 *   (arrays de max/min/weather_code por día). Null si no hay coordenadas.
 * @throws {Error} Si la petición HTTP falla.
 */
export async function fetchWeather(latitude, longitude) {
  if (!latitude || !longitude) {
    return null;
  }

  const params = [
    `latitude=${latitude}`,
    `longitude=${longitude}`,
    `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code`,
    `daily=temperature_2m_max,temperature_2m_min,weather_code`,
    `timezone=auto`,
  ].join("&");

  const requestUrl = `${BASE_URL}?${params}`;

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error("Error fetching data from Open-Meteo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchWeather:", error);
    throw error;
  }
}
