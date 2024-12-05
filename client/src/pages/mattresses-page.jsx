import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import config from "../config/config";
import styles from "../styles/mattresses.module.css";
import { Link } from "react-router-dom";
export default function Mattresses() {
  const { company } = useParams();
  const [mattresses, setMattresses] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Для модального окна
  const [currentImages, setCurrentImages] = useState([]); // Для хранения текущих изображений каждого товара
  const [selectedThumbnails, setSelectedThumbnails] = useState({}); // Для отслеживания выбранных миниатюр по id товара
  const [shapes, setShapes] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    selectedShapes: [],
    priceFrom: "",
    priceTo: "",
    rigidity: [],
  });

  useEffect(() => {
    const initialMattresses = [
      {
        id: 1,
        company: "VOLVO",
        name: "VOLVO XF 95",
        price: "10 490",
        specifications: {
          width: "450см",
          length: "200см",
          thickness: "15см",
          rigidity: "Средняя",
        },
        pictures: [
          `${config.API_URL}/uploads/mattresses/1/1.jpg`,
          `${config.API_URL}/uploads/mattresses/1/2.jpg`,
          `${config.API_URL}/uploads/mattresses/1/3.jpeg`,
        ],
      },
      {
        id: 2,
        company: "DAF",
        name: "DAF XF 105",
        price: "12 230",
        specifications: {
          width: "420см",
          length: "190см",
          thickness: "12см",
          rigidity: "Жесткая",
        },
        pictures: [
          `${config.API_URL}/uploads/mattresses/2/1.jpg`,
          `${config.API_URL}/uploads/mattresses/2/2.jpg`,
        ],
      },
    ];
    const initialShapes = [
      {
        id: 1,
        name: "Прямоугольный",
        image: `https://via.placeholder.com/200x150?text=Матрас+1`,
      },
      {
        id: 2,
        name: "Овальный",
        image: `https://via.placeholder.com/200x150?text=Матрас+2`,
      },
      {
        id: 3,
        name: "Круглый",
        image: `https://via.placeholder.com/200x150?text=Матрас+3`,
      },
      {
        id: 4,
        name: "Эпсилоидный",
        image: `https://via.placeholder.com/200x150?text=Матрас+4`,
      },
    ];

    setMattresses(initialMattresses);
    setShapes(initialShapes);

    // Инициализация массива текущих изображений для каждого товара
    const initialCurrentImages = initialMattresses.map((mattress) => ({
      id: mattress.id,
      currentImage: mattress.pictures[0], // Начальная картинка товара
    }));
    setCurrentImages(initialCurrentImages);

    // Инициализация selectedThumbnails, устанавливая для каждого товара первую картинку как выбранную миниатюру
    const initialSelectedThumbnails = initialMattresses.reduce(
      (acc, mattress) => {
        acc[mattress.id] = mattress.pictures[0]; // Первая картинка из списка миниатюр
        return acc;
      },
      {},
    );
    setSelectedThumbnails(initialSelectedThumbnails);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    const { search, selectedShapes, priceFrom, priceTo, rigidity } = filters;

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

  return (
    <>
      <Header />
      <div className={styles.page__title}>{company.toUpperCase()}</div>
      <div className={styles.path__container}>
        <i>
          <a href="#">Главная</a> - <a href="#">Каталог</a> -{" "}
          <a href="#">{company.toUpperCase()}</a>
        </i>
      </div>
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
              {shapes.map((shape) => (
                <label key={shape.id} className={styles.shapeBlock}>
                  <input
                    type="checkbox"
                    className={styles.shapeCheckbox}
                    checked={filters.selectedShapes.includes(shape.name)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      handleFilterChange(
                        "selectedShapes",
                        checked
                          ? [...filters.selectedShapes, shape.name]
                          : filters.selectedShapes.filter(
                              (x) => x !== shape.name,
                            ),
                      );
                    }}
                  />
                  <img
                    src={shape.image}
                    alt={shape.name}
                    className={styles.shapeImage}
                  />
                  {/* <span className={styles.shapeLabel}>{shape.name}</span> */}
                </label>
              ))}
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

          <li className={styles.price__item}>
            <div className={styles.price__title}>Цена</div>
            <div className={styles.price_picker__container}>
              <input
                type="number"
                placeholder="От"
                value={filters.priceFrom}
                onChange={(e) =>
                  handleFilterChange("priceFrom", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="До"
                value={filters.priceTo}
                onChange={(e) => handleFilterChange("priceTo", e.target.value)}
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
                      onClick={() => handleThumbnailClick(mattress.id, picture)} // Обновляем текущую картинку и выбранную миниатюру
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
                    Размер: {mattress.specifications.width} x{" "}
                    {mattress.specifications.length}
                  </p>
                  <p className={styles.card__specs}>
                    Толщина: {mattress.specifications.thickness}
                  </p>
                  <p className={styles.card__specs}>
                    Жесткость: {mattress.specifications.rigidity}
                  </p>
                  <div className={styles.button__container}>
                    <button className={styles.card__button}>
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
