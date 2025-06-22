import "./App.css";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFound";
import CatalogPage from "./pages/CatalogPage";
import DeliveryPage from "./pages/DeliveryPage";
import ContactsPage from "./pages/ContactsPage";
import AboutUsPage from "./pages/AboutPage";
import PaymentPage from "./pages/PaymentPage";
import ReviewsPage from "./pages/ReviewsPage";
import MattressesPage from "./pages/MattressesPage";
import MattressPage from "./pages/MattressPage";
import BasketPage from "./pages/CartPage";
import WholesalePage from "./pages/WholesalePage";
import { Routes, Route } from "react-router-dom";
import RefundPage from "./pages/RefundPage";
import ScrollToTop from "./components/UI/ScrollToTop";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><ScrollToTop /><MainPage /></>} />
        <Route path="/catalog" element={<><ScrollToTop /><CatalogPage /></>} />
        <Route path="/catalog/:company" element={<><ScrollToTop /><MattressesPage /></>} />
        <Route path="/catalog/:company/:productID" element={<><ScrollToTop /><MattressPage /></>} />
        <Route path="/delivery" element={<><ScrollToTop /><DeliveryPage /></>} />
        <Route path="/contacts" element={<><ScrollToTop /><ContactsPage /></>} />
        <Route path="/aboutus" element={<><ScrollToTop /><AboutUsPage /></>} />
        <Route path="/payment" element={<><ScrollToTop /><PaymentPage /></>} />
        <Route path="/reviews" element={<><ScrollToTop /><ReviewsPage /></>} />
        <Route path="/cart" element={<><ScrollToTop /><BasketPage /></>} />
        <Route path="/refund" element={<><ScrollToTop /><RefundPage /></>} />
        <Route path="/wholesale" element={<><ScrollToTop /><WholesalePage /></>} />
        <Route path="*" element={<><ScrollToTop /><NotFoundPage /></>} />
      </Routes>
    </>
  );
}

export default App;
