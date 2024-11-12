import styles from "../styles/header.module.css";
export default function Header(props) {
  return (
    <header>
   
      <div className={styles.bottom__header}>
        <a href="/">
          <img className={styles.logo} src="/logo.jpeg" />
        </a>
        <div className={styles.left__container}>
          <ul className={styles.left_nav__list}>
            <li className={styles.catalor__item}>
              <a href="/catalog">Каталог</a>
            </li>
            <li className={styles.sales__item}>
              <a href="/sales">Калькулятор</a>
            </li>
            <li>
              <a href="/services">Контакты</a>
            </li>
            <li className={styles.services__item}>
              <a href="/services">О нас</a>
            </li>
          </ul>
        </div>
        <div className={styles.right__container}>
        </div>
      </div>
    </header>
  );
}
