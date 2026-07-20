// Mapeo de keys internas a labels de UI en español
const todayLabels = {
  location: "Ubicación",
  temperature: "Temperatura",
  maxTemperature: "Máxima",
  minTemperature: "Mínima",
  feelsLike: "Sensación",
  humidity: "Humedad",
};

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

export function getTodayLabel(key) {
  return todayLabels[key] || key;
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
