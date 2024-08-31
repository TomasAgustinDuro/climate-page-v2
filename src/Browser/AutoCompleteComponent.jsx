import { useState, useRef } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "./AutoCompleteComponent.module.css";

const NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search?format=json&";

function AutoCompleteComponent({ value, onChange }) {
  const [options, setOptions] = useState([]);
  const abortControllerRef = useRef(new AbortController()); // Referencia para el controlador de abortos

  const fetchSuggestions = async (input) => {
    if (input) {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(
          `${NOMINATIM_API_URL}q=${encodeURIComponent(input)}&limit=50`,
          { signal: abortControllerRef.current.signal }
        );
        if (!response.ok) {
          throw new Error("Error en la solicitud a Nominatim");
        }

        const data = await response.json();

        const suggestions = data.map((place) => ({
          name: place.display_name,
          country: place.address ? place.address.country_code : "",
        }));

        setOptions(suggestions.map((s) => s.name));
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching suggestions:", error);
          setOptions([]);
        }
      }
    } else {
      setOptions([]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      value={value}
      onInputChange={(event, newValue) => {
        onChange(event, newValue); 
        fetchSuggestions(newValue);
      }}
      options={options}
      classes={{
        root: styles.inputRoot,
        inputRoot: styles.inputBase,
        listbox: styles.listbox,
        option: styles.option,
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for a city" />
      )}
    />
  );
}

export default AutoCompleteComponent;
