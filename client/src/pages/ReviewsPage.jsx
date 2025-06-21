import styles from "../styles/review.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import config from "../config/config";
import { useState } from "react";
import GalleryBlock from "../components/UI/Gallery/GalleryBlock.jsx";


export default function Reviews() {
  const gallery_images = Array.from({ length: 7 }, (_, i) => {
    const filename = `${i + 1}.jpg`;
    return {
      original: `${config.API_URL}/uploads/reviews/${filename}`,
      thumbnail: `${config.API_URL}/uploads/reviews/${filename}`,
    };
  });
  const [currentReview, setCurrentReview] = useState(0);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  return (
    <>
      <Header />
      <div className={styles.reviews}>
        <h1 className={styles.reviews__title}>Отзывы</h1>
        {/* <div className={styles.reviews__container}>
          <div className={styles.apply__review__container}>
          </div>
          <div className={styles.reviews__info}>
            <h2 className={styles.reviews__user}>
              {reviews[currentReview].user}
            </h2>
            <p className={styles.reviews__date}>
              {reviews[currentReview].date}
            </p>
          </div>
          <div className={styles.reviews__carousel}>
            <button
              onClick={handlePrevScreenshot}
              className={styles.reviews__carouselButton}
            >
              <IoIosArrowBack />
            </button>
            <img
              src={reviews[currentReview].screenshots[currentScreenshot]}
              alt="Screenshot"
              className={styles.reviews__image}
            />
            <button
              onClick={handleNextScreenshot}
              className={styles.reviews__carouselButton}
            >
              <IoIosArrowForward />
            </button>
          </div>
          <div className={styles.reviews__navigation}>
            <button
              onClick={handlePrevReview}
              className={styles.reviews__navButton}
            >
              Предыдущий отзыв
            </button>
            <button
              onClick={handleNextReview}
              className={styles.reviews__navButton}
            >
              Следующий отзыв
            </button>
          </div>
        </div> */}
        <div className={styles.gallery_container}>
          <GalleryBlock images={gallery_images} />
        </div>
      </div>

      <Footer />
    </>
  );
}
