export function formatToday(current, daily, selectedCity) {
    return {
        Ubicacion: `${selectedCity.name}, ${selectedCity.country}`,
        Temperatura: `${current.temperature_2m} °`,
        Maxima: `${daily.temperature_2m_max[0]} °`,
        Minima: `${daily.temperature_2m_min[0]} °`,
        Sensacion: `${current.apparent_temperature} °`,
        Humedad: `${current.relative_humidity_2m}%`,
    }
}

function capitalizeFirstLetter(str) {
    if (!str) return ""; // Handle empty strings safely
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatForecast(daily) {
    const forecast = []



    for (let i = 1; i < daily.time.length; i += 1) {
        forecast.push({
            Dia: capitalizeFirstLetter( new Date(daily.time[i] + "T12:00").toLocaleDateString('es-ES', { weekday: 'long' })),
            Maxima: daily.temperature_2m_max[i],
            Minima: daily.temperature_2m_min[i],
            Weather: daily.weather_code[i]
        })
    }

    return forecast
}