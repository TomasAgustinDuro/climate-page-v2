import { useState, useEffect } from "react";
import { fetchWeather } from "../services/weather.service";
import { formatToday, formatForecast } from "../utilities/weatherFormatter";

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
