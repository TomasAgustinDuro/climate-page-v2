import { useEffect, useState } from "react";
import { clima } from "../services/clima.service";

function Display() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await clima();
        console.log("resultados:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Informacion</div>
      <div>
      {Object.entries(data).map(([key, value]) => (
      <div key={key}>
        <strong>{key}</strong>: {value}
      </div>
    ))}
      </div>
    </>
  );
}

export default Display;
