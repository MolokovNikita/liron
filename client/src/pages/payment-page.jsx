import styles from "../styles/payment.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  FaCashRegister,
  FaTruck,
  FaCreditCard,
  FaBuilding,
} from "react-icons/fa";

export default function Payment() {
  return (
    <>
      <Header />
      <main className={styles.payment}>
        <h1 className={styles.payment__title}>Варианты оплаты</h1>
        <div className={styles.payment__container}>
          {/* Оплата в торговой точке */}
          <div className={styles.payment__card}>
            <FaCashRegister className={styles.payment__icon} />
            <h2 className={styles.payment__subtitle}>В нашей торговой точке</h2>
            <p className={styles.payment__text}>
              <strong>Оплата наличными:</strong> Вы оплачиваете заказ наличными
              в нашей торговой точке. При получении заказа вы проверяете
              комплектность товара и убеждаетесь в отсутствии дефектов. Оплата
              принимается по кассовому чеку.
            </p>
          </div>

          {/* Оплата при доставке */}
          <div className={styles.payment__card}>
            <FaTruck className={styles.payment__icon} />
            <h2 className={styles.payment__subtitle}>При доставке курьером</h2>
            <p className={styles.payment__text}>
              <strong>Оплата наличными:</strong> В случае, если вы
              воспользовались услугой доставки, оплата заказа производится с
              предоставлением кассового и товарного чека. При получении вы
              проверяете товарный вид и комплектность заказа.
            </p>
          </div>

          {/* Электронные платежи */}
          <div className={styles.payment__card}>
            <FaCreditCard className={styles.payment__icon} />
            <h2 className={styles.payment__subtitle}>
              Через электронные сервисы платежных систем
            </h2>
            <p className={styles.payment__text}>
              Вы можете воспользоваться сервисами электронных платежей и
              оплатить заказ банковской картой, через интернет-банк или внеся
              наличные через терминал.
            </p>
            <ul className={styles.payment__list}>
              <li className={styles.payment__listItem}>Банковской картой</li>
              <li className={styles.payment__listItem}>Через терминал</li>
              <li className={styles.payment__listItem}>Сбербанк онлайн</li>
            </ul>
          </div>

          {/* Для юридических лиц */}
          <div className={styles.payment__card}>
            <FaBuilding className={styles.payment__icon} />
            <h2 className={styles.payment__subtitle}>Для юридических лиц</h2>
            <p className={styles.payment__text}>
              <strong>Безналичный расчет:</strong> Оплата производится по
              высланному счёту. Выдача заказа или его отгрузка для доставки
              возможна только после поступления средств на наш расчетный счёт.
              При получении заказа вам необходимо предоставить доверенность.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
