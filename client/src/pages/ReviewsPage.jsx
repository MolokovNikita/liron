import styles from "../styles/review.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import config from "../config/config";
import { useState } from "react";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      user: "Иван Петров",
      date: "2024-11-20",
      screenshots_count: 2,
      screenshots: [
        `${config.API_URL}/uploads/reviews/1/1.jpg`,
        `${config.API_URL}/uploads/reviews/1/2.jpg`,
      ],
    },
    {
      id: 2,
      user: "Василий Смирнова",
      date: "2024-11-22",
      screenshots_count: 1,
      screenshots: [`${config.API_URL}/uploads/reviews/2/1.jpg`],
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const handleNextScreenshot = () => {
    const next =
      (currentScreenshot + 1) % reviews[currentReview].screenshots.length;
    setCurrentScreenshot(next);
  };

  const handlePrevScreenshot = () => {
    const prev =
      (currentScreenshot - 1 + reviews[currentReview].screenshots.length) %
      reviews[currentReview].screenshots.length;
    setCurrentScreenshot(prev);
  };

  const handleNextReview = () => {
    const next = (currentReview + 1) % reviews.length;
    setCurrentReview(next);
    setCurrentScreenshot(0);
  };

  const handlePrevReview = () => {
    const prev = (currentReview - 1 + reviews.length) % reviews.length;
    setCurrentReview(prev);
    setCurrentScreenshot(0);
  };

  return (
    <>
      <Header />
      <div className={styles.reviews}>
        <h1 className={styles.reviews__title}>Отзывы</h1>
        <div className={styles.reviews__container}>
          <div className={styles.apply__review__container}>
            <p>
              Вы можете оценить качество работы нашего магазина и оставить отзыв
              о нашей работе.
            </p>
            <button className={styles.apply_review__btn}>Оставить отзыв</button>
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
        </div>
      </div>

      <Footer />
    </>
  );
}
