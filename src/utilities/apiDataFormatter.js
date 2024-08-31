export function formatHoy({ data }) {
  const informacionClimaDia = {
    Ubicacion: `${data?.name}, ${data?.sys?.country}`,
    Temperatura: `${Math.round(data?.main?.temp)} °`,
    Sensacion: `${Math.round(data?.main?.feels_like)} °`,
    Maxima: `${Math.round(data?.main?.temp_max)} °`,
    Minima: `${Math.round(data?.main?.temp_min)} °`,
    Humedad: `${Math.round(data?.main?.humidity)}%`,
  };

  return informacionClimaDia;
}

export function formatPronostico({ pronostico }) {
  const forecast = [];

  for (let i = 3; i < pronostico.list.length; i += 8) {
    const rawDate = new Date(pronostico.list[i].dt_txt);
    const options = { 
      day: 'numeric', 
      month: 'numeric'
    };
    const formattedDate = rawDate.toLocaleDateString('es-ES', options);

    const informacionPronostico = {
      date: formattedDate,
      maxima: `${Math.round(pronostico.list[i].main.temp_max)} °`,
      minima: `${Math.round(pronostico.list[i].main.temp_min)} °`,
      sensacion: `${Math.round(pronostico.list[i].main.feels_like)} °`
    };

    forecast.push(informacionPronostico);
  }

  return forecast;
}

