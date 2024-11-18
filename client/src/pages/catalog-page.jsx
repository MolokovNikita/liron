import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/catalog.module.css";
import config from "../config/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Catalog() {
  useEffect(() => {
    console.log("fetch companys");
  }, []);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "DAF",
      pic: `${config.API_URL}/uploads/companylogo/daf_big.jpg`,
    },
    {
      id: 2,
      name: "MAN",
      pic: `${config.API_URL}/uploads/companylogo/man_big.jpg`,
    },
    {
      id: 3,
      name: "Volvo",
      pic: `${config.API_URL}/uploads/companylogo/volvo_big.jpg`,
    },
    {
      id: 4,
      name: "Scania",
      pic: `${config.API_URL}/uploads/companylogo/scania_big.png`,
    },
    {
      id: 5,
      name: "Mercedes-Benz",
      pic: `${config.API_URL}/uploads/companylogo/mers_big.jpg`,
    },
    {
      id: 6,
      name: "Iveco",
      pic: `${config.API_URL}/uploads/companylogo/iveco_big.jpg`,
    },
    {
      id: 7,
      name: "Renault",
      pic: `${config.API_URL}/uploads/companylogo/renault_big.jpg`,
    },
    ,
  ]);
  return (
    <>
      <Header />
      <div>
        <div className={styles.catalog__title}>Каталог</div>
        <div className={styles.company__container}>
          {companies.map((company) => (
            <div key={company.id} className={styles.company__card}>
              <Link to={`/catalog/${company.name.toLowerCase()}`}>
                <img
                  src={company.pic}
                  alt={`${company.name} logo`}
                  className={styles.company__logo}
                />
                <div className={styles.company__name}>{company.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
