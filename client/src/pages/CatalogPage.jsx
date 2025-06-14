import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/catalog.module.css";
import config from "../config/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FeedbackModal from "../components/UI/FeedbackModal/FeedbackModal";
export default function Catalog() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${config.API_URL}/company`).then((res) => {
      setCompanies(
        res.data.map((item) => ({
          ...item,
          pic: `${config.API_URL}/uploads/companylogo/${item.name.toLowerCase()}.jpg`,
        })),
      );
    });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
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
        <div className={styles.feedback__section}>
          <p className={styles.feedback__text}>
            Не нашли марку для своего матраса? <br />
            Обращайтесь к нам — мы вам поможем!
          </p>
          <button onClick={() => setIsModalOpen(true)} className={styles.feedback__button}>
            Связаться с нами
          </button>
        </div>
      </div>
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  );
}
