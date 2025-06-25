import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import styles from "../styles/main-content.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Map from "../components/UI/Map.jsx";
import config from "../config/config.js";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import GalleryBlock from "../components/UI/Gallery/GalleryBlock.jsx";
import { Helmet } from "react-helmet-async";
import StructuredData from "../components/StructuredData";

export default function MainPage() {
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false, false]);
  const [companies, setCompanies] = useState([]);

  const gallery_images = Array.from({ length: 44 }, (_, i) => {
    const filename = `${i + 1}.jpg`;
    return {
      original: `${config.API_URL}/uploads/gallery_images/${filename}`,
      thumbnail: `${config.API_URL}/uploads/gallery_images/${filename}`,
    };
  });

  const bestsellers_dummy = [
    { id: 1, name: 'DAF XF 105', price: '14 500 ₽', pic: `${config.API_URL}/uploads/mattresses/11/1.jpg`, company: 'DAF', productID: 11 },
    { id: 2, name: 'Mercedes-Benz Actros MP1', price: '14 500 ₽', pic: `${config.API_URL}/uploads/mattresses/14/1.jpg`, company: 'Mercedes-Benz', productID: 14 },
    { id: 3, name: 'Scania R', price: '14 500 ₽', pic: `${config.API_URL}/uploads/mattresses/5/1.jpg`, company: 'Scania', productID: 5 },
  ];

  const faqQuestions = [
    "Как выбрать подходящий матрас для моего грузовика?",
    "Как узнать размеры штатного матраса моего грузовика?",
    "Из каких материалов изготовлены ваши матрасы?",
    "Как ухаживать за матрасом, чтобы он служил дольше?",
    "Могу ли я заказать матрас нестандартного размера?",
    "Мне нужно сделать матрас нестандартной формы и размера. Как заказать?"
  ];

  const faqAnswers = [
    "Мы предлагаем подробные инструкции по выбору, чтобы учесть модель, размеры и ваши пожелания.",
    "Укажите марку и модель вашего грузовика, и мы подскажем подходящие размеры.",
    "Мы используем гипоаллергенные материалы, которые обеспечивают комфорт и долговечность.",
    "Рекомендуем использовать защитный чехол и регулярно чистить изделие.",
    "Да, мы изготавливаем матрасы по индивидуальным параметрам.",
    <>
      <div>Мы делаем не только стандартные матрасы, по точно выверенным размерам спального места, но так же матрасы спроектированные по индивидуальным пожеланиям (различные изменения размера/формы спальника, решения в машины где спальник был не предусмотрен).</div>
      <div>Для заказа такого матраса нужно правильно снять размеры. Сделайте заявку — мы свяжемся и поможем решить данный вопрос.</div>
    </>
  ];

  useEffect(() => {
    axios
      .get(`${config.API_URL}/company`)
      .then((res) => {
        const companiesWithPic = res.data.slice(0, 10).map((item) => ({
          ...item,
          pic: `${config.API_URL}/uploads/companylogo/${item.name.toLowerCase()}.jpg`,
        }));
        setCompanies(companiesWithPic);
      })
      .catch((err) => {
        console.error("Ошибка при получении компаний:", err);
      });
  }, []);

  const toggleFaq = (index) => {
    const newFaqOpen = [...faqOpen];
    newFaqOpen[index] = !newFaqOpen[index];
    setFaqOpen(newFaqOpen);
  };

  return (
    <>
      <Helmet>
        <title>Матрасы для фур и грузовиков — LIRON</title>
        <meta name="description" content="Изготовление матрасов для всех марок грузовиков. Индивидуальные размеры, доставка по России. Гарантия качества." />
        <meta name="keywords" content="матрасы для фур, матрасы для грузовиков, матрас daf, матрас volvo, матрас scania, купить матрас для фуры" />
        <meta property="og:title" content="Матрасы для фур и грузовиков — LIRON" />
        <meta property="og:description" content="Изготовление матрасов для всех марок грузовиков. Индивидуальные размеры, доставка по России." />
        <meta property="og:image" content="/og-main.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>
      <StructuredData companies={companies} faqQuestions={faqQuestions} faqAnswers={faqAnswers} />
      <Header />

      <div className={styles.hero__container}>
        <img src={`${config.API_URL}/uploads/main_image.jpg`} alt="Матрас в фуре" className={styles.hero__image} />
        <div className={styles.hero__overlay}></div>
        <h1 className={styles.hero__text}>Матрасы в фуру</h1>
      </div>

      <div className={styles.topic__container}>
        <div className={styles.topic_text__container}>
          <div className={styles.topic_text__left}>
            <p className={styles.topic_container__text}>
              Изготавливаем матрасы для всех марок и моделей грузовиков с
              применением уникальной технологии.
            </p>
            <p className={styles.topic_container__text}>
              Продукция создается точно по размерам штатных спальных мест, чтобы
              обеспечить максимальное удобство в пути для водителей DAF, VOLVO,
              MAN, MERCEDES-BENZ, SCANIA, IVECO, RENAULT, FORD, и многих других.
            </p>
          </div>
          <div className={styles.topic_text__right}>
            {companies.map((company) => (
              <Link key={company.id} to={`/catalog/${company.name}`}>
                <img
                  src={company.pic}
                  alt={`Логотип компании ${company.name}`}
                  className={styles.company__logo}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.choose__container}>
        <h2 className={styles.choose__text}>Почему выбирают именно нас?</h2>
        <div className={styles.choose__blocks}>
          <ul className={styles.choose__list}>
            <li>
              <img className={styles.fura__pic} src="/fura.png" alt="Доставка по России" loading="lazy" />
              <div>
                <p className={styles.choose__text__item}>Доставка по России</p>
                <p className={styles.choose__text__label}>
                  Не важно, в каком городе вы находитесь: вы можете заказать
                  матрас с доставкой до двери.
                </p>
              </div>
            </li>
            <li>
              <img className={styles.badge__pic} src="/badge.png" alt="Гарантия качества" loading="lazy" />
              <div>
                <p className={styles.choose__text__item}>
                  Гарантия качества
                </p>
                <p className={styles.choose__text__label}>
                  Мы контролируем каждый этап производства, чтобы вы получили
                  матрас, который прослужит долгие годы.
                </p>
              </div>
            </li>
            <li>
              <img className={styles.support__pic} src="/support.png" alt="Индивидуальный подход" loading="lazy" />
              <div>
                <p className={styles.choose__text__item}>
                  Индивидуальный подход
                </p>
                <p className={styles.choose__text__label}>
                  Создаем матрасы по вашим размерам и требованиям для
                  максимального удобства.
                </p>
              </div>
            </li>
            <li>
              <img
                className={styles.experience__pic}
                src="/experience.png"
                alt="Большой опыт"
                loading="lazy"
              />
              <div>
                <p className={styles.choose__text__item}>
                  Большой опыт
                </p>
                <p className={styles.choose__text__label}>
                  Более 10 лет работаем для того, чтобы ваши поездки были
                  комфортными.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bestsellers__container}>
        <h2 className={styles.bestsellers__title}>Хиты продаж</h2>
        <div className={styles.bestsellers__grid}>
          {bestsellers_dummy.map((product, idx) => (
            <Link
              key={product.id + '-' + idx}
              to={`/catalog/${product.company}/${product.productID}`}
              className={styles.product__card}
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
            >
              <img src={product.pic} alt={`Матрас для фуры ${product.name}`} className={styles.product__image} loading="lazy" />
              <div className={styles.product__info}>
                <h3 className={styles.product__name}>Матрас для фуры {product.name}</h3>
                <p className={styles.product__price}>{product.price}</p>
                <div className={styles.product__button_wrapper}>
                  <span className={styles.product__button}>Подробнее</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.catalog_btn__container}>
        <Link to="/catalog" className={styles.catalog__btn}>
          Перейти в каталог
        </Link>
      </div>

      <div className={styles.gallery__wrapper}>
        <h2 className={styles.gallery__title}>Галерея</h2>
        <div className={styles.gallery_container}>
          <GalleryBlock images={gallery_images} />
        </div>
      </div>

      <Map />

      <div className={styles.often_question__text}>
        Часто задаваемые вопросы
      </div>

      <div className={styles.faq_container}>
        {faqOpen.map((isOpen, idx) => (
          <div className={`${styles.faq_item} ${isOpen ? styles.open : ''}`} key={idx}>
            <div className={styles.faq_question} onClick={() => toggleFaq(idx)}>
              {faqQuestions[idx]}
              <span>{isOpen ? "-" : "+"}</span>
            </div>
            <div className={styles.faq_answer}>
              {faqAnswers[idx]}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
