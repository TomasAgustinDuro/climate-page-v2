import { useContext, useState } from "react";
import { MyContext } from "../context/contextCountry";
import AutoCompleteComponent from "./AutoCompleteComponent";
import styles from "./browser.module.css"

function Browser() {
  const { setCountry } = useContext(MyContext);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event, value) {
    setInputValue(value); 
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCountry(inputValue);
    setInputValue("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AutoCompleteComponent value={inputValue} onChange={handleInputChange} />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Browser;
