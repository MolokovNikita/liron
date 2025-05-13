import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState, useContext } from "react";
import config from "../config/config";
import styles from "../styles/mattresses.module.css";
import axios from "axios";
import { CardContext } from "../context/cartContext";
import MattressCard from "../components/UI/MattressCard.jsx";


export default function Mattresses() {
  const { company } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const { basket, setBasket } = useContext(CardContext);
  const [mattresses, setMattresses] = useState([]);

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


  const addToCart = (mattress, e) => {
    e.stopPropagation();
    e.preventDefault();
    setBasket((prevBasket) => {
      const existingIndex = prevBasket.findIndex(
        (item) => item.id === mattress.id && item.color === mattress.colors[0]
      );
      if (existingIndex !== -1) {
        const updated = [...prevBasket];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prevBasket,
        { ...mattress, quantity: 1, selected: false, color: mattress.colors[0] },
      ];
    });
  };

  const decreaseQuantity = (e, mattress) => {
    e.stopPropagation();
    e.preventDefault();
    setBasket((prevBasket) => {
      const index = prevBasket.findIndex((item) => item.id === mattress.id);
      if (index !== -1) {
        const updated = [...prevBasket];
        const newQty = updated[index].quantity - 1;
        if (newQty > 0) {
          updated[index].quantity = newQty;
        } else {
          updated.splice(index, 1);
        }
        return updated;
      }
      return prevBasket;
    });
  };

  const increaseQuantity = (e, mattress) => {
    e.stopPropagation();
    e.preventDefault();
    setBasket((prevBasket) => {
      const index = prevBasket.findIndex((item) => item.id === mattress.id);
      if (index !== -1) {
        const updated = [...prevBasket];
        updated[index].quantity += 1;
        return updated;
      }
      return [...prevBasket, { ...mattress, quantity: 1 }];
    });
  };

  const getmattressQuantity = (mattress) => {
    const item = basket.find((item) => item.id === mattress.id);
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
        {/* Левая панель компаний */}
        <div className={styles.sidebar}>
          <div className={styles.sidebar__title}>Матрасы для грузовиков
          </div>
          {companies.map((comp) => (
            <div
              key={comp.name}
              className={`${styles.sidebar__item} ${comp.name.toLowerCase() === company.toLowerCase() ? styles.active : ""
                }`}
              onClick={() => navigate(`/catalog/${comp.name.toLowerCase()}`)}
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
                addToCart={addToCart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
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
