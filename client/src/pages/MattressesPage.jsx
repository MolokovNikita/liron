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
import MattressCard from "../components/UI/MattressCard.jsx"; 
import FiltersCard from "../components/UI/FiltersCard"; 

export default function Mattresses() {
  const { basket, setBasket } = useContext(CardContext);
  const { company } = useParams();
  const [mattresses, setMattresses] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedThumbnails, setSelectedThumbnails] = useState({});
  const [filteredMattresses, setFilteredMattresses] = useState([]);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
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
    console.log(company);
    setMattresses([]);
    setFilteredMattresses([]);
    setCurrentImages([]);
    setSelectedImage(null);
    setSelectedThumbnails({});
    setIsFilterSelected(false);
    setFilters({
      search: "",
      selectedShapes: [],
      priceFrom: "",
      priceTo: "",
      maxWeightFrom: "",
      maxWeightTo: "",
      rigidity: [],
      type: [],
    });
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
      });
  }, [company]);

  useEffect(() => {
    handleApplyFilters();
  }, [filters, mattresses]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
      setIsFilterSelected(checkIfFiltersSelected(updatedFilters));
      return updatedFilters;
    });
  };
  const checkIfFiltersSelected = (filters) => {
    return Object.values(filters).some((value) =>
      Array.isArray(value) ? value.length > 0 : value !== "",
    );
  };

  const handleApplyFilters = () => {
    let filtered = [...mattresses];

    console.log(filtered);
    console.log(filters);

    if (filters.search) {
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.selectedShapes.length > 0) {
      filtered = filtered.filter((m) =>
        filters.selectedShapes.includes(m.shape),
      );
    }

    if (filters.maxWeightFrom) {
      filtered = filtered.filter(
        (m) => Number(m.max_weight) >= Number(filters.maxWeightFrom),
      );
    }
    if (filters.maxWeightTo) {
      filtered = filtered.filter(
        (m) => Number(m.max_weight) <= Number(filters.maxWeightTo),
      );
    }
    if (filters.priceFrom) {
      filtered = filtered.filter(
        (m) => Number(m.price) >= Number(filters.priceFrom),
      );
    }

    if (filters.priceTo) {
      filtered = filtered.filter(
        (m) => Number(m.price) <= Number(filters.priceTo),
      );
    }

    if (filters.rigidity.length > 0) {
      filtered = filtered.filter((m) => filters.rigidity.includes(m.rigidity));
    }

    if (filters.type.length > 0) {
      filtered = filtered.filter((m) => filters.type.includes(m.type));
    }

    setFilteredMattresses(filtered);
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
          <FiltersCard
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
          <div className={styles.mattresses__container}>
            {isFilterSelected && filteredMattresses.length === 0 && (
              <div>
                По вашим фильтрам не найдено подходящих матрасов. Попробуйте
                изменить параметры поиска.
              </div>
            )}
            {(isFilterSelected ? filteredMattresses : mattresses).map(
              (mattress) => (
                <MattressCard
                  key={mattress.id}
                  mattress={mattress}
                  currentImages={currentImages}
                  selectedThumbnails={selectedThumbnails}
                  openImageModal={openImageModal}
                  handleThumbnailClick={handleThumbnailClick}
                  getmattressQuantity={getmattressQuantity}
                  addToCart={addToCart}
                  decreaseQuantity={decreaseQuantity}
                  increaseQuantity={increaseQuantity}
                />
              ),
            )}
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
