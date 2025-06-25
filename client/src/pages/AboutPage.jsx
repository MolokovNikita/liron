import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/about.module.css";
import Map from "../components/UI/Map";
import { Helmet } from "react-helmet-async";
import StructuredData from "../components/StructuredData";

export default function About() {
  return (
    <>
      <Helmet>
        <title>О компании — LIRON</title>
        <meta name="description" content="О компании LIRON — производитель матрасов для грузовиков. Качество, опыт, индивидуальный подход." />
        <meta name="keywords" content="о компании, liron, производство матрасов, матрасы для фур, матрасы для грузовиков" />
        <meta property="og:title" content="О компании — LIRON" />
        <meta property="og:description" content="О компании LIRON — производитель матрасов для грузовиков. Качество, опыт, индивидуальный подход." />
        <meta property="og:type" content="website" />
      </Helmet>
      <StructuredData />
      <Header />
      <h1 className={styles.about__title}>О нас</h1>
      <div className={styles.about}>
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
          <section className={styles.requisites}>
            <h3>Реквизиты</h3>
            <p>
              Индивидуальный предприниматель Ворохобов Игорь Михайлович
              <br />
              ОГРНИП: 305333424300018
              <br />
              ИНН: 333410338438
              <br />
              Фактический адрес: 602205, Владимирская обл., г. Муром, ул. Муромская, д. 2а.,
              пом. А710
              <br />
              Юридический адрес: 602205, Владимирская обл., г. Муром, ул. Прудовая, д.4
              <br />
              Расчетный счет: №40802810511510000383.
              <br />
              Наименование банка:  Филиал «ЦЕНТРАЛЬНЫЙ» Банка ВТБ ПАО г. Москва
              <br />
              Корр.счет банка: 30101 810 145 250 000 411
              <br />
              БИК банка: 044525411
              <br />
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
