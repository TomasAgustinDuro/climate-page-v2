import { useState } from "react";

export function useFormHandler(initialValue, onSubmit) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  return { inputValue, handleInputChange, handleSubmit };
}
