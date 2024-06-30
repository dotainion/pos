import React from "react";
import { HashRouter } from "react-router-dom";
import { AuthRouter } from "./routes/AuthRouter";
import { AuthSwitch } from "./routes/AuthSwitch";

function App() {
  return (
    <HashRouter>
      <AuthSwitch/>
    </HashRouter>
  );
}

export default App;
