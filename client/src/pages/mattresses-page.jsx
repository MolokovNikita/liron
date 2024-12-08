import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import config from "../config/config";
import styles from "../styles/mattresses.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CardContext } from "../context/cartContext";

export default function Mattresses() {
  const { basket, setBasket } = useContext(CardContext);
  const { company } = useParams();
  const [mattresses, setMattresses] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedThumbnails, setSelectedThumbnails] = useState({});
  const [shapes, setShapes] = useState([]);
  const [mattressTypes, setMattressTypes] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    selectedShapes: [],
    priceFrom: "",
    priceTo: "",
    maxWeightFrom: "",
    maxWeightTo: "",
    rigidity: [],
    type: [],
  });

  useEffect(() => {
    axios
      .get(`${config.API_URL}/mattress`, {
        params: {
          tovar_type: company.toLowerCase(),
        },
      })
      .then((res) => {
        const matresses = res.data.map((item) => ({
          ...item,
          company: company,
          pictures: Array.from(
            { length: item.pictures_count },
            (_, index) =>
              `${config.API_URL}/uploads/mattresses/${item.id}/${index + 1}.jpg`,
          ),
        }));

        setMattresses(matresses);

        const initialCurrentImages = matresses.map((mattress) => ({
          id: mattress.id,
          currentImage: mattress.pictures[0],
        }));
        setCurrentImages(initialCurrentImages);

        const initialSelectedThumbnails = matresses.reduce((acc, mattress) => {
          acc[mattress.id] = mattress.pictures[0]; // Первая картинка из списка миниатюр
          return acc;
        }, {});
        setSelectedThumbnails(initialSelectedThumbnails);

        axios.get(`${config.API_URL}/shapes`).then((res) => {
          console.log(res.data);
          const shapes = res.data.map((item) => ({
            ...item,
            image: `https://via.placeholder.com/200x150?text=Матрас+${item.id}`,
          }));
          setShapes(shapes);
          axios.get(`${config.API_URL}/mattress-type`).then((res) => {
            setMattressTypes(res.data);
          });
        });
      });
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    const {
      search,
      selectedShapes,
      priceFrom,
      priceTo,
      rigidity,
      type,
      maxWeightFrom,
      maxWeightTo,
    } = filters;
    console.log(filters);
    let filteredMattresses = [...mattresses];

    if (search) {
      filteredMattresses = filteredMattresses.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedShapes) {
      filteredMattresses = filteredMattresses.filter(
        (m) => m.shape === selectedShapes,
      );
    }

    if (priceFrom) {
      filteredMattresses = filteredMattresses.filter(
        (m) => m.price >= parseInt(priceFrom, 10),
      );
    }

    if (priceTo) {
      filteredMattresses = filteredMattresses.filter(
        (m) => m.price <= parseInt(priceTo, 10),
      );
    }

    if (rigidity.length > 0) {
      filteredMattresses = filteredMattresses.filter((m) =>
        rigidity.includes(m.specifications.rigidity),
      );
    }

    setMattresses(filteredMattresses);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleThumbnailClick = (mattressId, image) => {
    setCurrentImages((prevImages) =>
      prevImages.map((img) =>
        img.id === mattressId ? { ...img, currentImage: image } : img,
      ),
    );

    setSelectedThumbnails((prevThumbnails) => ({
      ...prevThumbnails,
      [mattressId]: image,
    }));
  };
  const addToCart = (mattress, event) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      const existingmattressIndex = prevBasket.findIndex(
        (item) => item.id === mattress.id && item.color === mattress.colors[0],
      );
      if (existingmattressIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingmattressIndex] = {
          ...updatedBasket[existingmattressIndex],
          quantity: updatedBasket[existingmattressIndex].quantity + 1,
          color: mattress.colors[0],
        };
        return updatedBasket;
      } else {
        return [
          ...prevBasket,
          {
            ...mattress,
            quantity: 1,
            selected: false,
            color: mattress.colors[0],
          },
        ];
      }
    });
  };
  const decreaseQuantity = (event, mattress) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      const existingmattressIndex = prevBasket.findIndex(
        (item) => item.id === mattress.id,
      );
      if (existingmattressIndex !== -1) {
        const updatedBasket = [...prevBasket];
        const newQuantity = updatedBasket[existingmattressIndex].quantity - 1;
        if (newQuantity > 0) {
          updatedBasket[existingmattressIndex].quantity = newQuantity;
        } else {
          // Если количество становится 0, удаляем товар из корзины
          updatedBasket.splice(existingmattressIndex, 1);
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
      const existingmattressIndex = prevBasket.findIndex(
        (item) => item.id === mattress.id,
      );
      if (existingmattressIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingmattressIndex].quantity += 1;
        return updatedBasket;
      } else {
        return [...prevBasket, { ...mattress, quantity: 1 }];
      }
    });
  };
  const getmattressQuantity = (mattress) => {
    const mattressInBasket = basket.find((item) => item.id === mattress.id);
    if (mattressInBasket) {
      return mattressInBasket.quantity;
    } else {
      return 0;
    }
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
      {mattresses.length !== 0 ? (
        <div className={styles.page__container}>
          <ul className={styles.fillters__container}>
            <li className={styles.search__item}>
              <input
                type="text"
                placeholder="Поиск"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </li>
            <li className={styles.form__item}>
              <div className={styles.form__title}>Форма матраса</div>
              <div className={styles.form_picker__container}>
                {shapes.length != 0
                  ? shapes.map((shape) => (
                      <label key={shape.id} className={styles.shapeBlock}>
                        <input
                          type="checkbox"
                          className={styles.shapeCheckbox}
                          checked={filters.selectedShapes.includes(
                            shape.shape_name,
                          )}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            handleFilterChange(
                              "selectedShapes",
                              checked
                                ? [...filters.selectedShapes, shape.shape_name]
                                : filters.selectedShapes.filter(
                                    (x) => x !== shape.shape_name,
                                  ),
                            );
                          }}
                        />

                        <img
                          src={shape.image}
                          alt={shape.shape_name}
                          className={styles.shapeImage}
                        />
                        {/* <span className={styles.shapeLabel}>{shape.shape_name}</span> */}
                      </label>
                    ))
                  : null}
              </div>
            </li>
            <li className={styles.rigidity__item}>
              <div className={styles.rigidity__title}>Жесткость матраса</div>
              <div className={styles.rigidity_picker__container}>
                {["Мягкий", "Средний", "Жесткий"].map((r) => (
                  <label key={r} className={styles.rigidity__block}>
                    <input
                      type="checkbox"
                      className={styles.rigidity__checkbox}
                      checked={filters.rigidity.includes(r)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "rigidity",
                          checked
                            ? [...filters.rigidity, r]
                            : filters.rigidity.filter((x) => x !== r),
                        );
                      }}
                    />
                    <span className={styles.rigidity__label}>{r}</span>
                  </label>
                ))}
              </div>
            </li>
            <li>
              <div className={styles.rigidity__title}>Тип матраса</div>
              <div className={styles.rigidity_picker__container}>
                {mattressTypes?.map((type) => (
                  <label key={type.id} className={styles.rigidity__block}>
                    <input
                      type="checkbox"
                      className={styles.rigidity__checkbox}
                      checked={filters.type.includes(type)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "type",
                          checked
                            ? [...filters.type, type]
                            : filters.type.filter((x) => x !== type),
                        );
                      }}
                    />
                    <span className={styles.rigidity__label}>
                      {type.type_name}
                    </span>
                  </label>
                ))}
              </div>
            </li>

            <li className={styles.price__item}>
              <div className={styles.price__title}>Цена</div>
              <div className={styles.price_picker__container}>
                <input
                  type="number"
                  placeholder="От руб."
                  value={filters.priceFrom}
                  onChange={(e) =>
                    handleFilterChange("priceFrom", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="До руб."
                  value={filters.priceTo}
                  onChange={(e) =>
                    handleFilterChange("priceTo", e.target.value)
                  }
                />
              </div>
            </li>
            <li className={styles.price__item}>
              <div className={styles.price__title}>Максимальная нагрузка</div>
              <div className={styles.price_picker__container}>
                <input
                  type="number"
                  placeholder="От кг."
                  value={filters.maxWeightFrom}
                  onChange={(e) =>
                    handleFilterChange("maxWeightFrom", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="До кг."
                  value={filters.maxWeightTo}
                  onChange={(e) =>
                    handleFilterChange("maxWeightTo", e.target.value)
                  }
                />
              </div>
            </li>
            <li>
              <button
                className={styles.apply__button}
                onClick={handleApplyFilters}
              >
                Применить
              </button>
            </li>
          </ul>
          <div className={styles.mattresses__container}>
            {mattresses.map((mattress) => {
              const currentImage = currentImages.find(
                (img) => img.id === mattress.id,
              )?.currentImage;
              return (
                <div key={mattress.id} className={styles.card__container}>
                  <img
                    src={currentImage || mattress.pictures[0]}
                    alt={mattress.name}
                    className={styles.card__image}
                    onClick={() =>
                      openImageModal(currentImage || mattress.pictures[0])
                    }
                  />
                  <div className={styles.card__thumbnails}>
                    {mattress.pictures.map((picture, index) => (
                      <img
                        key={index}
                        src={picture}
                        alt={`Доп фото ${index + 1}`}
                        className={`${styles.card__thumbnail} ${
                          picture === selectedThumbnails[mattress.id]
                            ? styles.selectedThumbnail
                            : ""
                        }`} // Добавляем обводку для выбранной миниатюры
                        onClick={() =>
                          handleThumbnailClick(mattress.id, picture)
                        } // Обновляем текущую картинку и выбранную миниатюру
                      />
                    ))}
                  </div>
                  <div className={styles.card__details}>
                    <Link
                      to={`/catalog/${mattress.company.toLowerCase()}/${mattress.id}`}
                      className={styles.card__title}
                    >
                      {mattress.name}
                    </Link>
                    <p className={styles.card__price}>{mattress.price} ₽</p>
                    <p className={styles.card__specs}>
                      Размер: {mattress.width} x {mattress.length}
                    </p>
                    <p className={styles.card__specs}>
                      Толщина: {mattress.thickness}
                    </p>
                    <p className={styles.card__specs}>
                      Жесткость: {mattress.rigidity}
                    </p>
                    <div className={styles.button__container}>
                      {/* <button className={styles.card__button}>
                      Добавить в корзину
                    </button> */}
                      {getmattressQuantity(mattress) == 0 ? (
                        <>
                          <button
                            className={styles.basket__button}
                            onClick={(event) => addToCart(mattress, event)}
                          >
                            Добавить в корзину
                          </button>
                        </>
                      ) : (
                        <div
                          className={styles.basket__control}
                          onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                        >
                          <div
                            className={styles.increase__btn}
                            onClick={(event) =>
                              decreaseQuantity(event, mattress)
                            }
                          >
                            -
                          </div>
                          {getmattressQuantity(mattress)}
                          <div
                            className={styles.decrease__btn}
                            onClick={(event) =>
                              increaseQuantity(event, mattress)
                            }
                          >
                            +
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <p className={styles.empty_mattrasses}>
            Извините, матрасов данной компании временно нет в наличии
          </p>
        </div>
      )}
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
