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

export default function Mattresses() {
  const { company } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.cart.basket);

  const [companies, setCompanies] = useState([]);
  const [mattresses, setMattresses] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setMattresses([]);

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
        } else {
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
      <Header />
      <div className={styles.page__title}>{company.toUpperCase()}</div>
      <div className={styles.path__container}>
        <i>
          <Link to="/">Главная</Link> - <Link to="/catalog">Каталог</Link> -{" "}
          <span>{company.toUpperCase()}</span>
        </i>
      </div>

      <div className={styles.page__container}>
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
          {companies.map((comp) => (
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
          {mattresses.length > 0 ? (
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
