/**
 * Contexto global para la ciudad seleccionada.
 * Comparte el estado entre el componente de búsqueda (Browser)
 * y el de visualización (Display).
 */

import { createContext, useState } from "react";

/** @type {React.Context<{selectedCity: object|null, setSelectedCity: function}>} */
export const CityContext = createContext();

/**
 * Provider que envuelve la app y expone la ciudad seleccionada.
 * @param {object} props
 * @param {React.ReactNode} props.children - Componentes hijos.
 */
export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
