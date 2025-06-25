import styles from "../styles/payment.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

import {
  FaTruck,
  FaGlobe,
  FaCreditCard,
  FaBuilding,
} from "react-icons/fa";

export default function Payment() {
  return (
    <>
      <Helmet>
        <title>Оплата — LIRON</title>
        <meta name="description" content="Способы оплаты матрасов для грузовиков в компании LIRON. Удобно, быстро, безопасно." />
        <meta name="keywords" content="оплата, способы оплаты, liron, матрасы для фур, матрасы для грузовиков" />
        <meta property="og:title" content="Оплата — LIRON" />
        <meta property="og:description" content="Способы оплаты матрасов для грузовиков в компании LIRON. Удобно, быстро, безопасно." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <main className={styles.payment}>
        <h1 className={styles.payment__title}>Варианты оплаты</h1>

        <div className={styles.payment__container}>
          {/* Оплата при доставке курьером */}
          <div className={styles.payment__card}>
            <div className={styles.payment__iconContainer}>
              <FaTruck className={styles.payment__icon} />
              <h2 className={styles.payment__subtitle}>Доставка курьером</h2>
            </div>
            <p className={styles.payment__text}>
              В случае, если вы воспользовались услугой доставки нашими курьерами,
              оплата заказа производится <strong>при получении</strong> с
              предоставлением кассового и товарного чека. Оплатить можно
              <strong> наличными</strong> или <strong>переводом</strong> на карту.
            </p>
          </div>

          {/* Доставка в другие регионы (через ТК) */}
          <div className={styles.payment__card}>
            <div className={styles.payment__iconContainer}>
              <FaGlobe className={styles.payment__icon} />
              <h2 className={styles.payment__subtitle}>Доставка за пределы регионов</h2>

            </div>
            <p className={styles.payment__text}>
              Если вы находитесь за пределами:
            </p>
            <ul className={styles.payment__list}>
              <li className={styles.payment__listItem}>Владимирская область</li>
              <li className={styles.payment__listItem}>Московская область</li>
              <li className={styles.payment__listItem}>Нижегородская область</li>
              <li className={styles.payment__listItem}>Тульская область</li>
              <li className={styles.payment__listItem}>Рязань</li>
              <li className={styles.payment__listItem}>Казань</li>
              <li className={styles.payment__listItem}>Санкт-Петербург</li>
            </ul>
            <p className={styles.payment__text}>
              Вы можете воспользоваться <strong>любой транспортной компанией</strong>.
              В этом случае потребуется <strong>предоплата</strong> (после предоставления
              видеоотчета по заказу).
            </p>
          </div>

          {/* Электронные способы оплаты */}
          <div className={styles.payment__card}>
            <div className={styles.payment__iconContainer}>
              <FaCreditCard className={styles.payment__icon} />
              <h2 className={styles.payment__subtitle}>Электронные способы оплаты</h2>
            </div>
            <p className={styles.payment__text}>
              Оплата может быть произведена с помощью:
            </p>
            <ul className={styles.payment__list}>
              <li className={styles.payment__listItem}>Банковской карты</li>
              <li className={styles.payment__listItem}>Перевода по номеру</li>
              <li className={styles.payment__listItem}>Сбербанк Онлайн</li>
            </ul>
          </div>

          {/* Для юридических лиц */}
          <div className={styles.payment__card}>
            <div className={styles.payment__iconContainer}>
              <FaBuilding className={styles.payment__icon} />
              <h2 className={styles.payment__subtitle}>Для юридических лиц</h2>

            </div>
            <p className={styles.payment__text}>
              <strong>Безналичный расчет:</strong> Оплата производится по
              высланному счёту. Выдача или отгрузка заказа осуществляется
              <strong> только после поступления средств</strong> на расчётный счёт.
              <br />
              При получении необходимо предоставить <strong>доверенность</strong>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
