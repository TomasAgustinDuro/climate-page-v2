import "./App.css";
import React, { Suspense } from "react";
import { MyCountryProvider } from "./context/contextCountry.jsx";

function App() {
  const Browser = React.lazy(() => import("./Browser/Browser.jsx"));
  const Display = React.lazy(() => import("./Display/Display.jsx"));

  return (
    <>
      <div className="container">
        <MyCountryProvider>
            <Suspense fallback={<div className="loader"></div>}>
              <Browser />
              <Display />
            </Suspense>
        </MyCountryProvider>
      </div>
    </>
  );
}

export default App;
