import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import styles from "../styles/main-content.module.css";
import { useState } from "react";
export default function MainPage() {
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false]);

  const toggleFaq = (index) => {
    const newFaqOpen = [...faqOpen];
    newFaqOpen[index] = !newFaqOpen[index];
    setFaqOpen(newFaqOpen);
  };
  return (
    <>
      <Header />
      <div className={styles.topic__container}>
        <h1>Комфорт в дороге – ваш идеальный матрас для грузовика!</h1>
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
            <img src="/daf_big.jpg" alt="" className={styles.company__logo} />
            <img src="/volvo_big.jpg" alt="" className={styles.company__logo} />
            <img src="/man_big.jpg" alt="" className={styles.company__logo} />
            <img src="/mers_big.jpg" alt="" className={styles.company__logo} />
            <img
              src="/scania_big.png"
              alt=""
              className={styles.company__logo}
            />
            <img src="/iveco_big.jpg" alt="" className={styles.company__logo} />
            <img
              src="/renault_big.jpg"
              alt=""
              className={styles.company__logo}
            />
            <img src="/ford_big.jpg" alt="" className={styles.company__logo} />
          </div>
        </div>
      </div>
      <div className={styles.choose__container}>
        <div className={styles.choose__text}>Почему выбирают именно нас ?</div>
        <div className={styles.choose__blocks}>
          <ul className={styles.choose__list}>
            <li>
              <img className={styles.fura__pic} src="/fura.png" alt="" />
              <div>
                <p className={styles.choose__text__item}>Доставка по России</p>
                <p className={styles.choose__text__label}>
                  Не важно, в каком городе вы находитесь: вы можете заказать
                  матрас с доставкой до двери.
                </p>
              </div>
            </li>
            <li>
              <img className={styles.badge__pic} src="/badge.png" alt="" />
              <div>
                <p className={styles.choose__text__item}>
                  Гарантия <br />
                  качества
                </p>
                <p className={styles.choose__text__label}>
                  Мы контролируем каждый этап производства, чтобы вы получили
                  матрас, который прослужит долгие годы.
                </p>
              </div>
            </li>
            <li>
              <img className={styles.support__pic} src="/support.png" alt="" />
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
                alt=""
              />
              <div>
                <p className={styles.choose__text__item}>
                  Большой <br />
                  опыт
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
      <div className={styles.catalog_btn__container}>
        <button className={styles.catalog__btn}>Перейти в каталог</button>
      </div>
      <div className={styles.often_question__text}>
        Часто задаваемые вопросы
      </div>

      <div className={styles.faq_container}>
        <div className={styles.faq_item}>
          <div className={styles.faq_question} onClick={() => toggleFaq(0)}>
            Как выбрать подходящий матрас для моего грузовика?
            <span>{faqOpen[0] ? "-" : "+"}</span>
          </div>
          {faqOpen[0] && (
            <div className={styles.faq_answer}>
              Мы предлагаем подробные инструкции по выбору, чтобы учесть модель,
              размеры и ваши пожелания.
            </div>
          )}
        </div>
        <div className={styles.faq_item}>
          <div className={styles.faq_question} onClick={() => toggleFaq(1)}>
            Как узнать размеры штатного матраса моего грузовика?
            <span>{faqOpen[1] ? "-" : "+"}</span>
          </div>
          {faqOpen[1] && (
            <div className={styles.faq_answer}>
              Укажите марку и модель вашего грузовика, и мы подскажем подходящие
              размеры.{" "}
            </div>
          )}
        </div>
        <div className={styles.faq_item}>
          <div className={styles.faq_question} onClick={() => toggleFaq(2)}>
            Из каких материалов изготовлены ваши матрасы?{" "}
            <span>{faqOpen[2] ? "-" : "+"}</span>
          </div>
          {faqOpen[2] && (
            <div className={styles.faq_answer}>
              Мы используем гипоаллергенные материалы, которые обеспечивают
              комфорт и долговечность.
            </div>
          )}
        </div>
        <div className={styles.faq_item}>
          <div className={styles.faq_question} onClick={() => toggleFaq(3)}>
            Как ухаживать за матрасом, чтобы он служил дольше?{" "}
            <span>{faqOpen[3] ? "-" : "+"}</span>
          </div>
          {faqOpen[3] && (
            <div className={styles.faq_answer}>
              Рекомендуем использовать защитный чехол и регулярно чистить
              изделие.
            </div>
          )}
        </div>
        <div className={styles.faq_item}>
          <div className={styles.faq_question} onClick={() => toggleFaq(4)}>
            Могу ли я заказать матрас нестандартного размера?{" "}
            <span>{faqOpen[4] ? "-" : "+"}</span>
          </div>
          {faqOpen[4] && (
            <div className={styles.faq_answer}>
              Да, мы изготавливаем матрасы по индивидуальным параметрам.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
