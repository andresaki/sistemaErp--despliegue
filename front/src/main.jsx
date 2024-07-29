import React, { useEffect } from "react";
BrowserRouter
// redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// react dom
import ReactDOM from "react-dom/client";

// estilos
import "./index.css";
import { ToastWrapper } from "keep-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
        <BrowserRouter>
           <App />
        </BrowserRouter>
        <ToastWrapper />
    </Provider>
);
