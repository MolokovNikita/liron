import PropTypes from "prop-types"; // Импортируем PropTypes
import { Link } from "react-router-dom";
import styles from "../../styles/mattress.card.module.css";
import { useEffect } from "react";

export default function Mattress(props) {
  const {
    mattress,
    currentImages,
    selectedThumbnails,
    openImageModal,
    handleThumbnailClick,
    getmattressQuantity,
    addToCart,
    decreaseQuantity,
    increaseQuantity,
  } = props;
  const currentImage = currentImages.find(
    (img) => img.id === mattress.id,
  )?.currentImage;

  return (
    <div className={styles.card__container} key={mattress.id}>
      <img
        src={
          currentImage ||
          (mattress.pictures.length > 0 ? mattress.pictures[0] : "")
        }
        alt={mattress.name}
        className={styles.card__image}
        onClick={() => openImageModal(currentImage || mattress.pictures[0])}
      />

      <div className={styles.card__thumbnails}>
        {mattress.pictures.map((picture, index) => (
          <img
            key={index}
            src={picture}
            alt={`Доп фото ${index + 1}`}
            className={`${styles.card__thumbnail} ${picture === selectedThumbnails[mattress.id]
                ? styles.selectedThumbnail
                : ""
              }`}
            onClick={() => handleThumbnailClick(mattress.id, picture)}
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
        <p className={styles.card__specs}>Толщина: {mattress.thickness}</p>
        <p className={styles.card__specs}>Жесткость: {mattress.rigidity}</p>
        <p className={styles.card__specs}>Тип: {mattress.type}</p>
        <div className={styles.button__container}>
          {getmattressQuantity(mattress) === 0 ? (
            <button
              className={styles.basket__button}
              onClick={(event) => addToCart(mattress, event)}
            >
              Добавить в корзину
            </button>
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
                onClick={(event) => decreaseQuantity(event, mattress)}
              >
                -
              </div>
              {getmattressQuantity(mattress)}
              <div
                className={styles.decrease__btn}
                onClick={(event) => increaseQuantity(event, mattress)}
              >
                +
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Добавляем валидацию свойств
Mattress.propTypes = {
  mattress: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pictures: PropTypes.arrayOf(PropTypes.string),
    company: PropTypes.string,
    price: PropTypes.string,
    width: PropTypes.string,
    length: PropTypes.string,
    thickness: PropTypes.string,
    rigidity: PropTypes.string,
    type: PropTypes.string,
  }),
  currentImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      currentImage: PropTypes.string,
    }),
  ),
  selectedThumbnails: PropTypes.object,
  openImageModal: PropTypes.func,
  handleThumbnailClick: PropTypes.func,
  getmattressQuantity: PropTypes.func,
  addToCart: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  increaseQuantity: PropTypes.func,
};
