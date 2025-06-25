import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/contacts.module.css";
import Map from "../components/UI/Map";
import { Helmet } from "react-helmet-async";

export default function Contacts() {
  return (
    <>
      <Helmet>
        <title>Контакты — LIRON</title>
        <meta name="description" content="Контакты компании LIRON. Адрес, телефон, email, форма обратной связи." />
        <meta name="keywords" content="контакты, liron, телефон, адрес, email, обратная связь" />
        <meta property="og:title" content="Контакты — LIRON" />
        <meta property="og:description" content="Контакты компании LIRON. Адрес, телефон, email, форма обратной связи." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <div className={styles.contacts__container}>
        <h1 className={styles.contacts__title}>Контакты</h1>
        <div className={styles.contacts}>
          <div className={styles.contacts__infoContainer}>
            <div className={styles.contacts__info}>
              <p className={styles.contacts__item}>
                <strong>Телефон:</strong>
                <br />
                <a href="tel:+79209219311"> +7 920 921-93-11</a>
              </p>
              <p className={styles.contacts__item}>
                <strong>Email:</strong> <br />
                <a href="mailto:Voroxobov.a@mail.ru"> Voroxobov.a@mail.ru</a>
              </p>
              <p className={styles.contacts__item}>
                <strong>Адрес магазина:</strong> <br />
                602200, Владимирская обл., г. Муром, ул. Муромская, 2а
              </p>
              <p className={styles.contacts__item}>
                <strong>График работы:</strong> <br />
                Ежедневно с 9:00 до 21:00
              </p>
            </div>
            <div className={styles.contacts__form}>
              <h2 className={styles.contacts__subtitle}>Оставить зявку</h2>
              <form className={styles.contacts__formContainer}>
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  className={styles.contacts__input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.contacts__input}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  className={styles.contacts__input}
                />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Сообщение"
                  className={styles.contacts__textarea}
                ></textarea>
                <button type="submit" className={styles.contacts__button}>
                  Отправить
                </button>
              </form>
            </div>
          </div>
          <Map />
        </div>
      </div>
      <Footer />
    </>
  );
}
