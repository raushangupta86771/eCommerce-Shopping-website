import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/ReduxStore";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

