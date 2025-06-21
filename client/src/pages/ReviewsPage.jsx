import styles from "../styles/review.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import config from "../config/config";
import GalleryBlock from "../components/UI/Gallery/GalleryBlock.jsx";


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
      <Header />
      <div className={styles.reviews}>
        <h1 className={styles.reviews__title}>Отзывы</h1>
        <div className={styles.gallery__wrapper}>
          <GalleryBlock images={gallery_images} />
        </div>
      </div>
      <Footer />
    </>
  );
}
