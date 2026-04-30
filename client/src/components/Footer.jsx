import styles from "../styles/footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const now = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__grid}>

        {/* Brand */}
        <div className={styles.footer__brand}>
          <div className={styles.footer__logo}>
            <img src="/main_logo.png" alt="LIRON" className={styles.footer__logo_img} />
          </div>
          <p className={styles.footer__tagline}>
            Матрасы для всех марок и моделей грузовиков. Доставка по всей России.
          </p>
        </div>

        {/* Navigation */}
        <div className={styles.footer__col}>
          <div className={styles.footer__col_title}>Навигация</div>
          <ul className={styles.footer__links}>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/delivery">Доставка</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
            <li><Link to="/aboutus">О нас</Link></li>
            <li><Link to="/reviews">Отзывы</Link></li>
          </ul>
        </div>

        {/* Conditions */}
        <div className={styles.footer__col}>
          <div className={styles.footer__col_title}>Условия</div>
          <ul className={styles.footer__links}>
            <li><Link to="/payment">Оплата</Link></li>
            <li><Link to="/refund">Возврат</Link></li>
            <li><Link to="/wholesale">Оптовым клиентам</Link></li>
          </ul>
        </div>

        {/* Contacts */}
        <div className={styles.footer__col}>
          <div className={styles.footer__col_title}>Контакты</div>
          <a href="tel:+79209219311" className={styles.footer__phone}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +7 920 921-93-11
          </a>
          <p className={styles.footer__contact_info}>Ежедневно с 9:00 до 21:00</p>
          <p className={styles.footer__contact_info}>г. Москва</p>
        </div>

      </div>

      <div className={styles.footer__bottom}>
        © {now} Liron-matras. Все права защищены.
      </div>
    </footer>
  );
}
