import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/cart.module.css";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  toggleSelectItem,
  selectAll,
  removeSelected,
  removeItem,
} from "../store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.cart.basket);

  const handleQuantityChange = (id, amount, clothe) => {
    dispatch(changeQuantity({ id, amount, clothe }));
  };

  const handleSelectAll = (checked) => {
    dispatch(selectAll(checked));
  };

  const handleRemoveSelected = () => {
    dispatch(removeSelected());
  };

  const handleRemoveItem = (id, clothe) => {
    dispatch(removeItem({ id, clothe }));
  };

  const handleSelectItem = (id, clothe) => {
    dispatch(toggleSelectItem({ id, clothe }));
  };

  const getPrice = (price, quantity) => {
    const numprice = parseInt(price.split(" ").join(""), 10);
    const totalPrice = numprice * quantity;
    const formattedPrice = totalPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return formattedPrice;
  };

  const totalCost = basket
    .filter((item) => item.selected)
    .reduce((total, item) => {
      const price = parseInt(item.price.split(" ").join(""), 10);
      return total + price * item.quantity;
    }, 0);

  const allSelected = basket.length > 0 && basket.every((item) => item.selected);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Корзина</h1>
        {basket.length > 0 ? (
          <div className={styles.cartContent}>
            <div className={styles.cartListContainer}>
              <div className={styles.selectAllContainer}>
                <div className={styles.select__container}>
                  <label className={styles.label}>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className={styles.checkbox}
                    />
                    <span className={styles.selectAllButton}>Выбрать все</span>
                  </label>
                </div>
                <button
                  onClick={handleRemoveSelected}
                  className={styles.deleteSelectedButton}
                >
                  <RxCross1 size={20} className={styles.cancel__span} />
                  Удалить выбранное
                </button>
              </div>
              <ul className={styles.cartList}>
                {basket.map((item) => (
                  <li key={item.id + item.clothe} className={styles.cartItem}>
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleSelectItem(item.id, item.clothe)}
                      className={styles.checkbox}
                    />
                    <Link
                      to={`/catalog/${item.company.toLowerCase()}/${item.id}`}
                    >
                      <img
                        src={item.pictures[0]}
                        alt={item.name}
                        className={styles.cartImage}
                      />
                    </Link>
                    <div className={styles.itemDetails}>
                      <p className={styles.item__articul}>
                        Артикул - #{item.id}
                      </p>
                      <p className={styles.item__articul}>
                        Тип ткани - {item.clothe}
                      </p>
                      <Link
                        to={`/catalog/${item.company.toLowerCase()}/${item.id}`}
                        className={styles.mattress__name}
                      >
                        {item.name}
                      </Link>
                      <p className={styles.mattress__details}>
                        {item.details}
                      </p>
                    </div>
                    <p className={styles.mattress__price}>
                      {getPrice(item.price, item.quantity)} ₽
                    </p>
                    <div className={styles.item__control}>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, -1, item.clothe)
                          }
                          className={styles.quantityButton}
                        >
                          -
                        </button>
                        <span className={styles.item__quantity}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, 1, item.clothe)
                          }
                          className={styles.quantityButton}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.delete_item__btn}
                        onClick={() => handleRemoveItem(item.id, item.clothe)}
                      >
                        <RxCross1 size={25} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.cartSummary}>
              <h2>Итого: {totalCost.toLocaleString("ru-RU")} ₽</h2>
              <button className={styles.checkoutButton}>
                Перейти к оформлению
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.emptyCartMessage}>Ваша корзина пуста.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
