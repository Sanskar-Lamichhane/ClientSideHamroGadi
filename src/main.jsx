import React from "react";
import ReactDOM from "react-dom/client";
import App1 from "./App1.jsx";
import "./index.css";
import Hero from "./hero.jsx";
import Todos from "./Todos.jsx";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux"; // Import useSelector to get user role
import { store } from "./Redux/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App1 />
    </Provider>
  </React.StrictMode>,
);
