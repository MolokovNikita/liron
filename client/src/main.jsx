import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { unstable_HistoryRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router history={history} future={{ v7_startTransition: true }}>
      <App />
    </Router>
  </StrictMode>,
);
