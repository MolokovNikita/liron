import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { unstable_HistoryRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const history = createBrowserHistory();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history} future={{ v7_startTransition: true }}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
