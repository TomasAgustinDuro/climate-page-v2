import { useState, useContext, useEffect } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { geocoding } from "../../../services/geocoding.service"
import styles from "./AutoCompleteComponent.module.css";
import { MyContext } from "../../../context/contextCountry";
import useDebounce from "../../../hooks/useDebounce";

function AutoCompleteComponent() {
  const [options, setOptions] = useState([]);
  const { setSelectedCity } = useContext(MyContext)
  const [inputValue, setInputValue] = useState("")
  const debounceValue = useDebounce(inputValue, 400)


  useEffect(() => {
    if(!debounceValue){
      setOptions([])
      return
    }

    const fetchOptions = async () => {
      const suggestions = await geocoding(debounceValue)
      setOptions(suggestions)
    }
    fetchOptions()
  }, [debounceValue])

  const handleInputChange = async (_, newValue) => {
    setInputValue(newValue)
  };

  return (
    <Autocomplete
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => `${option.name}, ${option.country}`}
      classes={{
        root: styles.inputRoot,
        inputRoot: styles.inputBase,
        listbox: styles.listbox,
        option: styles.option,
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search for a city" />
      )}
      onChange={
        (_, selectedValue) => { setSelectedCity(selectedValue) }
      }
    />
  );
}

export default AutoCompleteComponent;
