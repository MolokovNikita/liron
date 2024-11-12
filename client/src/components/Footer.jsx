import styles from "../styles/footer.module.css";
export default function Footer() {
  const now = new Date().getFullYear();
  return(
    <footer>
         <div className={styles.info_footer__container}>
        <div className={styles.top_right__container}>
          <ul className={styles.top_right__list}>
            <li>
              <a href="#">Гарантии</a>
            </li>
            <li>
              <a href="#">Оплата</a>
            </li>
            <li>
              <a href="#">Отзывы</a>
            </li>
            <li>
              <a href="#">+7 495 362-72-86</a>
            </li>
          </ul>
        </div>
      </div>
      <div>@Copyright © {now} Liron-matras. Все права защищены.</div>
    </footer>
  )
}
