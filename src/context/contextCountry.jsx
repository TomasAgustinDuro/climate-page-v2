// MyContext.js
import { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyCountryProvider = ({ children }) => {
    const [country, setCountry] = useState(null);

    return (
        <MyContext.Provider value={{ country, setCountry }}>
            {children}
        </MyContext.Provider>
    );
};
