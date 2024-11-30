import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/warranty.module.css";

export default function Warranty() {
  return (
    <>
      <Header />
      <div className={styles.warranty}>
        <h1 className={styles.warranty__title}>Гарантии</h1>
        <div className={styles.warranty__content}>
          <section className={styles.warranty__section}>
            <p className={styles.warranty__text}>
              Срок службы матраса — период, в течение которого изготовитель
              обязуется обеспечивать возможность использования товара по
              назначению. Срок службы зависит от состава модели и составляет от
              5 до 10 лет.
            </p>
          </section>
          <section className={styles.warranty__section}>
            <h2 className={styles.warranty__subtitle}>Гарантия качества</h2>
            <p className={styles.warranty__text}>
              Гарантия — это ручательство за соответствие товара требованиям
              качества и договору при соблюдении правил эксплуатации. Сроки
              гарантии на продукцию:
            </p>
            <ul className={styles.warranty__list}>
              <li className={styles.warranty__item}>
                Серия «Стандарт» — 1 год.
              </li>
              <li className={styles.warranty__item}>Серия «Релакс» — 1 год.</li>
              <li className={styles.warranty__item}>
                Серия «Комфорт» — 2 года.
              </li>
              <li className={styles.warranty__item}>
                Серия «Премиум» — 2 года с даты, указанной в накладной.
              </li>
            </ul>
          </section>
          <section className={styles.warranty__section}>
            <h2 className={styles.warranty__subtitle}>
              Гарантия распространяется на:
            </h2>
            <ul className={styles.warranty__list}>
              <li className={styles.warranty__item}>
                Дефекты пружинного блока и пружин.
              </li>
              <li className={styles.warranty__item}>
                Дефекты тканевого покрытия по вине производителя.
              </li>
              <li className={styles.warranty__item}>
                Впадины в матрасе (глубиной более 3 см), если под матрасом
                использовалось качественное основание.
              </li>
            </ul>
          </section>
          <section className={styles.warranty__section}>
            <h2 className={styles.warranty__subtitle}>
              Гарантия не распространяется на:
            </h2>
            <ul className={styles.warranty__list}>
              <li className={styles.warranty__item}>
                Деформацию из-за неправильной транспортировки.
              </li>
              <li className={styles.warranty__item}>
                Предпочтения по жесткости или высоте матраса.
              </li>
              <li className={styles.warranty__item}>
                Несоблюдение правил эксплуатации, механические повреждения или
                загрязнения.
              </li>
            </ul>
          </section>
          <section className={styles.warranty__section}>
            <h2 className={styles.warranty__subtitle}>
              Условия признания гарантийного случая:
            </h2>
            <p className={styles.warranty__text}>
              В случае обнаружения недостатков обратитесь к представителю,
              оформившему заказ. Рекламация рассматривается в течение 10 рабочих
              дней. При необходимости проводится экспертиза. Если случай признан
              гарантийным, недостатки устраняются в течение 5 рабочих дней. Иные
              случаи требуют согласования оплаты экспертизы и транспортных
              расходов.
            </p>
          </section>
          <section className={styles.warranty__section}>
            <h2 className={styles.warranty__subtitle}>Выдержки из закона:</h2>
            <ul className={styles.warranty__list}>
              <li className={styles.warranty__item}>
                <strong>Статья 25.1:</strong> Товар надлежащего качества может
                быть обменен, если он не был в употреблении.
              </li>
              <li className={styles.warranty__item}>
                <strong>Статья 26.4:</strong> Товары с индивидуальными
                свойствами не подлежат возврату.
              </li>
            </ul>
          </section>
          <p className={styles.warranty__footer}>Желаем удачных покупок!</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
