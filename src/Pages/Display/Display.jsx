import { useContext } from 'react';
import { MyContext } from '../../context/contextCountry';
import useWeatherData from '../../hooks/useWeatherData';
import WeatherInfo from '../../Components/WeatherInfo/WeatherInfo';
import ForecastList from '../../Components/Forecast/ForecastList';
import styles from './display.module.css';

function Display() {
  const { country } = useContext(MyContext);
  const { hoy, forecast, error } = useWeatherData(country);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!hoy || !forecast) {
    return <div className="loader"></div>;
  }

  return (
    <div className={styles.articleContainer}>
      <WeatherInfo hoy={hoy} />
      <ForecastList forecast={forecast} />
    </div>
  );
}

export default Display;
