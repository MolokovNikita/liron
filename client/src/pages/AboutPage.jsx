import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/about.module.css";
import Map from "../components/UI/Map";
export default function About() {
  return (
    <>
      <Header />
      <div className={styles.about}>
        <h1 className={styles.about__title}>О нас</h1>
        <div className={styles.about__content}>
          <section className={styles.about__section}>
            <p className={styles.about__text}>
              Наша компания занимается производством и продажей матрасов для
              грузовых автомобилей и аксессуаров, которые делают сон водителей
              комфортным и безопасным. Производственные мощности находятся в
              городе Муром, Владимирской области.
            </p>
          </section>
          <section className={styles.about__section}>
            <h2 className={styles.about__subtitle}>Наши принципы</h2>
            <ol className={styles.about__list}>
              <li className={styles.about__item}>
                <strong>Баланс цены и качества</strong> — мы оптимизировали
                процессы, чтобы предлагать качественные изделия по доступной
                цене. Собственные производства, отсутствие шоу-румов и
                минимальные расходы на рекламу помогают нам удерживать низкие
                цены.
              </li>
              <li className={styles.about__item}>
                <strong>Широкий ассортимент</strong> — мы предлагаем матрасы для
                стандартных и нестандартных спальных мест грузовиков, включая
                индивидуальные размеры и формы.
              </li>
              <li className={styles.about__item}>
                <strong>Только качественные материалы</strong> — используем
                экологически чистые и современные материалы от ведущих
                поставщиков.
              </li>
              <li className={styles.about__item}>
                <strong>Современные технологии и ручная работа</strong> —
                сохраняем тепло и заботу человеческих рук, придерживаясь
                традиций ручного производства.
              </li>
            </ol>
          </section>
          <section className={styles.about__section}>
            <p className={styles.about__text}>
              Вся наша продукция сертифицирована. Мы гарантируем высокое
              качество, доступные цены и индивидуальный подход.
            </p>
            <p className={styles.about__contact}>
              <strong>Электронная почта:</strong>{" "}
              <a
                href="mailto:info@matrasliron.ru"
                className={styles.about__link}
              >
                Voroxobov.a@mail.ru
              </a>
            </p>
          </section>
          <section>
            <h3>Реквизиты</h3>
            <p>
              Индивидуальный предприниматель Форов Александр Игоревич
              <br />
              ОГРНИП: 311774615900172
              <br />
              ИНН: 772136398259
              <br />
              Фактический и почтовый адрес: 111141, Москва, ул. Кусковская, 20А,
              пом. А710
              <br />
              Юридический адрес: 109125, г. Москва, Волжский бульвар, дом 13
              <br />
              Расчетный счет: 40802810438000121445 в Банк ПАО Сбербанк, г.
              Москва
              <br />
              Корр.счет банка: 30101810400000000225
              <br />
              БИК банка: 044525225
              <br />
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
