import PropTypes from "prop-types"; // Импортируем PropTypes
import { Link } from "react-router-dom";
import styles from "../../styles/mattress.card.module.css";
import { useNavigate } from "react-router-dom";

export default function Mattress({ mattress }) {
  const navigate = useNavigate();
  function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return (
    <div className={styles.card__container} key={mattress.id}>
      <img
        src={
          (mattress.pictures[0])
        }
        alt={mattress.name}
        className={styles.card__image}
        onClick={() => navigate(`/catalog/${mattress.company.toLowerCase()}/${mattress.id}`)}
      />

      <div className={styles.card__details}>
        <Link
          to={`/catalog/${mattress.company.toLowerCase()}/${mattress.id}`}
          className={styles.card__title}
        >
          {mattress.name}
        </Link>
        <p className={styles.card__price}>от {formatNumberWithSpaces(mattress.price)} ₽</p>
        <p className={styles.card__specs}>
          Внешний габарит: {mattress.width} x {mattress.length}
        </p>
        <p className={styles.card__specs}>Толщина: {mattress.thickness}</p>
        <p className={styles.card__specs}>Жесткость: {mattress.rigidity}</p>
        <p className={styles.card__specs}>Тип: {mattress.type}</p>
        <div className={styles.button__container}>
          <button
            className={styles.detailed__button}
            onClick={() => navigate(`/catalog/${mattress.company.toLowerCase()}/${mattress.id}`)}
          >
            {/* {/* <Link
              to={`/catalog/${mattress.company.toLowerCase()}/${mattress.id}`}
              className={styles.card__title}
            >
            </Link> */}
            Подробнее
          </button>
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
