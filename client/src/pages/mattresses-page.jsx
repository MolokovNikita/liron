import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/catalog.module.css";
import config from "../config/config";
import { useEffect, useState } from "react";

export default function Mattresses() {
  const { company } = useParams();
  const location = useLocation();
  useEffect(() => {
    console.log("fetch mattresses");
  }, []);
  const [mattresses, setMattresses] = useState([{ id: 1 }, { id: 2 }]);
  return (
    <>
      <Header />
      {company}
      <Footer />
    </>
  );
}
