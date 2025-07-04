import styles from "../styles/footer.module.css";
import { Link } from "react-router-dom";
export default function Footer() {
  const now = new Date().getFullYear();
  return (
    <footer>
      <div className={styles.info_footer__container}>
        <div className={styles.top_right__container}>
          <ul className={styles.top_right__list}>

            <li>
              <Link to="/payment">Оплата</Link>
            </li>

            <li>
              <Link to="/refund">Возврат</Link>
            </li>
            <li>
              <Link to="/wholesale">Оптовым клиентам</Link>
            </li>
            <li>
              <a href="tel:+79209219311">+7 920 921-93-11</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footer__text}>@Copyright © {now} Liron-matras. Все права защищены.</div>
    </footer>
  );
}
