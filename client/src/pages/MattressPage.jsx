import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/mattress.module.css";
import axios from "axios";
import config from "../config/config";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addItem, changeQuantity, removeItem } from "../store/cartSlice";

export default function MattressPage() {
  const { company, productID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.cart.basket);

  const [selectedImage, setSelectedImage] = useState(null);
  const [mattress, setMattress] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedClothe, setSelectedClothe] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0); // <-- добавили
  const [isClotheInfoVisible, setClotheInfoVisible] = useState(false);
  const [clotheInfo, setClotheInfo] = useState('');

  useEffect(() => {
    axios
      .get(`${config.API_URL}/mattress/${productID}`, {
        params: {
          tovar_type: company.toLowerCase(),
        },
      })
      .then((res) => {
        const matress = {
          ...res.data,
          company: company,
          pictures: Array.from(
            { length: res.data.pictures_count - 1 },
            (_, index) =>
              `${config.API_URL}/uploads/mattresses/${res.data.id}/${index + 2}.jpg`
          ),
        };
        setMattress(matress);
        setCurrentImage(matress.pictures[0]);
        setSelectedClothe(0);
      });
  }, [company, productID]);
  const materialOptions = mattress.material?.[selectedClothe]
    ?.split('\n')
    .filter(Boolean) || [];
  function formatNumberWithSpaces(number) {
    number = +number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const getValueByIndex = (arr) => {
    if (!arr || !Array.isArray(arr)) return '';
    return arr[selectedClothe] || arr[0] || '';
  };

  const getFormattedMaterial = (material) => {
    return (material || '').replace(/\n/g, ', ');
  };

  const handleClotheIconHover = () => {
    setClotheInfoVisible(true);
  };

  const handleClotheIconLeave = () => {
    setClotheInfoVisible(false);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const addToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      addItem({
        ...product,
        quantity: 1,
        clothe: selectedClothe,
        selected: false,
      })
    );
  };

  const decreaseQuantity = (event, mattress) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      changeQuantity({
        id: mattress.id,
        amount: -1,
        clothe: selectedClothe,
      })
    );
  };

  const increaseQuantity = (event, mattress) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      changeQuantity({
        id: mattress.id,
        amount: 1,
        clothe: selectedClothe,
      })
    );
  };

  const getMattressQuantity = (mattress) => {
    const productInBasket = basket.find(
      (item) => item.id === mattress.id && item.clothe === selectedClothe
    );
    return productInBasket ? productInBasket.quantity : 0;
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.product__main_spec}>
          <h1 className={styles.title}>Матрас для фуры {mattress.name}</h1>
          <div className={styles.productContent}>
            <div className={styles.imageGallery}>
              <div className={styles.imageWrapper}>
                <img
                  src={currentImage}
                  alt="Основное изображение"
                  className={styles.mainImage}
                  onClick={() =>
                    openImageModal(currentImage || mattress.pictures[0])
                  }
                  loading="lazy"
                />
              </div>

              <div className={styles.thumbnails}>
                {mattress.pictures?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Миниатюра ${index + 1}`}
                    className={`${styles.thumbnail} ${currentImage === img ? styles.activeThumbnail : ""}`}
                    onClick={() => setCurrentImage(img)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.details}>
              <h2 className={styles.price}>
                {formatNumberWithSpaces(getValueByIndex(mattress.price))} ₽
              </h2>
              <div className={styles.clotheSelector}>
                <div className={styles.clotheSelector__title}>Тип ткани:
                  <span className={styles.clotheInfo__hover}>
                    <span
                      className={styles.clotheSelector__icon}><AiOutlineInfoCircle /></span>
                    <div className={styles.clotheInfoMenu}>
                      <h3>Жаккард</h3>
                      <p>Прочная ткань с выразительным рисунком. Износостойкая, легко чистится, выглядит стильно.</p>
                      <h3>Велюр</h3>
                      <p>Мягкая, бархатистая ткань. Дарит комфорт, приятна на ощупь, хорошо пропускает воздух.</p>
                    </div>
                  </span>
                </div>
                <div className={styles.clothe}>
                  {mattress.clothing_types?.map((clothe, index) => (
                    <button
                      key={index}
                      className={`${styles.clotheOption} ${selectedClothe === index ? styles.activeClothe : ""}`}
                      onClick={() => setSelectedClothe(index)}
                    >
                      {clothe}
                    </button>
                  ))}
                </div>
              </div> <div className={styles.clotheSelector}>
                <div className={styles.clotheSelector__title}>Состав:</div>
                <select
                  className={styles.clotheSelect}
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                >
                  {materialOptions.map((mat, index) => (
                    <option key={index} value={index}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>

              <h3 className={styles.spec__title}>Характеристики</h3>
              <div className={styles.specifications__container}>
                <ul className={styles.specifications}>
                  <li></li>
                  <li>
                    <p>Внешний габарит: </p>
                  </li>
                  <li>
                    <p>Высота: </p>
                  </li>
                  <li>
                    <p>Жесткость: </p>
                  </li>

                </ul>
                <ul className={styles.specifications__values}>
                  <li>
                    {mattress.width} x {mattress.length}
                  </li>
                  <li>{mattress.thickness}</li>
                  <li>{getValueByIndex(mattress.rigidity)}</li>
                </ul>
              </div>
              {getMattressQuantity(mattress) === 0 ? (
                <div className={styles.basket__control}>
                  <button
                    className={styles.basket__button}
                    onClick={(event) => addToCart(mattress, event)}
                  >
                    Добавить в корзину
                  </button>
                </div>
              ) : (
                <div
                  className={styles.basket__control}
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                  }}
                >
                  <div className={styles.gotobasket__btn}>
                    <Link to="/cart">Перейти в корзину</Link>
                  </div>
                  <div className={styles.control__container}>
                    <div
                      className={styles.increase__btn}
                      onClick={(event) => decreaseQuantity(event, mattress)}
                    >
                      -
                    </div>
                    {getMattressQuantity(mattress)}
                    <div
                      className={styles.decrease__btn}
                      onClick={(event) => increaseQuantity(event, mattress)}
                    >
                      +
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.tabContent__container}>
          <div className={styles.descriptionContainer}>
            <h2 className={styles.title}>Описание</h2>
            <p className={styles.text}>{mattress.description}</p>
          </div>
          <div className={styles.deliveryContainer}>
            <h2 className={styles.title}>Доставка и оплата</h2>
            <div className={styles.textContainer}>
              <p>
                <strong>Компания LIRON находится в Москве.</strong>
              </p>
              <p>
                Наше производство матрасов находится в г. Муроме. Доставку
                готовых и заказываемых изделий осуществляем ведущими
                транспортными компаниями по всей России.
              </p>
              <p>
                <strong>Стоимость доставки:</strong>
              </p>
              <ul className={styles.deliveryList}>
                <li>
                  Стоимость доставки от производства до терминала в Москве:{" "}
                  <strong>1 500 руб.</strong>
                </li>
                <li>
                  Стоимость доставки по Москве в пределах МКАД:{" "}
                  <strong>1 500 руб.</strong>
                </li>
                <li>
                  Стоимость доставки за пределами МКАД:{" "}
                  <strong>по договоренности</strong>.
                </li>
              </ul>
              <p>
                Самовывоз возможен со склада фабрики в г. Муроме или в магазине:{" "}
                <br />
                <strong>г. Москва, 22 км Калужского шоссе</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className={styles.modal} onClick={closeImageModal}>
          <img
            src={selectedImage}
            alt="Просмотр"
            className={styles.modal__image}
          />
        </div>
      )}
      <Footer />
    </>
  );
}
