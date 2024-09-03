// WeatherInfo.js
import styles from './Weather.module.css';

const WeatherInfo = ({ hoy }) => (
  <section className={styles.sectionWeather}>
    <h2>Información del Clima</h2>
    <div className={styles.informationWeather}>
      {Object.entries(hoy).map(
        ([key, value]) =>
          key !== 'Weather' && (
            <div key={key} className={styles.entry}>
              {key === 'Icono' ? (
                <img src={value} alt="Icono del clima" className={styles.icon} />
              ) : (
                <>
                  <span className={styles.key}>
                    <strong>{key}:</strong>
                  </span>
                  <span className={styles.value}>{value}</span>
                </>
              )}
            </div>
          )
      )}
    </div>
  </section>
);

export default WeatherInfo;
