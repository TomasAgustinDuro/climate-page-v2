import { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyCountryProvider = ({ children }) => {
    const [selectedCity, setSelectedCity] = useState(null);

    return (
        <MyContext.Provider value={{ selectedCity, setSelectedCity }}>
            {children}
        </MyContext.Provider>
    );
};
