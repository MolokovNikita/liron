import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { unstable_HistoryRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import CartProvider from "./context/cartContext.jsx";
const history = createBrowserHistory();
createRoot(document.getElementById("root")).render(
  <Router history={history} future={{ v7_startTransition: true }}>
    <CartProvider>
        <App />
    </CartProvider>
  </Router>,
);
