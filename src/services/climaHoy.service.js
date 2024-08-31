import { formatHoy } from "../utilities/apiDataFormatter";
import { countryGeocoder } from "./countryGeocoder";

export async function clima(country) {

  try {
    const { latitud, longitud } = await countryGeocoder(country);

    const api_key = "6a5db408397d51246d9e900a5735e113";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${api_key}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching weather data");
    }
    const data = await response.json();

    return formatHoy({data});
  } catch (error) {
    console.error("Error in clima:", error);
  }

  

}
