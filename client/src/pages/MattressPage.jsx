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
  const [activeTab, setActiveTab] = useState(0);

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
  const coverImages = [
    { original: "/cover_placeholder.jpg", thumbnail: "/cover_placeholder.jpg" },
  ];
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
        <nav className={styles.breadcrumbs} aria-label="breadcrumb">
          <Link to="/" className={styles.breadcrumb__link}>Главная</Link>
          <span className={styles.breadcrumb__sep}>›</span>
          <Link to="/catalog" className={styles.breadcrumb__link}>Каталог</Link>
          <span className={styles.breadcrumb__sep}>›</span>
          <Link to={`/catalog/${company}`} className={styles.breadcrumb__link}>{company?.toUpperCase()}</Link>
          <span className={styles.breadcrumb__sep}>›</span>
          <span className={styles.breadcrumb__current}>{mattress.name}</span>
        </nav>
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
                <div className={styles.clotheSelector__title}>Тип ткани:</div>
                <div className={styles.fabricCircles}>
                  {(() => {
                    // Используем новые ClothingTypes с картинками, fallback на старый массив строк
                    const fabricTypes = mattress.ClothingTypes?.length > 0
                      ? mattress.ClothingTypes
                      : (mattress.clothing_types || []).map((name) => ({ name, image: null, description: null }));

                    return fabricTypes.map((ct, index) => {
                      const isDisabled = selectedClassIndex === 1 && !mattress.price?.[1]?.[index];
                      const isActive = selectedClothe === index;
                      return (
                        <div key={index} className={styles.fabricCircleWrap}>
                          <button
                            className={`${styles.fabricCircle} ${isActive ? styles.fabricCircleActive : ""} ${isDisabled ? styles.fabricCircleDisabled : ""}`}
                            onClick={() => { if (!isDisabled) setSelectedClothe(index); }}
                            disabled={isDisabled}
                            title={ct.name}
                          >
                            {ct.image
                              ? <img src={`${config.API_URL}${ct.image}`} alt={ct.name} />
                              : <span className={styles.fabricCircleText}>{ct.name.slice(0, 2)}</span>
                            }
                          </button>
                          <span className={styles.fabricCircleLabel}>{ct.name}</span>
                          {(ct.image || ct.description) && (
                            <div className={styles.fabricTooltip}>
                              {ct.image && (
                                <img src={`${config.API_URL}${ct.image}`} alt={ct.name} className={styles.fabricTooltipImg} />
                              )}
                              <p className={styles.fabricTooltipName}>{ct.name}</p>
                              {ct.description && <p className={styles.fabricTooltipDesc}>{ct.description}</p>}
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
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
                            // Если текущая ткань недоступна в новом классе — переключаем на первую доступную
                            const currentFabricAvailable = !!mattress.price?.[index]?.[selectedClothe];
                            if (!currentFabricAvailable) {
                              const firstAvailableIdx = (mattress.price?.[index] || [])
                                .findIndex((p) => !!p);
                              if (firstAvailableIdx !== -1) setSelectedClothe(firstAvailableIdx);
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
              {classMaterials.length > 0 && (
                <div className={styles.composition__card}>
                  <div className={styles.composition__label}>Состав</div>
                  <ul className={styles.materialList}>
                    {classMaterials[selectedClassIndex].map((item, idx) => (
                      <li key={idx} className={styles.materialItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Характеристики — 3 карточки */}
              <div className={styles.spec__cards}>
                <div className={styles.spec__card}>
                  <span className={styles.spec__card_label}>Размер</span>
                  <span className={styles.spec__card_value}>{mattress.width} × {mattress.length} мм</span>
                </div>
                <div className={styles.spec__card}>
                  <span className={styles.spec__card_label}>Высота</span>
                  <span className={styles.spec__card_value}>
                    {Array.isArray(mattress.thickness)
                      ? mattress.thickness.length === 1
                        ? mattress.thickness[0]
                        : mattress.thickness[selectedClassIndex] ?? mattress.thickness[0]
                      : mattress.thickness} мм
                  </span>
                </div>
                <div className={styles.spec__card}>
                  <span className={styles.spec__card_label}>Жёсткость</span>
                  <span className={styles.spec__card_value}>
                    {Array.isArray(mattress.rigidity) ? mattress.rigidity[selectedClassIndex] : mattress.rigidity}
                  </span>
                </div>
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

              <div className={styles.phone__line}>
                Или позвоните нам:
                <a href="tel:+79209219311" className={styles.phone__link}>+7 920 921-93-11</a>
              </div>

              {/* Блок наматрасника */}
            </div>
          </div>
        </div>
        {/* Наматрасник — компактная карточка */}
        <div className={styles.coverCard}>
          <div className={styles.coverCard__img}>
            <img
              src={`${config.API_URL}/uploads/cover/cover_0.jpg`}
              alt="Наматрасник аквастоп"
            />
          </div>
          <div className={styles.coverCard__body}>
            <h3 className={styles.coverCard__title}>Наматрасник аквастоп на «{mattress.name}»</h3>
            <p className={styles.coverCard__meta}>
              Размер: {mattress.width} × {mattress.length} мм · Махровая ткань с непромокаемой мембраной
            </p>
            <div className={styles.coverCard__price}>2 000 ₽</div>
            {coverQty === 0 ? (
              <button className={styles.coverCard__btn} onClick={handleAddCover}>Добавить в корзину</button>
            ) : (
              <div className={styles.coverBlock__controls}>
                <div className={styles.control__container}>
                  <button onClick={() => handleChangeCoverQty(-1)} className={styles.coverBlock__btn}>-</button>
                  <span className={styles.coverBlock__count}>{coverQty}</span>
                  <button onClick={() => handleChangeCoverQty(1)} className={styles.coverBlock__btn}>+</button>
                </div>
                <Link to="/cart" className={styles.coverCard__btn}>Перейти в корзину</Link>
              </div>
            )}
          </div>
        </div>

        {/* Табы: Описание / Доставка и оплата */}
        <div className={styles.tabs__wrapper}>
          <div className={styles.tabs__nav}>
            <button
              className={`${styles.tab__btn} ${activeTab === 0 ? styles.tab__btn_active : ''}`}
              onClick={() => setActiveTab(0)}
            >
              Описание
            </button>
            <button
              className={`${styles.tab__btn} ${activeTab === 1 ? styles.tab__btn_active : ''}`}
              onClick={() => setActiveTab(1)}
            >
              Доставка и оплата
            </button>
          </div>
          <div className={styles.tabs__content}>
            {activeTab === 0 && (
              <p className={styles.tab__text}>{mattress.description}</p>
            )}
            {activeTab === 1 && (
              <div className={styles.tab__text}>
                <p><strong>Доставляем курьерами:</strong> Владимирская обл., Московская обл., Нижегородская обл., Тульская обл., Рязань, Казань, Санкт-Петербург.</p>
                <p>Стоимость доставки: <strong>1 000 – 1 500 ₽</strong> за 1 матрас. Оплата при получении.</p>
                <p>Для остальных регионов — через транспортную компанию. Самовывоз: трасса М-12, г. Муром.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>)
}
