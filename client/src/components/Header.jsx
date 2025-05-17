import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "../styles/header.module.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import config from "../config/config";

export default function Header() {
  const basket = useSelector((state) => state.cart.basket); 
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [_, setCompanyProducts] = useState([]);
  const { companyName } = useParams();

  useEffect(() => {
    axios.get(`${config.API_URL}/company`).then((res) => {
      setCompanies(
        res.data.map((item) => ({
          ...item,
          name: item.name,
          url: `/catalog/${item.name.toLowerCase()}`
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (companyName) {
      axios.get(`${config.API_URL}/products?company=${companyName}`).then((res) => {
        setCompanyProducts(res.data);
      });
    }
  }, [companyName]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        if (isBurgerOpen) setIsBurgerOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.top__header}>
        <div className={styles.top_left__container}>
          <p className={styles.city__label}><a href="#">г. Москва</a></p>
        </div>
        <div className={styles.top_right__container}>
          <ul className={styles.top_right__list}>
            <li><a href="#">Ежедневно с 9:00 до 21:00</a></li>
            <li><a href="tel:+79209219311">+7 920 921-93-11</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom__header}>
        <a href="/" className={styles.logo__href}>
          <img className={styles.logo} src="/main_logo.png" />
          <div className={styles.logo__label}><i>Матрасы для фур</i></div>
        </a>
        <div className={styles.burger__menu}>
          <button onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
            {isBurgerOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </button>
          <div className={`${styles.burger__popup} ${isBurgerOpen ? styles.open : ""}`}>
            <ul className={styles.burger__list}>
              <li className={styles.burger_basket__item}>
                <Link to="/cart">
                  <img className={styles.basket__icon} src="/basket.png" alt="" />
                  Корзина
                  <div className={styles.burger_basket__counter}>
                    {basket.length}
                  </div>
                </Link>
              </li>
              <li><Link to="/catalog">Каталог</Link></li>
              <li><Link to="/delivery">Доставка</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
              <li><Link to="/aboutus">О нас</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.left__container}>
          <ul className={styles.left_nav__list}>
            <li className={styles.catalog__item}>
              <div className={styles.catalog__hover}>
                <Link to="/catalog">Каталог</Link>
                <ul className={styles.dropdown}>
                  {companies.map((company) => (
                    <li key={company.name}>
                      <Link to={company.url}>{company.name.toUpperCase()}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className={styles.sales__item}><Link to="/delivery">Доставка</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
            <li className={styles.services__item}><Link to="/aboutus">О нас</Link></li>
          </ul>
        </div>
        <div className={styles.right__container}>
          <ul className={styles.right_nav__list}>
            <li className={styles.basket__item}>
              <Link to="/cart">
                <img className={styles.basket__icon} src="/basket.png" alt="" />
                Корзина
                <div className={styles.basket__counter}>{basket.length}</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
