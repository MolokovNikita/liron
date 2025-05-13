import styles from '../styles/refund.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function RefundPage() {
  return (
    <>
      <Header />
      <main className={styles.refund}>
        <h1 className={styles.refund__title}>Условия возврата и гарантии</h1>

        {/* Блок: Гарантия распространяется на */}
        <section className={styles.refund__section}>
          <h2 className={styles.refund__subtitle}>
            <FaCheckCircle className={styles.refund__iconPositive} />
            Гарантия распространяется на:
          </h2>
          <ul className={styles.refund__list}>
            <li className={styles.refund__item}>
              дефекты пружинного блока и пружин;
            </li>
            <li className={styles.refund__item}>
              дефекты тканевого покрытия по вине производителя;
            </li>
            <li className={styles.refund__item}>
              впадины в матрасе, если использовалось качественное основание, соответствующее ГОСТу или сплошная жесткая поверхность.
            </li>
            <li className={styles.refund__item}>
              Впадинами считаются углубления не менее 3 см с каждой стороны. Незначительные углубления по форме тела — нормальная приработка и не являются дефектом.
            </li>
          </ul>
        </section>

        {/* Блок: Гарантия не распространяется на */}
        <section className={styles.refund__section}>
          <h2 className={styles.refund__subtitle}>
            <FaTimesCircle className={styles.refund__iconNegative} />
            Гарантия не распространяется на:
          </h2>
          <ul className={styles.refund__list}>
            <li className={styles.refund__item}>
              деформацию матраса из-за сгибания при переноске или транспортировке;
            </li>
            <li className={styles.refund__item}>
              индивидуальные предпочтения по комфорту или жесткости матраса;
            </li>
            <li className={styles.refund__item}>
              различие в высоте до 15 мм — допустимое отклонение по технологии изготовления.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
