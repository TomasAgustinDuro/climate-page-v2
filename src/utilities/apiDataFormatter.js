export function formatHoy({ data }) {
  const informacionClimaDia = {
    Ubicación: `${data?.name}, ${data?.sys?.country}`,
    Temperatura: `${Math.round(data?.main?.temp)} °`,
    Sensación: `${Math.round(data?.main?.feels_like)} °`,
    Máxima: `${Math.round(data?.main?.temp_max)} °`,
    Mínima: `${Math.round(data?.main?.temp_min)} °`,
    Humedad: `${Math.round(data?.main?.humidity)}%`,
    Icono: `https://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`,
    Weather: data.weather[0].main
  };

  return informacionClimaDia;
}

export function formatPronostico({ pronostico }) {
  const forecast = [];

  for (let i = 3; i < pronostico.list.length; i += 8) {
    const rawDate = new Date(pronostico.list[i].dt_txt);
    const options = { 
      weekday: 'long', // Nombre completo del día de la semana
    };
    let formattedDate = rawDate.toLocaleDateString('es-ES', options);

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    formattedDate = capitalizeFirstLetter(formattedDate);
    

    const informacionPronostico = {
      date: formattedDate,
      icono: `https://openweathermap.org/img/wn/${pronostico.list[i].weather[0].icon}@2x.png`,
      maxima: `${Math.round(pronostico.list[i].main.temp_max)} °`,
      mínima: `${Math.round(pronostico.list[i].main.temp_min)} °`,
      sensacion: `${Math.round(pronostico.list[i].main.feels_like)} °`
    };

    forecast.push(informacionPronostico);
  }

  return forecast;
}

