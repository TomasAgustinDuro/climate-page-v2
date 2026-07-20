import styles from "./Weather.module.css";
import { getTodayLabel } from "../../utilities/weatherFormatter";

const WeatherInfo = ({ today }) => (
  <section className={styles.sectionWeather}>
    <h2>Información del Clima</h2>
    <div className={styles.informationWeather}>
      {Object.entries(today).map(([key, value]) => (
        <div key={key} className={styles.entry}>
          <span className={styles.key}>
            <strong>{getTodayLabel(key)}: </strong>
          </span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  </section>
);

export default WeatherInfo;
