import { useContext, useEffect, useState } from "react";
import { clima } from "../services/climaHoy.service";
import { climaPronostico } from "../services/climaPronostico.service";
import styles from "./display.module.css";
import { MyContext } from "../context/contextCountry";
import { colorSchemes } from "../utilities/ColorSchemes";
import { ChangeTheme } from "../utilities/ChangeTheme";

function Display() {
  const [hoy, setHoy] = useState(null);
  const [forecast, setForecast] = useState(null);
  const { country } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await clima(country);
        setHoy(result);

        ChangeTheme(result, colorSchemes);
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
            {Object.entries(hoy).map(
              ([key, value]) =>
                key !== "Weather" && (
                  <div key={key} className={styles.entry}>
                    {key === "Icono" ? (
                      <img
                        src={value}
                        alt="Icono del clima"
                        className={styles.icon}
                      />
                    ) : (
                      <>
                        <span className={styles.key}><strong>{key}:</strong></span>
                        <span className={styles.value}>{value}</span>
                      </>
                    )}
                  </div>
                )
            )}
          </div>
        </section>
        <section className={styles.sectionPronostico}>
          <h2>Pronostico para 5 días </h2>

          <div className={styles.informationForecast}>
            {forecast.map((item, index) => (
              <div key={index} className={styles.detailForecast}>
                <strong></strong>
                <div className={styles.temp}>
                  <img
                    src={item.icono}
                    alt="icono clima"
                    className={styles.imgForecast}
                  />
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
      </div>
    </>
  );
}

export default Display;
