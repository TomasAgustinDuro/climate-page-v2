import { useContext } from 'react';
import { MyContext } from '../../context/contextCountry';
import useWeatherData from '../../hooks/useWeatherData';
import WeatherInfo from '../../Components/WeatherInfo/WeatherInfo';
import ForecastList from '../../Components/Forecast/ForecastList';
import styles from './display.module.css';

function Display() {
  const { selectedCity } = useContext(MyContext);
  const { today, forecast, error } = useWeatherData(selectedCity);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!today || !forecast) {
    return <div className="loader"></div>;
  }

  return (
    <div className={styles.articleContainer}>
      <WeatherInfo today={today} />
      <ForecastList forecast={forecast} />
    </div>
  );
}

export default Display;
