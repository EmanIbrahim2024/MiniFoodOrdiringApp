import ReactDOM from "react-dom/client";
import React from "react";
import { CartProvider } from "./store/CartContext";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<CartProvider><App /></CartProvider>);
