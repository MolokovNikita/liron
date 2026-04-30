import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import styles from "../styles/main-content.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Map from "../components/UI/Map.jsx";
import config from "../config/config.js";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import GalleryBlock from "../components/UI/Gallery/GalleryBlock.jsx";
import { Helmet } from "react-helmet-async";
import StructuredData from "../components/StructuredData";

const DEFAULT_BESTSELLERS = [
  { id: 1, name: "DAF XF 105", price: "14 500 ₽", picPath: "/uploads/mattresses/11/1.jpg", company: "DAF", productID: 11 },
  { id: 2, name: "Mercedes-Benz Actros MP1", price: "14 500 ₽", picPath: "/uploads/mattresses/14/1.jpg", company: "Mercedes-Benz", productID: 14 },
  { id: 3, name: "Scania R", price: "14 500 ₽", picPath: "/uploads/mattresses/5/1.jpg", company: "Scania", productID: 5 },
];

export default function MainPage() {
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false, false]);
  const [companies, setCompanies] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [bestsellers, setBestsellers] = useState(DEFAULT_BESTSELLERS);

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
    // Компании
    axios
      .get(`${config.API_URL}/company`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const companiesWithPic = data.slice(0, 13).map((item) => ({
          ...item,
          pic: item.logo
            ? `${config.API_URL}${item.logo}`
            : `${config.API_URL}/uploads/companylogo/${item.name.toLowerCase()}.jpg`,
        }));
        setCompanies(companiesWithPic);
      })
      .catch((err) => console.error("Ошибка при получении компаний:", err));

    // Галерея из API
    axios
      .get(`${config.API_URL}/gallery`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setGalleryImages(
            res.data.map((path) => ({
              original: `${config.API_URL}${path}`,
              thumbnail: `${config.API_URL}${path}`,
            }))
          );
        } else {
          // Fallback к нумерованным файлам
          setGalleryImages(
            Array.from({ length: 44 }, (_, i) => {
              const filename = `${i + 1}.jpg`;
              return {
                original: `${config.API_URL}/uploads/gallery_images/${filename}`,
                thumbnail: `${config.API_URL}/uploads/gallery_images/${filename}`,
              };
            })
          );
        }
      })
      .catch(() => {
        // Fallback при ошибке
        setGalleryImages(
          Array.from({ length: 44 }, (_, i) => ({
            original: `${config.API_URL}/uploads/gallery_images/${i + 1}.jpg`,
            thumbnail: `${config.API_URL}/uploads/gallery_images/${i + 1}.jpg`,
          }))
        );
      });

    // Хиты продаж из настроек
    axios
      .get(`${config.API_URL}/site-settings`)
      .then((res) => {
        if (res.data?.bestsellers && res.data.bestsellers.length > 0) {
          setBestsellers(res.data.bestsellers);
        }
      })
      .catch(() => {});
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen((prev) => prev.map((v, i) => (i === index ? !v : v)));
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
        <div className={styles.hero__content}>
          <div className={styles.hero__label_row}>
            <div className={styles.hero__label_bar}></div>
            <span className={styles.hero__label_text}>Профессиональное решение</span>
          </div>
          <h1 className={styles.hero__h1}>
            Матрасы<br /><span className={styles.hero__gold}>для фур</span>
          </h1>
          <p className={styles.hero__desc}>
            Изготавливаем точно по размерам спального места.<br />
            DAF, Volvo, Scania, MAN, Mercedes и другие марки.
          </p>
          <div className={styles.hero__buttons}>
            <Link to="/catalog" className={styles.hero__btn_primary}>В каталог →</Link>
            <a href="tel:+79209219311" className={styles.hero__btn_ghost}>Позвонить</a>
          </div>
        </div>
        <div className={styles.hero__stats}>
          {[['10+', 'лет на рынке'], ['500+', 'довольных водителей'], ['20+', 'марок грузовиков']].map(([n, l]) => (
            <div key={n} className={styles.hero__stat}>
              <div className={styles.hero__stat_num}>{n}</div>
              <div className={styles.hero__stat_label}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.topic__container}>
        <div className={styles.brands__strip}>
          {companies.map((company) => (
            <Link
              key={company.id}
              to={`/catalog/${company.name}`}
              className={styles.brand__btn}
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
            >
              {company.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.choose__container}>
        <div className={styles.section__label}>
          <span className={styles.section__bar}></span>
          <span className={styles.section__tag}>Почему выбирают нас</span>
        </div>
        <h2 className={styles.choose__text}>Наши преимущества</h2>
        <div className={styles.choose__blocks}>
          <ul className={styles.choose__list}>
            <li>
              <span className={styles.feature__icon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"/><path d="M16 8h5l3 5v4h-8V8z"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </span>
              <div>
                <p className={styles.choose__text__item}>Доставка по России</p>
                <p className={styles.choose__text__label}>
                  Не важно, в каком городе вы находитесь: вы можете заказать
                  матрас с доставкой до двери.
                </p>
              </div>
            </li>
            <li>
              <span className={styles.feature__icon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </span>
              <div>
                <p className={styles.choose__text__item}>Гарантия качества</p>
                <p className={styles.choose__text__label}>
                  Мы контролируем каждый этап производства, чтобы вы получили
                  матрас, который прослужит долгие годы.
                </p>
              </div>
            </li>
            <li>
              <span className={styles.feature__icon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </span>
              <div>
                <p className={styles.choose__text__item}>Индивидуальный подход</p>
                <p className={styles.choose__text__label}>
                  Создаем матрасы по вашим размерам и требованиям для
                  максимального удобства.
                </p>
              </div>
            </li>
            <li>
              <span className={styles.feature__icon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </span>
              <div>
                <p className={styles.choose__text__item}>10+ лет опыта</p>
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
        <div className={styles.bestsellers__header}>
          <div>
            <div className={styles.section__label}>
              <span className={styles.section__bar}></span>
              <span className={styles.section__tag}>Топ позиции</span>
            </div>
            <h2 className={styles.bestsellers__title}>Хиты продаж</h2>
          </div>
          <Link to="/catalog" className={styles.bestsellers__all_btn}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}>
            Весь каталог →
          </Link>
        </div>
        <div className={styles.bestsellers__grid}>
          {bestsellers.map((product, idx) => (
            <Link
              key={`${product.productID}-${idx}`}
              to={`/catalog/${product.company}/${product.productID}`}
              className={styles.product__card}
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
            >
              <div className={styles.product__image_wrap}>
                <img
                  src={`${config.API_URL}${product.picPath}`}
                  alt={`Матрас для фуры ${product.name}`}
                  className={styles.product__image}
                  loading="lazy"
                />
                {idx === 0 && <span className={styles.product__badge_hit}>ХИТ</span>}
                {product.company && <span className={styles.product__badge_company}>{product.company}</span>}
              </div>
              <div className={styles.product__info}>
                <h3 className={styles.product__name}>{product.name}</h3>
                <p className={styles.product__subtitle}>Матрас для спального места</p>
                <div className={styles.product__footer}>
                  <p className={styles.product__price}>{product.price}</p>
                  <span className={styles.product__button}>Подробнее →</span>
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
        <div className={styles.section__label}>
          <span className={styles.section__bar}></span>
          <span className={styles.section__tag}>Наши работы</span>
        </div>
        <h2 className={styles.gallery__title}>Галерея</h2>
        <div className={styles.gallery_container}>
          {galleryImages.length > 0 && <GalleryBlock images={galleryImages} />}
        </div>
      </div>

      <Map />

      <div className={styles.faq__label_wrapper}>
        <div className={styles.section__label}>
          <span className={styles.section__bar}></span>
          <span className={styles.section__tag}>FAQ</span>
        </div>
        <div className={styles.often_question__text}>Часто задаваемые вопросы</div>
      </div>

      <div className={styles.faq_container}>
        {faqOpen.map((isOpen, idx) => (
          <div className={`${styles.faq_item} ${isOpen ? styles.open : ""}`} key={idx}>
            <div className={styles.faq_question} onClick={() => toggleFaq(idx)}>
              {faqQuestions[idx]}
              <span>{isOpen ? "−" : "+"}</span>
            </div>
            <div className={styles.faq_answer}>{faqAnswers[idx]}</div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
