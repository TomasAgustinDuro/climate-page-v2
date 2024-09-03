import { useContext } from "react";
import { MyContext } from "../../context/contextCountry";
import AutoCompleteComponent from "./Components/AutoCompleteComponent";
import { useFormHandler } from "../../hooks/useFormHandler"; 
import styles from "./browser.module.css";

function Browser() {
  const { setCountry } = useContext(MyContext);

  const { inputValue, handleInputChange, handleSubmit } = useFormHandler("", (value) => {
    setCountry(value);
  });

  return (
    <form className={styles.formCountry} onSubmit={handleSubmit}>
      <AutoCompleteComponent value={inputValue} onChange={handleInputChange} />
      <button className={styles.btn} type="submit">Enviar</button>
    </form>
  );
}

export default Browser;
