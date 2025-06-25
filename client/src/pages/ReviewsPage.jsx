import styles from "../styles/review.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import config from "../config/config";
import GalleryBlock from "../components/UI/Gallery/GalleryBlock.jsx";
import { Helmet } from "react-helmet-async";


export default function Reviews() {
  const gallery_images = Array.from({ length: 7 }, (_, i) => {
    const filename = `${i + 1}.jpg`;
    return {
      original: `${config.API_URL}/uploads/reviews/${filename}`,
      thumbnail: `${config.API_URL}/uploads/reviews/${filename}`,
    };
  });

  return (
    <>
      <Helmet>
        <title>Отзывы — LIRON</title>
        <meta name="description" content="Отзывы клиентов о матрасах для грузовиков LIRON. Реальные мнения, опыт использования, рекомендации." />
        <meta name="keywords" content="отзывы, liron, отзывы клиентов, матрасы для фур, матрасы для грузовиков" />
        <meta property="og:title" content="Отзывы — LIRON" />
        <meta property="og:description" content="Отзывы клиентов о матрасах для грузовиков LIRON. Реальные мнения, опыт использования, рекомендации." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <h1 className={styles.reviews__title}>Отзывы</h1>
      <div className={styles.reviews}>
        <div className={styles.gallery__wrapper}>
          <GalleryBlock images={gallery_images} />
        </div>
      </div>
      <Footer />
    </>
  );
}
