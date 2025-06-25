import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/mattress.card.module.css";

// Форматирование цены с пробелами
function formatNumberWithSpaces(number) {
  if (typeof number === "number" || typeof number === "string") {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return number;
}

export default function Mattress({ mattress }) {
  const navigate = useNavigate();

  const getMinimalPrice = (priceData) => {
    if (!Array.isArray(priceData)) return null;
    let prices = [];
    for (let row of priceData) {
      if (Array.isArray(row)) {
        prices.push(...row);
      } else {
        prices.push(row);
      }
    }
    const numericPrices = prices
      .map(p => parseInt(p, 10))
      .filter(p => !isNaN(p));
    if (numericPrices.length === 0) return null;
    return formatNumberWithSpaces(Math.min(...numericPrices));
  };

  return (
    <div className={styles.card__container} key={mattress.id}>
      <img
        src={mattress.pictures?.[0] || "/img/no-image.jpg"}
        alt={mattress.name}
        className={styles.card__image}
        loading="lazy"
        onClick={() =>
          navigate(`/catalog/${mattress.company?.toLowerCase()}/${mattress.id}`)
        }
      />

      <div className={styles.card__details}>
        <Link
          to={`/catalog/${mattress.company?.toLowerCase()}/${mattress.id}`}
          className={styles.card__title}
        >
          Матрас для фуры {mattress.name}
        </Link>
        <p className={styles.card__price}>
          от {getMinimalPrice(mattress.price)} ₽
        </p>
        <div className={styles.specs__container}>
          <p className={styles.card__specs}>
            <span className={styles.spec__label}>Габариты:</span>{" "}
            {mattress.width} x {mattress.length}
          </p>
          <p className={styles.card__specs}>
            <span className={styles.spec__label}>Высота:</span>{" "}
            {Array.isArray(mattress.thickness)
              ? mattress.thickness.join("/")
              : mattress.thickness}
          </p>
          <p className={styles.card__specs}>
            <span className={styles.spec__label}>Жесткость:</span>{" "}
            {Array.isArray(mattress.MattressRigidities)
              ? mattress.MattressRigidities.map(r => r.rigidity_name).join(" / ")
              : mattress.rigidity}
          </p>
          <p className={styles.card__specs}>
            <span className={styles.spec__label}>Тип:</span> {mattress.type}
          </p>
        </div>
        <div className={styles.button__container}>
          <button
            className={styles.detailed__button}
            onClick={() =>
              navigate(
                `/catalog/${mattress.company?.toLowerCase()}/${mattress.id}`
              )
            }
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}

// Валидация props
Mattress.propTypes = {
  mattress: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string),
    company: PropTypes.string.isRequired,
    price: PropTypes.arrayOf(PropTypes.string).isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    thickness: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number,
      PropTypes.string,
    ]),
    rigidity: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
