import React from "react";
import { HashRouter } from "react-router-dom";
import { AuthSwitch } from "./routes/AuthSwitch";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <HashRouter>
        <AuthProvider>
            <AuthSwitch/>
        </AuthProvider>
    </HashRouter>
  );
}

export default App;
