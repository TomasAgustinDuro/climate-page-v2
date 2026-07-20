import { useContext } from 'react';
import { CityContext } from '../../context/CityContext';
import useWeatherData from '../../hooks/useWeatherData';
import WeatherInfo from '../../Components/WeatherInfo/WeatherInfo';
import ForecastList from '../../Components/Forecast/ForecastList';
import styles from './display.module.css';

function Display() {
  const { selectedCity } = useContext(CityContext);
  const { today, forecast, error } = useWeatherData(selectedCity);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if(!selectedCity) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>☁️</span>
        <p>Buscá una ciudad para ver el clima</p>
      </div>
    );
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
