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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:company" element={<MattressesPage />} />
        <Route path="/catalog/:company/:productID" element={<MattressPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/cart" element={<BasketPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/wholesale" element={<WholesalePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
