import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/mattress.module.css";
import axios from "axios";
import config from "../config/config";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addItem, changeQuantity } from "../store/cartSlice";
import GalleryBlock from "../components/UI/Gallery/GalleryBlock";
import { Helmet } from "react-helmet-async";
import StructuredData from "../components/StructuredData";
import { useState as useLocalState } from "react";

export default function MattressPage() {
  const { company, productID } = useParams();
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.cart.basket);

  const [mattress, setMattress] = useState({});
  const [selectedClothe, setSelectedClothe] = useState(0);
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const [coverCount, setCoverCount] = useLocalState(0);

  const mattressClasses = ["Комфорт", "Премиум"];
  const [classMaterials, setClassMaterials] = useState([]);

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
            (_, index) => {
              return {
                original: `${config.API_URL}/uploads/mattresses/${res.data.id}/${index + 2}.jpg`,
                thumbnail: `${config.API_URL}/uploads/mattresses/${res.data.id}/${index + 2}.jpg`
              }
            }
          ),
        };
        if (Array.isArray(matress.price) && matress.price.length === 2) {
          setSelectedClassIndex(0);
        }
        const premuimSeries = {
          original: `${config.API_URL}/uploads/mattresses/premium_series.jpg`,
          thumbnail: `${config.API_URL}/uploads/mattresses/premium_series.jpg`
        }
        const comfortmSeries = {
          original: `${config.API_URL}/uploads/mattresses/comfort_series.jpg`,
          thumbnail: `${config.API_URL}/uploads/mattresses/comfort_series.jpg`
        }
        matress.pictures = [...matress.pictures, premuimSeries, comfortmSeries]

        const rawMaterials = res.data.material;
        const classMaterials = rawMaterials.map(materialString =>
          materialString
            .split('\n')
            .map(item => item.trim())
        );
        const priceArray = res.data.price;

        if (Array.isArray(priceArray)) {
          if (priceArray.length === 4) {
            matress.price = [
              [priceArray[0], priceArray[1]],
              [priceArray[2], priceArray[3]],
            ];
          } else if (priceArray.length === 3) {
            matress.price = [
              [priceArray[0], priceArray[1]],
              [null, priceArray[2]],
            ];
          } else if (priceArray.length === 2) {
            matress.price = [
              [priceArray[0], priceArray[1]],
            ];
          }
        }
        setClassMaterials(classMaterials)
        setMattress(matress);
        setSelectedClothe(0);
        setSelectedClassIndex(0);

      });
  }, [company, productID]);

  function formatNumberWithSpaces(number) {
    number = +number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const addToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      addItem({
        ...product,
        quantity: 1,
        clothe: selectedClothe,
        classIndex: selectedClassIndex,
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
        classIndex: selectedClassIndex,
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
        classIndex: selectedClassIndex,
      })
    );
  };


  const getMattressQuantity = (mattress) => {
    const productInBasket = basket.find(
      (item) =>
        item.id === mattress.id &&
        item.clothe === selectedClothe &&
        item.classIndex === selectedClassIndex
    );
    return productInBasket ? productInBasket.quantity : 0;
  };

  // --- COVER LOGIC ---
  const coverId = `cover-${mattress.id}`;
  const coverInCart = basket.find(item => item.id === coverId);
  const coverQty = coverInCart ? coverInCart.quantity : 0;
  const coverImages = [1, 2, 3, 4, 5].map(i => ({
    original: `${config.API_URL}/uploads/cover/cover_${i - 1}.jpg`,
    thumbnail: `${config.API_URL}/uploads/cover/cover_${i - 1}.jpg`
  }));
  const handleAddCover = () => {
    if (!coverInCart) {
      dispatch(
        addItem({
          id: coverId,
          type: 'cover',
          name: `Наматрасник аквастоп на "${mattress.name}"`,
          width: mattress.width,
          length: mattress.length,
          price: 2000,
          image: coverImages[0].original,
          quantity: 1,
          selected: false,
        })
      );
    }
  };
  const handleChangeCoverQty = (amount) => {
    if (coverInCart) {
      dispatch(
        changeQuantity({
          id: coverId,
          amount,
        })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Матрас ${mattress.name || ''} — LIRON`}</title>
        <meta name="description" content={`Купить матрас ${mattress.name || ''} для грузовика. Индивидуальные размеры, доставка по России, гарантия качества.`} />
        <meta name="keywords" content={`матрас ${mattress.name || ''}, матрасы для фур, матрасы для грузовиков, купить матрас для фуры`} />
        <meta property="og:title" content={`Матрас ${mattress.name || ''} — LIRON`} />
        <meta property="og:description" content={`Купить матрас ${mattress.name || ''} для грузовика. Индивидуальные размеры, доставка по России.`} />
        <meta property="og:type" content="product" />
      </Helmet>
      <StructuredData mattress={mattress} />
      <Header />
      <div className={styles.container}>
        <div className={styles.product__main_spec}>
          <h1 className={styles.title}>Матрас для фуры {mattress.name}</h1>
          <div className={styles.productContent}>
            <div className={styles.imageGallery}>
              <GalleryBlock images={mattress.pictures} />
            </div>
            <div className={styles.details}>
              <h2 className={styles.price}>
                {formatNumberWithSpaces(mattress.price?.[selectedClassIndex]?.[selectedClothe] || 0)} ₽
              </h2>

              <div className={styles.clotheSelector}>

                <div className={styles.clotheSelector__title}>Тип ткани:
                  <span className={styles.clotheInfo__hover}>
                    <span className={styles.clotheSelector__icon}><AiOutlineInfoCircle /></span>
                    <div
                      className={styles.clotheInfoMenu}>
                      <h3>Жаккард</h3>
                      <p>Прочная ткань с выразительным рисунком. Износостойкая, легко чистится, выглядит стильно.</p>
                      <h3>Велюр</h3>
                      <p>Мягкая, бархатистая ткань. Дарит комфорт, приятна на ощупь, хорошо пропускает воздух.</p>
                    </div>
                  </span>
                </div>
                <div className={styles.clothe}>
                  {mattress.clothing_types?.map((clothe, index) => {
                    const isDisabled =
                      selectedClassIndex === 1 && !mattress.price?.[1]?.[index];
                    return (
                      <button
                        key={index}
                        className={`${styles.clotheOption} 
                  ${selectedClothe === index ? styles.activeClothe : ""} 
                  ${isDisabled ? styles.disabledClothe : ""}`}
                        onClick={() => {
                          if (!isDisabled) {
                            setSelectedClothe(index);
                          }
                        }}
                        disabled={isDisabled}
                      >
                        {clothe}
                      </button>
                    );
                  })}
                </div>

              </div>
              {/* Переключатель класса матраса */}
              <div className={styles.clotheSelector}>
                <div className={styles.clotheSelector__title}>Класс матраса:
                  <span className={styles.clotheInfo__hover}>
                    <span className={styles.clotheSelector__icon}><AiOutlineInfoCircle /></span>
                    <div
                      className={styles.clotheInfoMenu}>
                      <h3>Комфорт</h3>
                      <p>Базовый класс матраса. Оптимален по цене, подходит для стандартных условий эксплуатации и умеренной нагрузки.</p>
                      <h3>Премиум</h3>
                      <p>Улучшенный состав для максимального комфорта и поддержки. Подходит для повышенных нагрузок и длительного использования.</p>
                    </div>
                  </span>
                </div>
                <div className={styles.clothe}>
                  {mattressClasses.map((cls, index) => {
                    const isDisabled = !mattress.price?.[index]; // если нет цен для этого класса
                    return (
                      <button
                        key={index}
                        className={`${styles.clotheOption} 
        ${selectedClassIndex === index ? styles.activeClothe : ""} 
        ${isDisabled ? styles.disabledClothe : ""}`}
                        onClick={() => {
                          if (!isDisabled) {
                            setSelectedClassIndex(index);
                            if (
                              index === 1 && // Премиум
                              mattress.clothing_types?.[selectedClothe] !== "Велюр"
                            ) {
                              const velourIndex = mattress.clothing_types?.findIndex(
                                (type) => type === "Велюр"
                              );
                              if (velourIndex !== -1) {
                                setSelectedClothe(velourIndex);
                              }
                            }
                          }
                        }}
                        disabled={isDisabled}
                      >
                        {cls}
                      </button>
                    );
                  })}

                </div>


              </div>
              {/* Состав по классу матраса */}
              <div className={styles.clotheSelector}>
                <div className={styles.clotheSelector__title}>Состав:</div>
                <ul className={styles.materialList}>
                  {classMaterials.length > 0 ? classMaterials[selectedClassIndex].map((item, idx) => (
                    <li key={idx} className={styles.materialItem}>
                      {item}
                    </li>
                  )) : null}
                </ul>
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
                  <li>
                    {Array.isArray(mattress.thickness)
                      ? mattress.thickness.length === 1
                        ? mattress.thickness[0]
                        : mattress.thickness[selectedClassIndex] ?? mattress.thickness[0]
                      : mattress.thickness}
                  </li>
                  <li>{Array.isArray(mattress.rigidity) ? mattress.rigidity[selectedClassIndex] : mattress.rigidity}</li>
                </ul>
              </div>
              <ul className={styles.specList}>
                <li>
                  <p>Внешний габарит:</p>
                  <span>{mattress.width} x {mattress.length}</span>
                </li>
                <li>
                  <p>Высота:</p>
                  <span>
                    {Array.isArray(mattress.thickness)
                      ? mattress.thickness.length === 1
                        ? mattress.thickness[0]
                        : mattress.thickness[selectedClassIndex] ?? mattress.thickness[0]
                      : mattress.thickness}
                  </span>
                </li>
                <li>
                  <p>Жесткость:</p>
                  <span>{Array.isArray(mattress.rigidity) ? mattress.rigidity[selectedClassIndex] : mattress.rigidity}</span>
                </li>
              </ul>

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

              {/* Блок наматрасника */}
            </div>
          </div>
        </div>
        <div className={styles.coverBlockWrapper}>
          <div className={styles.coverBlock}>
            <div className={styles.coverBlock__imageWrap}>
              <GalleryBlock images={coverImages} showThumbnails={false} />
            </div>
            <div className={styles.coverBlock__content}>
              <h3 className={styles.coverBlock__title}>Наматрасник аквастоп на "{mattress.name}"</h3>
              <div className={styles.cover__size}>Размер: {mattress.width} x {mattress.length}</div>
              <div className={styles.cover__price}>Цена: 2000 ₽</div>
              <div className={styles.coverBlock__desc}>
                Выполнен в виде простыни на стягивающей резинке из махровой ткани с непромокаемой мембраной. Хорошо впитывает и защищает матрас от влаги. Эти простыни изготавливаются, точно по размерам оригинального спального места.
              </div>
              {coverQty === 0 ? (
                <button className={styles.coverBlock__add} onClick={handleAddCover}>Добавить в корзину</button>
              ) : (
                <div className={styles.coverBlock__controls}>
                  <div className={styles.control__container}>
                    <button onClick={() => handleChangeCoverQty(-1)} className={styles.coverBlock__btn}>-</button>
                    <span className={styles.coverBlock__count}>{coverQty}</span>
                    <button onClick={() => handleChangeCoverQty(1)} className={styles.coverBlock__btn}>+</button>
                  </div>
                  <Link to="/cart" className={styles.coverBlock__add}>Перейти в корзину</Link>
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
              <p><strong>Доставляем нашими курьерами в следующие регионы:</strong></p>
              <ul className={styles.deliveryList}>
                <li>Владимирская область</li>
                <li>Московская область</li>
                <li>Нижегородская область</li>
                <li>Тульская область</li>
                <li>Рязань</li>
                <li>Казань</li>
                <li>Санкт-Петербург</li>
              </ul>
              <p>Услуга доставки от <strong>1000 до 1500 рублей</strong> за 1 матрас (в зависимости от габаритов).</p>
              <p><strong>Оплата — при получении товара.</strong></p>
              <p>Если вы находитесь за пределами указанных регионов, вы можете воспользоваться услугами транспортной компании (ТК).</p>
              <p><strong>Также доступен самовывоз:</strong></p>
              <ul className={styles.deliveryList}>
                <li>С трассы М-12 возле Мурома</li>
                <li>По адресу: Муромская ул., 2, г. Муром</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>)
}
