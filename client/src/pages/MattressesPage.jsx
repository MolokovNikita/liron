import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import config from "../config/config";
import styles from "../styles/mattresses.module.css";
import axios from "axios";
import MattressCard from "../components/UI/MattressCard.jsx";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  changeQuantity,
  toggleSelectItem,
  selectAll,
  removeSelected,
  setBasket,
} from "../store/cartSlice";
import cardStyles from "../styles/mattress.card.module.css";
import { Helmet } from "react-helmet-async";

function MattressCardSkeleton() {
  return (
    <div className={cardStyles.card__skeleton}>
      <div className={cardStyles.skeleton__image}></div>
      <div className={cardStyles.skeleton__line}></div>
      <div className={cardStyles.skeleton__line}></div>
      <div className={cardStyles.skeleton__line + ' ' + cardStyles.short}></div>
      <div className={cardStyles.skeleton__line}></div>
      <div className={cardStyles.skeleton__button}></div>
    </div>
  );
}

function SidebarCompanySkeleton() {
  return <div style={{ height: 32, borderRadius: 8, background: '#e0e0e0', margin: '8px auto', width: '80%', animation: 'pulse 1.2s infinite ease-in-out' }}></div>;
}

export default function Mattresses() {
  const { company } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.cart.basket);

  const [companies, setCompanies] = useState([]);
  const [mattresses, setMattresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setMattresses([]);
    setIsLoading(true);
    const mattressRequest = axios.get(`${config.API_URL}/mattress`, {
      params: {
        tovar_type: company.toLowerCase(),
      },
    });

    const companyRequest = axios.get(`${config.API_URL}/company`);

    Promise.allSettled([mattressRequest, companyRequest])
      .then(([mattressResult, companyResult]) => {
        if (mattressResult.status === "fulfilled") {
          const matresses = mattressResult.value.data.map((item) => ({
            ...item,
            company: company,
            pictures: Array.from(
              { length: item.pictures_count },
              (_, index) =>
                `${config.API_URL}/uploads/mattresses/${item.id}/${index + 1}.jpg`
            ),
            clothing_types: item.clothing_types?.[0] || "Не указано",
            material: item.material?.[0]?.replace(/\n/g, ", ") || "Не указано",
            rigidity: item.rigidity?.[0] || "Не указана"
          }));

          setMattresses(matresses);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error("Ошибка при загрузке матрасов:", mattressResult.reason);
        }

        if (companyResult.status === "fulfilled") {
          setCompanies(
            companyResult.value.data.map((item) => ({
              ...item,
              name: item.name,
              url: `/catalog/${item.name.toLowerCase()}`,
            }))
          );
        } else {
          console.error("Ошибка при загрузке компаний:", companyResult.reason);
        }
      });
  }, [company]);

  const handleAddToCart = (mattress, e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      addItem({
        ...mattress,
        quantity: 1,
        selected: false,
        clothe: mattress.colors?.[0] || "default",
      })
    );
  };

  const handleDecrease = (e, mattress) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(changeQuantity({ id: mattress.id, amount: -1, clothe: mattress.colors?.[0] || "default" }));
  };

  const handleIncrease = (e, mattress) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(changeQuantity({ id: mattress.id, amount: 1, clothe: mattress.colors?.[0] || "default" }));
  };

  const handleSelectItem = (mattress) => {
    dispatch(toggleSelectItem({ id: mattress.id, clothe: mattress.colors?.[0] || "default" }));
  };

  const handleSelectAll = (e) => {
    dispatch(selectAll(e.target.checked));
  };

  const handleRemoveSelected = () => {
    dispatch(removeSelected());
  };

  const getmattressQuantity = (mattress) => {
    const item = basket.find(
      (item) => item.id === mattress.id && item.clothe === (mattress.colors?.[0] || "default")
    );
    return item ? item.quantity : 0;
  };

  return (
    <>
      <Helmet>
        <title>Матрасы {company} — LIRON</title>
        <meta name="description" content={`Матрасы для грузовиков ${company}. Индивидуальные размеры, доставка по России, гарантия качества.`} />
        <meta name="keywords" content={`матрасы ${company}, матрасы для фур, матрасы для грузовиков, купить матрас для фуры`} />
        <meta property="og:title" content={`Матрасы ${company} — LIRON`} />
        <meta property="og:description" content={`Матрасы для грузовиков ${company}. Индивидуальные размеры, доставка по России.`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <div className={styles.page__title}>{company.toUpperCase()}</div>
      <div className={styles.path__container}>
        <i>
          <Link to="/">Главная</Link> - <Link to="/catalog">Каталог</Link> -{" "}
          <span>{company.toUpperCase()}</span>
        </i>
      </div>

      <div
        className={
          `${styles.page__container} ` +
          `${mattresses.length === 0 && !isLoading ? styles.emptyState : ''}`
        }
      >
        {/* Кнопка мобильного меню */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
          {showMobileMenu ? "Закрыть" : "Производители"}
        </button>

        {/* Левая панель компаний (адаптивная) */}
        <div className={`${styles.sidebar} ${showMobileMenu ? styles.show : ''}`}>
          <div className={styles.sidebar__title}>Матрасы для грузовиков</div>
          {companies.length === 0 && isLoading
            ? Array.from({ length: 10 }).map((_, idx) => <SidebarCompanySkeleton key={idx} />)
            : companies.map((comp) => (
              <div
                key={comp.name}
                className={`${styles.sidebar__item} ${comp.name.toLowerCase() === company.toLowerCase()
                  ? styles.active
                  : ""}`}
                onClick={() => {
                  navigate(`/catalog/${comp.name.toLowerCase()}`);
                  setShowMobileMenu(false);
                }}
              >
                {comp.name.toUpperCase()}
              </div>
            ))}
        </div>

        {/* Контейнер матрасов */}
        <div className={styles.mattresses__container}>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => <MattressCardSkeleton key={idx} />)
          ) : mattresses.length > 0 ? (
            mattresses.map((mattress) => (
              <MattressCard
                key={mattress.id}
                mattress={mattress}
                getmattressQuantity={getmattressQuantity}
                addToCart={handleAddToCart}
                decreaseQuantity={handleDecrease}
                increaseQuantity={handleIncrease}
                handleSelectItem={handleSelectItem}
              />
            ))
          ) : (
            <p className={styles.empty_mattrasses}>
              Матрасов данной компании временно нет в наличии
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
