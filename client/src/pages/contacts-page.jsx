import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/contacts.module.css";

export default function Contacts() {
  return (
    <>
      <Header />
      <div className={styles.contacts__container}>
        <div className={styles.contacts}>
          <h1 className={styles.contacts__title}>Контакты</h1>
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
          <div className={styles.contacts__map}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A9777c7322b74eb19b5e33c851e135402254b56719371c0f32fba5e9748a1cd7f&amp;source=constructor"
              className={styles.contacts__iframe}
              title="Yandex Map"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
