import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";

const container = document.getElementById("root");
const root = createRoot(container);

const store = configureStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
