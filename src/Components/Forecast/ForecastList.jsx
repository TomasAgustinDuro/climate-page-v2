import styles from './Forecast.module.css';

const ForecastList = ({ forecast }) => (
  <section className={styles.sectionForecast}>
    <h2>Pronóstico para 5 días</h2>
    <div className={styles.informationForecast}>
      {forecast.map((item, index) => (
        <div key={index} className={styles.detailForecast}>
          <strong>{item.date}</strong>
          <div className={styles.temp}>
            <img src={item.icono} alt="icono clima" className={styles.imgForecast} />
            <p>
              <strong>Máxima: </strong> {item.maxima}
            </p>
            <p>
              <strong>Mínima: </strong> {item.mínima}
            </p>
            <p>
              <strong>Sensación</strong> {item.sensacion}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ForecastList;
