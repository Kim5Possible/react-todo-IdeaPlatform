import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

const appElement = document.getElementById("app")!;

const root = ReactDOM.createRoot(appElement);
root.render(<App />);
