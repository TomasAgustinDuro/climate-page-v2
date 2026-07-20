/**
 * Hook que gestiona la obtención y formateo de datos meteorológicos.
 * Se dispara cuando cambia la ciudad seleccionada en el contexto.
 */

import { useState, useEffect } from "react";
import { fetchWeather } from "../services/weather.service";
import { formatToday, formatForecast } from "../utilities/weatherFormatter";

/**
 * Obtiene y formatea datos de clima actual y pronóstico para la ciudad seleccionada.
 * @param {object|null} selectedCity - Ciudad seleccionada con { name, country, latitude, longitude }.
 * @returns {{today: object|null, forecast: Array|null, error: string|null}}
 *   - today: datos del clima actual formateados para la UI.
 *   - forecast: array de pronóstico diario formateado.
 *   - error: mensaje de error si la petición falló.
 */
const useWeatherData = (selectedCity) => {
  const [today, setToday] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    const { latitude, longitude } = selectedCity;

    const fetchData = async () => {
      try {
        const result = await fetchWeather(latitude, longitude);
        setToday(formatToday(result.current, result.daily, selectedCity));
        setForecast(formatForecast(result.daily));
      } catch (fetchError) {
        setError("Error fetching data.");
        console.error("Error fetching data:", fetchError);
      }
    };

    fetchData();
  }, [selectedCity?.latitude, selectedCity?.longitude]);

  return { today, forecast, error };
};

export default useWeatherData;
