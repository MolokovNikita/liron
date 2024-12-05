import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/mattress.module.css";

export default function MattressPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const product = {
    id: 1,
    name: "Матрас для фуры DAF XF 105",
    price: "12 230 ₽",
    colors: ["Белый", "Черный", "Серый"],
    specifications: {
      width: "420 см",
      length: "190 см",
      thickness: "12 см",
      rigidity: "Жесткий",
      material: "Пенополиуретан",
    },
    description: `Матрас класса КОМФОРТ в кабину FOTON AUMAN.
      ХИТ ПРОДАЖ данноготипоразмера – для тех, кто выбирает лучшее. 
      Матрасы класса КОМФОРТ – оптимальный «золотой» стандарт настоящихзаводских 
      беспружинных ортопедических матрасов для грузовиков FOTONAUMAN годов выпуска 2021-нв. 
      Беспружинные ортопедические матрасыкласса КОМФОРТ для FOTON AUMAN, производятся из 
      высококачественных материалов по ГОСТу строго по размерам кабины.`,
    reviews: [
      { user: "Андрей", text: "Отличный матрас! Очень комфортный." },
      { user: "Сергей", text: "Хорошее качество за такие деньги." },
    ],
    pictures: [
      "https://via.placeholder.com/600x400?text=Главное+фото",
      "https://via.placeholder.com/600x400?text=Фото+1",
      "https://via.placeholder.com/600x400?text=Фото+2",
    ],
  };
  const [currentImage, setCurrentImage] = useState(product.pictures[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.product__main_spec}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.productContent}>
            <div className={styles.imageGallery}>
              <img
                src={currentImage}
                alt="Основное изображение"
                className={styles.mainImage}
                onClick={() =>
                  openImageModal(currentImage || mattress.pictures[0])
                }
              />
              <div className={styles.thumbnails}>
                {product.pictures.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Миниатюра ${index + 1}`}
                    className={`${styles.thumbnail} ${
                      currentImage === img ? styles.activeThumbnail : ""
                    }`}
                    onClick={() => setCurrentImage(img)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.details}>
              <h2 className={styles.price}>{product.price}</h2>
              <div className={styles.colorSelector}>
                <p>Цвет:</p>
                <div className={styles.colors}>
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`${styles.colorOption} ${
                        selectedColor === color ? styles.activeColor : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <h3 className={styles.spec__title}>Характеристики</h3>
              <div className={styles.specifications__container}>
                <ul className={styles.specifications}>
                  <li></li>
                  <li>
                    <p>Размер: </p>
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
                    {product.specifications.width} x{" "}
                    {product.specifications.length}
                  </li>
                  <li>{product.specifications.thickness}</li>
                  <li>{product.specifications.rigidity}</li>
                  <li>{product.specifications.material}</li>
                </ul>
              </div>
              <div></div>
              <button className={styles.addToCartButton}>
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
        <div className={styles.tabContent__container}>
          <div className={styles.descriptionContainer}>
            <h2 className={styles.title}>Описание</h2>
            <p className={styles.text}>{product.description}</p>
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
