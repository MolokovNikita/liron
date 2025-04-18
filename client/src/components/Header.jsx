import styles from "../styles/header.module.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CardContext } from "../context/cartContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const { basket } = useContext(CardContext);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Скроллим вниз - скрываем хедер
        if (isBurgerOpen) setIsBurgerOpen(false);
      } else {
        setIsVisible(true); // Скроллим вверх - показываем хедер
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.top__header}>
        <div className={styles.top_left__container}>
          <p className={styles.city__label}>
            <a href="#">г. Москва</a>{" "}
          </p>
        </div>
        <div className={styles.top_right__container}>
          <ul className={styles.top_right__list}>
            <li>
              <a href="#">Ежедневно с 9:00 до 21:00</a>
            </li>
            <li>
              <a href="tel:+79209219311">+7 920 921-93-11</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom__header}>
        <a href="/" className={styles.logo__href}>
          <img className={styles.logo} src="/main_logo.png" />
          <div className={styles.logo__label}>
            <i>Матрасы для фур</i>
          </div>
        </a>
        <div className={styles.burger__menu}>
          <button onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
            {isBurgerOpen ? (
              <CloseIcon fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </button>
          <div
            className={`${styles.burger__popup} ${isBurgerOpen ? styles.open : ""}`}
          >
            <ul className={styles.burger__list}>
              <li className={styles.burger_basket__item}>
                <Link to="/cart">
                  <img
                    className={styles.basket__icon}
                    src="/basket.png"
                    alt=""
                  />
                  Корзина
                  <div className={styles.burger_basket__counter}>
                    {basket.reduce((acc) => acc + 1, 0)}
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/catalog">Каталог</Link>
              </li>
              <li>
                <Link to="/calculator">Калькулятор</Link>
              </li>
              <li>
                <Link to="/contacts">Контакты</Link>
              </li>
              <li>
                <Link to="/aboutus">О нас</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.left__container}>
          <ul className={styles.left_nav__list}>
            <li className={styles.catalor__item}>
              <Link to="/catalog">Каталог</Link>
            </li>
            <li className={styles.sales__item}>
              <Link to="/calculator">Калькулятор</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
            <li className={styles.services__item}>
              <Link to="/aboutus">О нас</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right__container}>
          <ul className={styles.right_nav__list}>
            <li className={styles.basket__item}>
              <Link to="/cart">
                <img className={styles.basket__icon} src="/basket.png" alt="" />
                Корзина
                <div className={styles.basket__counter}>
                  {basket.reduce((acc) => acc + 1, 0)}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
