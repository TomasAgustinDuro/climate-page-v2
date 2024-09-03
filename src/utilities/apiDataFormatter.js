export function formatHoy({ data }) {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, temp_max, temp_min, humidity },
    weather
  } = data;

  return {
    Ubicación: `${name}, ${country}`,
    Temperatura: `${Math.round(temp)} °`,
    Sensación: `${Math.round(feels_like)} °`,
    Máxima: `${Math.round(temp_max)} °`,
    Mínima: `${Math.round(temp_min)} °`,
    Humedad: `${Math.round(humidity)}%`,
    Icono: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
    Weather: weather[0].main
  };
}

export function formatPronostico({ pronostico }) {
  const forecast = [];

  for (let i = 3; i < pronostico.list.length; i += 8) {
    const rawDate = new Date(pronostico.list[i].dt_txt);
    const options = { 
      weekday: 'long',
    };
    let formattedDate = rawDate.toLocaleDateString('es-ES', options);

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    formattedDate = capitalizeFirstLetter(formattedDate);
    
    const {
      weather: [{ icon }],
      main: { temp_max, temp_min, feels_like }
    } = pronostico.list[i];

    forecast.push({
      date: formattedDate,
      icono: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      maxima: `${Math.round(temp_max)} °`,
      mínima: `${Math.round(temp_min)} °`,
      sensacion: `${Math.round(feels_like)} °`
    });
  }

  return forecast;
}

