import styles from './Forecast.module.css';

const ForecastList = ({ forecast }) => (
  <section className={styles.sectionForecast}>
    <h2>Pronóstico para 5 días</h2>
    <div className={styles.informationForecast}>
      {forecast.map((item, index) => (
        <div key={index} className={styles.detailForecast}>
          <strong>{item.Dia}</strong>
          <div className={styles.temp}>
            <p>
              <strong>Máxima: </strong> {item.Maxima}
            </p>
            <p>
              <strong>Mínima: </strong> {item.Minima}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ForecastList;
