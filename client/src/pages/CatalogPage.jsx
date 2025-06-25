import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/catalog.module.css";
import config from "../config/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FeedbackModal from "../components/UI/FeedbackModal/FeedbackModal";
import { Helmet } from "react-helmet-async";

function CompanyCardSkeleton() {
  return (
    <div className={styles.company__card}>
      <div className={styles.company__logo_skeleton}></div>
    </div>
  );
}

export default function Catalog() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${config.API_URL}/company`).then((res) => {
      setCompanies(
        res.data.map((item) => ({
          ...item,
          pic: `${config.API_URL}/uploads/companylogo/${item.name.toLowerCase()}.jpg`,
        })),
      );
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Каталог матрасов для грузовиков — LIRON</title>
        <meta name="description" content="Каталог матрасов для всех марок грузовиков. Индивидуальные размеры, доставка по России, гарантия качества." />
        <meta name="keywords" content="каталог матрасов, матрасы для фур, матрасы для грузовиков, купить матрас для фуры" />
        <meta property="og:title" content="Каталог матрасов для грузовиков — LIRON" />
        <meta property="og:description" content="Каталог матрасов для всех марок грузовиков. Индивидуальные размеры, доставка по России." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <div className={styles.container}>
        <div className={styles.catalog__title}>Каталог</div>
        <div className={styles.company__container}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => <CompanyCardSkeleton key={idx} />)
            : companies.map((company) => (
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
