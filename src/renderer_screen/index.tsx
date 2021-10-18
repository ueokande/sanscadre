import React from "react";
import ReactDOM from "react-dom";
import ClientProvider from "../renderer/providers/ClientProvider";
import ObserverProvider from "../renderer/providers/ObserverProvider";
import App from "./App";
import "normalize.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ClientProvider>
      <ObserverProvider>
        <App />
      </ObserverProvider>
    </ClientProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
