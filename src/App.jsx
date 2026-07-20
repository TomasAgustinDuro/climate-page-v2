import "./App.css";
import React, { Suspense } from "react";
import { CityProvider } from "./context/CityContext.jsx";
const Browser = React.lazy(() => import("./Components/Browser/Browser.jsx"));
const Display = React.lazy(() => import("./Pages/Display/Display.jsx"));


function App() {


  return ( 
    <div className="container">
      <CityProvider>
        <Suspense fallback={<div className="loader"></div>}>
          <Browser />
          <Display />
        </Suspense>
      </CityProvider>
    </div>

  );
}

export default App;