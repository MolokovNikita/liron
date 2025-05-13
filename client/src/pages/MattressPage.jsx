import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/mattress.module.css";
import axios from "axios";
import config from "../config/config";
import { useContext } from "react";
import { CardContext } from "../context/cartContext";
import { Link } from "react-router-dom";

export default function MattressPage() {
  const { basket, setBasket } = useContext(CardContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mattress, setMattress] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedColorBlur, setSelectedColorBlur] = useState("");

  const { company, productID } = useParams();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/mattress/${productID}`, {
        params: {
          tovar_type: company.toLowerCase(),
        },
      })
      .then((res) => {
        console.log(res.data);
        const matress = {
          ...res.data,
          company: company,
          pictures: Array.from(
            { length: res.data.pictures_count },
            (_, index) =>
              `${config.API_URL}/uploads/mattresses/${res.data.id}/${index + 1}.jpg`,
          ),
        };
        setMattress(matress);
        setCurrentImage(matress.pictures[0]);
        setSelectedColor(matress.colors[0]);
      });
  }, []);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const addToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex(
        (item) => item.id === product.id && item.color === selectedColor,
      );
      if (existingProductIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingProductIndex].quantity += 1;
        return updatedBasket;
      } else {
        return [
          ...prevBasket,
          { ...product, quantity: 1, color: selectedColor, selected: false },
        ];
      }
    });
  };
  const decreaseQuantity = (event, mattress) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex(
        (item) => item.id === mattress.id && item.color === selectedColor,
      );
      if (existingProductIndex !== -1) {
        const updatedBasket = [...prevBasket];
        const newQuantity = updatedBasket[existingProductIndex].quantity - 1;
        if (newQuantity > 0) {
          updatedBasket[existingProductIndex].quantity = newQuantity;
        } else {
          updatedBasket.splice(existingProductIndex, 1);
        }
        return updatedBasket;
      }
      return prevBasket;
    });
  };
  const increaseQuantity = (event, mattress) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex(
        (item) => item.id === mattress.id && item.color === selectedColor,
      );
      if (existingProductIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingProductIndex].quantity += 1;
        return updatedBasket;
      } else {
        return [
          ...prevBasket,
          { ...mattress, quantity: 1, color: selectedColor },
        ];
      }
    });
  };
  const getMattressQuantity = (mattress) => {
    const productInBasket = basket.find(
      (item) => item.id === mattress.id && item.color === selectedColor,
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
                    className={`${styles.thumbnail} ${currentImage === img ? styles.activeThumbnail : ""
                      }`}
                    onClick={() => setCurrentImage(img)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.details}>
              <h2 className={styles.price}>{mattress.price}</h2>
              <div className={styles.colorSelector}>
                <p>Цвет:</p>
                <div className={styles.colors}>
                  {mattress.colors?.map((color, index) => (
                    <button
                      key={index}
                      className={`${styles.colorOption} ${selectedColor === color ? styles.activeColor : ""
                        }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.color_select__container}></div>
              <h3 className={styles.spec__title}>Характеристики</h3>
              <div className={styles.specifications__container}>
                <ul className={styles.specifications}>
                  <li></li>
                  <li>
                    <p>Внешний габарит: </p>
                  </li>
                  <li>
                    <p>Толщина: </p>
                  </li>
                  <li>
                    <p>Жесткость: </p>
                  </li>
                  <li>
                    <p>Материал: </p>
                  </li>
                </ul>
                <ul className={styles.specifications__values}>
                  <li>
                    {mattress.width} x {mattress.length}
                  </li>
                  <li>{mattress.thickness}</li>
                  <li>{mattress.rigidity}</li>
                  <li>{mattress.material}</li>
                </ul>
              </div>
              {getMattressQuantity(mattress) == 0 ? (
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
