import { useState, useContext } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import {geocoding} from "../../../services/geocoding.service"
import styles from "./AutoCompleteComponent.module.css";
import { MyContext } from "../../../context/contextCountry";

function AutoCompleteComponent() {
  const [options, setOptions] = useState([]);


  const { setSelectedCity } = useContext(MyContext)

  const handleInputChange = async (_, newValue) => {
    const suggestions = await geocoding(newValue);
    setOptions(suggestions);
  };

  return (
    <Autocomplete
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => option.name}
      classes={{
        root: styles.inputRoot,
        inputRoot: styles.inputBase,
        listbox: styles.listbox,
        option: styles.option,
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search for a city"/>
      )}
      onChange={
       (_, selectedValue) => {setSelectedCity(selectedValue)}
      }
    />
  );
}

export default AutoCompleteComponent;
