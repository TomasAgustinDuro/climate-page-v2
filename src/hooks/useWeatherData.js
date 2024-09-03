import { useState, useEffect } from 'react';
import { clima } from '../services/climaHoy.service';
import { climaPronostico } from '../services/climaPronostico.service';
import { ChangeTheme } from '../utilities/ChangeTheme';
import { colorSchemes } from '../utilities/ColorSchemes';

const useWeatherData = (country) => {
  const [hoy, setHoy] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await clima(country);
        setHoy(result);
        ChangeTheme(result, colorSchemes);
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error fetching data:', error);
      }

      try {
        const resultForecast = await climaPronostico(country);
        setForecast(resultForecast);
      } catch (error) {
        setError('Error fetching forecast.');
        console.error('Error fetching forecast:', error);
      }
    };

    fetchData();
  }, [country]);

  return { hoy, forecast, error };
};

export default useWeatherData;
