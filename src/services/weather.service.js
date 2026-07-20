const BASE_URL = "https://api.open-meteo.com/v1/forecast";

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
