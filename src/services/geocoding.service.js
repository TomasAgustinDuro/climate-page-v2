export async function geocoding(country) {
    if (!country){
        return []
    }

    const url = "https://geocoding-api.open-meteo.com/v1/search"
    const request_url = `?name=${encodeURIComponent(country)}&count=10&language=es`;
    const countries = []

    try {
        const response = await fetch(url + request_url)
        if (!response.ok) {
            throw new Error("Error fetching data from open-meteo");
        }
        const data = await response.json()

        for (const item of data.results) {
            let newCountry = {
                name: item.name,
                country: item.country,
                latitude: item.latitude,
                longitude: item.longitude
            }

            countries.push(newCountry)

        }
        return countries
    } catch (error) {
        console.error("Error in countryGeocoder:", error);
        throw error;
    }
}