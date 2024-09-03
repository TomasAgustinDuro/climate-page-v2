export function ChangeTheme(dataWeather, colorSchemes) {
  let selectedScheme;
  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;

  switch (dataWeather.Weather) {
    case "Clear":
      selectedScheme = isNight ? colorSchemes.clearNight : colorSchemes.clearDay;
      break;
    case "Clouds":
      selectedScheme = isNight ? colorSchemes.cloudyNight : colorSchemes.cloudyDay;
      break;
    case "Rain":
      selectedScheme = colorSchemes.rain;
      break;
    case "Snow":
      selectedScheme = colorSchemes.snow;
      break;
    default:
      selectedScheme = colorSchemes.clearDay; // Default case
  }

  document.body.style.backgroundColor = selectedScheme.background;
  document.body.style.color = selectedScheme.text;
}
