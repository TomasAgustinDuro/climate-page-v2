import { useState, useRef } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { fetchSuggestions } from "../../../services/suggestions.service";
import styles from "./AutoCompleteComponent.module.css";

function AutoCompleteComponent({ value, onChange }) {
  const [options, setOptions] = useState([]);
  const abortControllerRef = useRef(new AbortController()); // Referencia para el controlador de abortos

  const handleInputChange = async (event, newValue) => {
    onChange(event, newValue); 
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    const suggestions = await fetchSuggestions(newValue);
    setOptions(suggestions);
  };

  return (
    <Autocomplete
      freeSolo
      value={value}
      onInputChange={handleInputChange}
      options={options}
      classes={{
        root: styles.inputRoot,
        inputRoot: styles.inputBase,
        listbox: styles.listbox,
        option: styles.option,
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search for a city"/>
      )}
    />
  );
}

export default AutoCompleteComponent;
