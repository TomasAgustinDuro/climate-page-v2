export function formatToday(current, daily, selectedCity) {
    return {
        Ubicacion: `${selectedCity.name}, ${selectedCity.country}`,
        Temperatura: `${current.temperature_2m} °`,
        Maxima: `${daily.temperature_2m_max[0]} °`,
        Minima: `${daily.temperature_2m_min[0]} °`,
        Sensacion: `${current.apparent_temperature} °`,
        Humedad: `${current.relative_humidity_2m}%`,
        Weather: `${current.weather_code}`
    }
}

export function formatForecast(daily) {
    const forecast = []

    for (let i = 1; i < daily.time.length; i += 1){
        forecast.push({
            Dia: daily.time[i],
            Maxima: daily.temperature_2m_max[i],
            Minima: daily.temperature_2m_min[i],
            Weather: daily.weather_code[i]
        })
    }

    return forecast
}