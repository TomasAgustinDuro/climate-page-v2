import styles from "./Forecast.module.css";

const ForecastList = ({ forecast }) => (
  <section className={styles.sectionForecast}>
    <h2>Pronóstico para 5 días</h2>
    <div className={styles.informationForecast}>
      {forecast.map((item, index) => (
        <div key={index} className={styles.detailForecast}>
          <strong>{item.day}</strong>
          <div className={styles.temp}>
            <p>
              <strong>Máxima: </strong> {item.maxTemperature}
            </p>
            <p>
              <strong>Mínima: </strong> {item.minTemperature}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ForecastList;
