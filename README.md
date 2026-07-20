# Climate Page

Aplicación web de consulta de clima en tiempo real. Buscá una ciudad y obtené temperatura actual, sensación térmica, humedad y pronóstico de los próximos días.

## Stack

- **React 18** con Vite
- **MUI** (Autocomplete)
- **Open-Meteo API** (clima + geocoding, sin API key)

## Instalación

```bash
yarn install
yarn dev
```

## Estructura del proyecto

```
src/
├── Components/
│   ├── Browser/          # Buscador con autocomplete
│   ├── Forecast/         # Lista de pronóstico diario
│   └── WeatherInfo/      # Información del clima actual
├── Pages/
│   └── Display/          # Página principal que orquesta la visualización
├── context/
│   └── CityContext.jsx   # Contexto global de ciudad seleccionada
├── hooks/
│   ├── useDebounce.js    # Hook genérico de debounce
│   └── useWeatherData.js # Hook que obtiene y formatea datos meteorológicos
├── services/
│   ├── geocoding.service.js  # Búsqueda de ciudades (Open-Meteo Geocoding)
│   └── weather.service.js    # Datos de clima actual + pronóstico (Open-Meteo Forecast)
├── utilities/
│   └── weatherFormatter.js   # Formateo de datos crudos para la UI
├── App.jsx
├── App.css
└── main.jsx
```

## Flujo de datos

```
Input del usuario
    ↓
searchCities() → Open-Meteo Geocoding → lista de ciudades
    ↓
Usuario selecciona una → CityContext (selectedCity)
    ↓
useWeatherData detecta cambio → fetchWeather(lat, lon)
    ↓
Open-Meteo Forecast → { current, daily }
    ↓
formatToday() + formatForecast() → datos formateados
    ↓
WeatherInfo + ForecastList renderizan
```

## API utilizada

[Open-Meteo](https://open-meteo.com/) — 100% gratuita para uso no comercial, sin API key, 10.000 requests/día.

- **Geocoding:** `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast:** `https://api.open-meteo.com/v1/forecast`

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `yarn dev` | Servidor de desarrollo |
| `yarn build` | Build de producción |
| `yarn preview` | Preview del build |
| `yarn lint` | Ejecutar ESLint |
