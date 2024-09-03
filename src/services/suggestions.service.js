const NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search?format=json&";

export async function fetchSuggestions(input) {
  const abortController = new AbortController();

  if (input) {
    try {
      const response = await fetch(
        `${NOMINATIM_API_URL}q=${encodeURIComponent(input)}&limit=50`,
        { signal: abortController.signal }
      );
      if (!response.ok) {
        throw new Error("Error en la solicitud a Nominatim");
      }

      const data = await response.json();

      const suggestions = data.map((place) => ({
        name: place.display_name,
        country: place.address ? place.address.country_code : "",
      }));

      return suggestions.map((s) => s.name);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error fetching suggestions:", error);
        return [];
      }
    }
  }
  
  return [];
}
