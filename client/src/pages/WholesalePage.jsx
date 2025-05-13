import styles from '../styles/wholesale.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function WholesalePage() {
    return (
        <>
            <Header />
            <main className={styles.wholesale}>
                <h1 className={styles.wholesale__title}>Оптовым клиентам</h1>

                <section className={styles.wholesale__section}>
                    <p className={styles.wholesale__text}>
                        В интернет-магазине «Лирон» можно купить матрасы оптом по оптимальным ценам.
                    </p>

                    <p className={styles.wholesale__text}>
                        У нас вы можете заказать оптовую поставку матрасов всех категорий:
                    </p>
                    <ul className={styles.wholesale__list}>
                        <li className={styles.wholesale__item}>ортопедические пружинные матрасы;</li>
                        <li className={styles.wholesale__item}>беспружинные анатомические;</li>
                    </ul>

                    <p className={styles.wholesale__text}>
                        Также мы предлагаем хороший выбор защитных и ортопедических наматрасников, анатомических подушек. Оптом можно приобрести одну или несколько серий, а также все модели каталога.
                    </p>
                </section>

                <section className={styles.wholesale__section}>
                    <h2 className={styles.wholesale__subtitle}>Изготовление матрасов на заказ оптом</h2>
                    <p className={styles.wholesale__text}>
                        Компания «Лирон» располагает собственным, хорошо оборудованным производством, что позволяет нам изготавливать матрасы на заказ в любых количествах. Для заказа необходимо указать:
                    </p>
                    <ul className={styles.wholesale__list}>
                        <li className={styles.wholesale__item}>размеры будущих моделей;</li>
                        <li className={styles.wholesale__item}>наполнение (возможно комбинирование материалов для желаемой жёсткости);</li>
                        <li className={styles.wholesale__item}>обивка (материалы и цвет).</li>
                    </ul>
                    <p className={styles.wholesale__text}>
                        Мы изготавливаем оптом матрасы для разных нужд: постоянного спального места, транспорта (большегрузов, фур), водного транспорта (яхты, катера), подиумов и др.
                    </p>
                    <p className={styles.wholesale__text}>
                        Возможна модификация существующих моделей или разработка новых под индивидуальные параметры.
                    </p>
                </section>

                <section className={styles.wholesale__section}>
                    <h2 className={styles.wholesale__subtitle}>Преимущества работы с нами</h2>
                    <ul className={styles.wholesale__list}>
                        <li className={styles.wholesale__item}>Гибкие условия сотрудничества.</li>
                        <li className={styles.wholesale__item}>Удобные способы оплаты.</li>
                        <li className={styles.wholesale__item}>Мелкий опт вне зависимости от серии матрасов.</li>
                        <li className={styles.wholesale__item}>Лучшие цены на оптовую поставку матрасов в России.</li>
                        <li className={styles.wholesale__item}>Специальные условия для постоянных клиентов.</li>
                    </ul>
                    <p className={styles.wholesale__text}>
                        Чтобы заказать матрасы оптом — свяжитесь с нами, оставьте заявку и получите специальное предложение.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}
