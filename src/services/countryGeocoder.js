// countryGeocoder.js
export async function countryGeocoder(country) {
    const api_key = "50aa3d82bb2b4d869199b5a59e105aeb";
  
    const api_url = "https://api.opencagedata.com/geocode/v1/json";
    const request_url = `${api_url}?key=${api_key}&q=${country}&pretty=1&no_annotations=1`;
  
    try {
      const response = await fetch(request_url);
      if (!response.ok) {
        throw new Error('Error fetching data from OpenCage');
      }
      const data = await response.json();
      if (data.results.length > 0) {
        const latitud = data.results[0].geometry.lat;
        const longitud = data.results[0].geometry.lng;
        return { latitud, longitud };
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error in countryGeocoder:', error);
      throw error; 
    }
  }
  