/**
 * Utilidades de formateo para transformar datos crudos de Open-Meteo
 * al formato esperado por los componentes de UI.
 */

/** Mapeo de keys internas a labels de UI en español */
const todayLabels = {
  location: "Ubicación",
  temperature: "Temperatura",
  maxTemperature: "Máxima",
  minTemperature: "Mínima",
  feelsLike: "Sensación",
  humidity: "Humedad",
};

/**
 * Formatea los datos del clima actual para la UI.
 * @param {object} current - Objeto `current` de la respuesta de Open-Meteo.
 * @param {object} daily - Objeto `daily` de la respuesta (para max/min del día).
 * @param {object} selectedCity - Ciudad seleccionada con { name, country }.
 * @returns {object} Objeto con keys en camelCase y valores formateados como strings.
 */
export function formatToday(current, daily, selectedCity) {
  return {
    location: `${selectedCity.name}, ${selectedCity.country}`,
    temperature: `${Math.round(current.temperature_2m)} °`,
    maxTemperature: `${Math.round(daily.temperature_2m_max[0])} °`,
    minTemperature: `${Math.round(daily.temperature_2m_min[0])} °`,
    feelsLike: `${Math.round(current.apparent_temperature)} °`,
    humidity: `${current.relative_humidity_2m}%`,
  };
}

/**
 * Traduce una key interna a su label en español para mostrar en la UI.
 * @param {string} key - Key interna (ej: "location", "temperature").
 * @returns {string} Label en español (ej: "Ubicación", "Temperatura").
 */
export function getTodayLabel(key) {
  return todayLabels[key] || key;
}

/**
 * Capitaliza la primera letra de un string.
 * @param {string} str - String a capitalizar.
 * @returns {string} String con la primera letra en mayúscula.
 */
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formatea el pronóstico diario para la UI.
 * Omite el día actual (índice 0) ya que se muestra en formatToday.
 * @param {object} daily - Objeto `daily` de la respuesta de Open-Meteo con arrays paralelos.
 * @returns {Array<{day: string, maxTemperature: string, minTemperature: string, weatherCode: number}>}
 *   Array de objetos, uno por día, con fecha formateada y temperaturas.
 */
export function formatForecast(daily) {
  const forecast = [];

  for (let i = 1; i < daily.time.length; i += 1) {
    const date = new Date(daily.time[i] + "T12:00");
    forecast.push({
      day: capitalizeFirstLetter(
        date.toLocaleDateString("es-ES", { weekday: "long" })
      ),
      maxTemperature: `${Math.round(daily.temperature_2m_max[i])} °`,
      minTemperature: `${Math.round(daily.temperature_2m_min[i])} °`,
      weatherCode: daily.weather_code[i],
    });
  }

  return forecast;
}
