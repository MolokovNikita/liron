import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/calculator.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Calculator() {
  const [selectedShape, setSelectedShape] = useState(null);
  const [fabricType, setFabricType] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const shapes = [
    {
      id: 1,
      name: "Rectangle1",
      image: "https://via.placeholder.com/150?text=Rectangle",
    },
    {
      id: 2,
      name: "Rectangle2",
      image: "https://via.placeholder.com/150?text=Rectangle",
    },
    {
      id: 3,
      name: "Rectangle3",
      image: "https://via.placeholder.com/150?text=Rectangle",
    },
    {
      id: 4,
      name: "Rectangle4",
      image: "https://via.placeholder.com/150?text=Rectangle",
    },
    {
      id: 5,
      name: "Rectangle5",
      image: "https://via.placeholder.com/150?text=Rectangle",
    },
    {
      id: 6,
      name: "Rectangle6",
      image: "https://via.placeholder.com/150?text=Rectangle",
    },
    {
      id: 7,
      name: "Rectangle7",
      image: "https://via.placeholder.com/150?text=Rectangle",
    },
    { id: 8, name: "Oval", image: "https://via.placeholder.com/150?text=Oval" },
    {
      id: 9,
      name: "Custom Shape",
      image: "https://via.placeholder.com/150?text=Custom+Shape",
    },
  ];

  const fabrics = ["Эконом", "Комфорт", "Премиум", "Люкс"];
  const heights = ["5 см", "10 см", "15 см", "20 см"];
  const colors = ["Черный", "Серый"];
  const calculatePrice = () => {
    const heightValue = parseInt(height) || 0;
    const lengthValue = parseInt(length) || 0;
    const widthValue = parseInt(width) || 0;

    const calculatedPrice = Math.round(
      5000 + lengthValue * widthValue * heightValue * 0.01,
    );
    setPrice(calculatedPrice || "Invalid data");
  };

  const handleOrder = () => {
    alert("Order placed!");
  };

  const visibleShapes = 3; // Количество видимых элементов
  const maxIndex = Math.max(0, shapes.length - visibleShapes);

  const handlePrev = () => {
    setCarouselIndex(Math.max(0, carouselIndex - 1));
  };

  const handleNext = () => {
    setCarouselIndex(Math.min(maxIndex, carouselIndex + 1));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>
          Универсальный калькулятор цен на продукцию Лирон
        </h1>
        <p className={styles.description}>
          Если Вы не нашли на нашем сайте в каталоге марку и модель грузовика,
          для которого хотели бы заказать спальное место, можете посчитать
          стоимость и заказать матрас с помощью универсального калькулятора
          матрасов для грузовиков.
        </p>
        <div className={styles.form}>
          <h2>Выберите форму матраса:</h2>
          <div className={styles.carousel}>
            <button onClick={handlePrev} className={styles.carouselButton}>
              <IoIosArrowBack />
            </button>
            <div className={styles.shapes}>
              {shapes
                .slice(carouselIndex, carouselIndex + visibleShapes)
                .map((shape) => (
                  <div
                    key={shape.id}
                    className={`${styles.shape} ${
                      selectedShape === shape.id ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedShape(shape.id)}
                  >
                    <img
                      src={shape.image}
                      alt={shape.name}
                      className={styles.shapeImage}
                    />
                    <p>{shape.name}</p>
                  </div>
                ))}
            </div>
            <button onClick={handleNext} className={styles.carouselButton}>
              <IoIosArrowForward />
            </button>
          </div>

          <h2>Выберите тип ткани:</h2>
          <select
            value={fabricType}
            onChange={(e) => setFabricType(e.target.value)}
            className={styles.select}
          >
            <option value="" disabled>
              Выберите тип ткани
            </option>
            {fabrics.map((fabric, index) => (
              <option key={index} value={fabric}>
                {fabric}
              </option>
            ))}
          </select>

          <h2>Выберите высоту:</h2>
          <select
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={styles.select}
          >
            <option value="" disabled>
              Выберите высоту
            </option>
            {heights.map((h, index) => (
              <option key={index} value={parseInt(h)}>
                {h}
              </option>
            ))}
          </select>
          <h2>Выберите цвет:</h2>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.select}
          >
            <option value="" disabled>
              Выберите цвет:
            </option>
            {colors.map((h, index) => (
              <option key={index} value={parseInt(h)}>
                {h}
              </option>
            ))}
          </select>

          <h2>Введите размеры матраса:</h2>
          <div className={styles.dimensions}>
            <label>
              Длина (см):
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Ширина (см):
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className={styles.input}
              />
            </label>
          </div>

          <button onClick={calculatePrice} className={styles.calculateButton}>
            Рассчитать стоимость
          </button>
          <div className={styles.price}>
            Стоимость: <span>{price !== null ? `${price} ₽` : "—"}</span>
          </div>
          <button onClick={handleOrder} className={styles.orderButton}>
            Заказать
          </button>
        </div>
        <div className={styles.infoBlock}>
          <h2 className={styles.infoTitle}>
            Как правильно рассчитать стоимость матраса?
          </h2>
          <p>
            Возьмите рулетку, лист бумаги и карандаш. Сделайте схему своего
            матраса. Нарисуйте ее от руки, как умеете, сфотографируйте схему на
            ваш мобильный телефон или отсканируйте. Схема, при оформлении заказа
            потребуется в виде файла. После оформления вами заказа мы в любом
            случае с вами свяжемся и уточним все важные нюансы.
          </p>
          <p>
            Выберите из предложенных в слайдере вариантов геометрии матраса
            наиболее подходящий к вашему случаю. Если ваш матрас отличается от
            всех предложенных, выберите наиболее близкий. Мы будем
            ориентироваться на вашу схему, которую вы приложите на стадии
            оформления заказа.
          </p>
          <p>
            Укажите внешние габариты - длину и ширину изделия. Указывайте
            внешние габариты не обращая внимания на геометрию. Укажите желаемую
            толщину матраса.
          </p>
          <p>Выберите желаемую ткань чехла. Как разобраться в тканях:</p>
          <ul>
            <li>
              <strong>Эконом</strong> - это самый бюджетный вариант. В Экономе
              применяется автожаккард с клеевым триплированием, эта ткань боится
              влаги, ее можно только чистить.
            </li>
            <li>
              <strong>Комфорт</strong> - это оптимальный вариант ткани чехла. В
              Комфорте мы используем автожаккарды с огневым триплированием.
              Такая ткань имеет повышенную устойчивость к УФ-лучам, не боится
              влаги и отлично эксплуатируется.
            </li>
            <li>
              <strong>Премиум</strong> - это качественный автожаккард с огневым
              триплированием, высокой износостойкости, стирается в машинке и
              чистится в химчистке, устойчив к УФ-лучам. Это лучший вариант из
              всех предложенных.
            </li>
            <li>
              <strong>Люкс</strong> - это матрас премиального уровня,
              выполненный из материалов высочайшего качества. Обеспечивает
              максимальный комфорт и долговечность благодаря использованию
              улучшенных мебельных пенополиуретанов, армированных войлоком, и
              износостойкой ткани чехла. Чехол легко снимается и выдерживает
              стирку в машинке, а сам матрас идеально подходит для долгих
              поездок и интенсивной эксплуатации.
            </li>
          </ul>
          <p>
            Указав все необходимые параметры и методом подбора высоты матраса и
            желаемой ткани чехла, рассчитайте на калькуляторе ориентир по
            стоимости изготовления матраса.
          </p>
          <p>
            Далее, перейдите к оформлению заказа: приложите вашу схему в виде
            файла, укажите марку и модель грузовика, сообщите ваши ФИО и
            контактный телефон, по которому с вами можно связаться. Оформите
            заказ.
          </p>
          <p>
            После получения вашей заявки мы изучим ее и свяжемся для уточнения
            параметров заказа.
          </p>
          <p>
            Все матрасы мы производим по единой технологии. Блок матраса
            беспружинный, выполнен из мебельного пенополиуретана (в
            простонародье - пена). ППУ армирован слоями войлока, что позволяет
            сохранять блок и долгое время эксплуатировать матрас.
          </p>
          <p>
            Чехол матраса съемный с П-образной молнией по нижней части матраса.
            Нижняя часть выполнена из спанбонда - специального прочного
            материала. Матрасы отличаются исключительно качеством ткани.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
