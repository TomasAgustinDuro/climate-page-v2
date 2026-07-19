export async function weather(lat, long) {
    if (!lat || !long) {
        return null
    }

    try {
        const url = "https://api.open-meteo.com/v1/forecast"
        const request_url = `?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code`;
        
        const response = await fetch(url + request_url)

        if (!response.ok){
            throw new Error("Error fetching data from open-meteo");
        }

        return await response.json()
        
    } catch (error) {
        console.error("Error in clima:", error);
        throw error;
    }
}