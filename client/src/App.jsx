import "./App.css";
import MainPage from "./pages/main-page";
import NotFoundPage from "./pages/not-found-page";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
