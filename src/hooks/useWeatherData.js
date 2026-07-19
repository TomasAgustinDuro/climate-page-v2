import { useState, useEffect } from 'react';
import { weather } from '../services/weather.service'
import {formatToday, formatForecast} from "../utilities/weatherFormatted"
// import { ChangeTheme } from '../utilities/ChangeTheme';
// import { colorSchemes } from '../utilities/ColorSchemes';

const useWeatherData = (selectedCity) => {
  const [today, setToday] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedCity) {
      return
    }

    const { latitude , longitude } = selectedCity

    const fetchData = async () => {
      try {
        const result = await weather(latitude , longitude);
        setToday(formatToday(result.current, result.daily, selectedCity));
        setForecast(formatForecast(result.daily))
        // ChangeTheme(result, colorSchemes);
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCity?.latitude, selectedCity?.longitude]);

  return { today, forecast, error };
};

export default useWeatherData;
