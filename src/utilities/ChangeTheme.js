export function ChangeTheme(dataWeather, colorSchemes) {
  let selectedScheme;

  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;


  if (dataWeather.Weather === "Clear") {
    selectedScheme = isNight ? colorSchemes.clearNight : colorSchemes.clearDay;
  } else if (dataWeather.Weather === "Clouds") {
    selectedScheme = isNight
      ? colorSchemes.cloudyNight
      : colorSchemes.cloudyDay;
  } else if (dataWeather.Weather === "Rain") {
    selectedScheme = colorSchemes.rain;
  } else if (dataWeather.Weather === "Snow") {
    selectedScheme = colorSchemes.snow;
  }

  document.body.style.backgroundColor = selectedScheme.background;
  document.body.style.color = selectedScheme.text;
}
