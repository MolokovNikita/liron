import "./App.css";
import MainPage from "./pages/main-page";
import NotFoundPage from "./pages/not-found-page";
import CatalogPage from "./pages/catalog-page";
import CalculatorPage from "./pages/calculator-page";
import ContactsPage from "./pages/contacts-page";
import AboutUsPage from "./pages/aboutus-page";
import WarrantyPage from "./pages/warranty-page";
import PaymentPage from "./pages/payment-page";
import ReviewsPage from "./pages/reviews-page";
import MattressesPage from "./pages/mattresses-page";
import MattressPage from "./pages/mattress-page";
import { Routes, Route, useLocation } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:company" element={<MattressesPage />} />
        <Route path="/catalog/:company/:productID" element={<MattressPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
