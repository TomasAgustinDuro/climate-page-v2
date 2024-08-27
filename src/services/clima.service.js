// clima.js
import { countryGeocoder } from "./countryGeocoder";

export async function clima() {
  const informacion = {
    nombre: "",
    maxima: "",
    minima: "",
    humedad: "",
  };
  try {
    const { latitud, longitud } = await countryGeocoder();

    console.log(latitud + "  " + longitud);

    const api_key = "6a5db408397d51246d9e900a5735e113";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${api_key}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching weather data");
    }
    const data = await response.json();

    informacion.nombre = data.sys.country;
    (informacion.maxima = data.main.temp_max),
      (informacion.minima = data.main.temp_min),
      (informacion.humedad = data.main.humidity);

    return informacion;
  } catch (error) {
    console.error("Error in clima:", error);
  }
}
