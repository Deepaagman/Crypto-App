import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./app";
import store from "./app/store";

const element = document.getElementById("root");
const root = createRoot(element);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
