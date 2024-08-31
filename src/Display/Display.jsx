import { useContext, useEffect, useState } from "react";
import { clima } from "../services/climaHoy.service";
import { climaPronostico } from "../services/climaPronostico.service";
import styles from "./display.module.css";
import { MyContext } from "../context/contextCountry";

function Display() {
  const [hoy, setHoy] = useState();
  const [forecast, setForecast] = useState();
  const { country } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await clima(country);
        setHoy(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const resultForecast = await climaPronostico(country);
        setForecast(resultForecast);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };

    fetchData();
  }, [country]);

  if (!hoy || !forecast) {
    return <div className={styles.loader}></div>;
  }

  return (
    <>
      <div className={styles.articleContainer}>
        <section className={styles.sectionWeather}>
          <h2>Información del Clima</h2>

          <div className={styles.informationWeather}>
            {Object.entries(hoy).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        </section>
        <section className={styles.sectionPronostico}>
          <h2>Proximos dias</h2>

          <div className={styles.informationForecast}>
            {forecast.map((item, index) => (
              <div key={index} className={styles.detailForecast}>
                <strong>{item.date}</strong>
                <div className={styles.temp}>
                  <p>
                    <strong>Maxima: </strong> {item.maxima} 
                  </p>
                  <p>
                    <strong>Minima: </strong> {item.minima} 
                  </p>
                  <p>
                    <strong>Sensacion</strong> {item.sensacion} 
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Display;
