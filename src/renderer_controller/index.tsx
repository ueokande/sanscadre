import React from "react";
import ReactDOM from "react-dom";
import ClientProvider from "../renderer/providers/ClientProvider";
import ObserverProvider from "../renderer/providers/ObserverProvider";
import App from "./App";
import AppProvider from "./providers/AppProvider";
import "normalize.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ClientProvider>
      <ObserverProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ObserverProvider>
    </ClientProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
