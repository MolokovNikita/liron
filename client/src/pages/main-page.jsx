import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import styles from '../styles/main-content.module.css'
export default function MainPage() {
    return (
        <>
            <Header />
            <div className={styles.topic__container}>
            <h1>
            Комфорт в дороге – ваш идеальный матрас для грузовика!
            </h1>
            <div className={styles.topic_text__container}>
                <div className={styles.topic_text__left}>
                <p className={styles.topic_container__text}>
            Изготавливаем матрасы для всех марок и моделей грузовиков с применением уникальной 
            технологии. 
            </p>
            <p className={styles.topic_container__text}>
            Продукция создается точно по размерам штатных спальных мест, 
            чтобы обеспечить максимальное удобство в пути для водителей DAF, VOLVO, MAN, MERCEDES-BENZ,
             SCANIA, IVECO, RENAULT, FORD, и многих других.
            </p>
                </div>
            <div className={styles.topic_text__right}>
                <img src="/daf_big.jpg" alt="" className={styles.company__logo} />
                <img src="/volvo_big.jpg" alt="" className={styles.company__logo} />
                <img src="/man_big.jpg" alt="" className={styles.company__logo} />
                <img src="/mers_big.jpg" alt="" className={styles.company__logo} />
                <img src="/scania_big.png" alt="" className={styles.company__logo} />
                <img src="/iveco_big.jpg" alt="" className={styles.company__logo} />
                <img src="/renault_big.jpg" alt="" className={styles.company__logo} />
                <img src="/ford_big.jpg" alt="" className={styles.company__logo} />
            </div>
            </div>
            
            </div>
            
            <Footer />
        </>
    )
}