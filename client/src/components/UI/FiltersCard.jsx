import PropTypes from "prop-types";
import styles from "../../styles/filters.card.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config.js";

export default function FiltersCard(props) {
  const { filters, handleFilterChange } = props;
  const [shapes, setShapes] = useState([]);
  const [mattressTypes, setMattressTypes] = useState([]);
  // const [rigidity, setRigidity] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [shapesRes, mattressTypesRes] = await Promise.all([
          axios.get(`${config.API_URL}/shapes`),
          axios.get(`${config.API_URL}/mattress-type`),
        ]);

        const shapes = shapesRes.data.map((item) => ({
          ...item,
        }));
        setShapes(shapes);
        setMattressTypes(mattressTypesRes.data);
      } catch (error) {
        console.error("Ошибка при загрузке фильтров:", error);
      }
    };

    fetchFilters();
  }, []);

  return (
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
          {shapes.length !== 0
            ? shapes.map((shape) => (
                <label key={shape.id} className={styles.shapeBlock}>
                  <input
                    type="checkbox"
                    className={styles.shapeCheckbox}
                    checked={filters.selectedShapes.includes(shape.shape_name)}
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
                </label>
              ))
            : null}
        </div>
      </li>
      <li className={styles.rigidity__item}>
        <div className={styles.rigidity__title}>Жесткость матраса</div>
        <div className={styles.rigidity_picker__container}>
          {["Мягкая", "Средняя", "Жесткая"].map((r) => (
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
                checked={filters.type.includes(type.type_name)} // Убедитесь, что вы используете правильное поле для типа
                onChange={(e) => {
                  const checked = e.target.checked;
                  handleFilterChange(
                    "type",
                    checked
                      ? [...filters.type, type.type_name]
                      : filters.type.filter((x) => x !== type.type_name),
                  );
                }}
              />
              <span className={styles.rigidity__label}>{type.type_name}</span>
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
            onChange={(e) => handleFilterChange("priceFrom", e.target.value)}
          />
          <input
            type="number"
            placeholder="До руб."
            value={filters.priceTo}
            onChange={(e) => handleFilterChange("priceTo", e.target.value)}
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
            onChange={(e) => handleFilterChange("maxWeightTo", e.target.value)}
          />
        </div>
      </li>
    </ul>
  );
}

FiltersCard.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string.isRequired,
    selectedShapes: PropTypes.arrayOf(PropTypes.string).isRequired,
    rigidity: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
    priceFrom: PropTypes.string.isRequired,
    priceTo: PropTypes.string.isRequired,
    maxWeightFrom: PropTypes.string.isRequired,
    maxWeightTo: PropTypes.string.isRequired,
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
