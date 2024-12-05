import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/cart.module.css";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      company: "DAF",
      name: "Матрас Люкс для грузовика",
      details: "Размер: 200x80x10 см, ткань Премиум",
      price: 12000,
      quantity: 1,
      image: "https://via.placeholder.com/150?text=Матрас+1",
      selected: false,
    },
    {
      id: 2,
      company: "DAF",
      name: "Матрас Комфорт для фуры",
      details: "Размер: 190x70x8 см, ткань Премиум",
      price: 9500,
      quantity: 1,
      image: "https://via.placeholder.com/150?text=Матрас+2",
      selected: false,
    },
    {
      id: 3,
      company: "DAF",
      name: "Бюджетный матрас для грузовика",
      details: "Размер: 180x70x6 см, ткань Премиум",
      price: 7000,
      quantity: 1,
      image: "https://via.placeholder.com/150?text=Матрас+3",
      selected: false,
    },
    {
      id: 4,
      company: "DAF",
      name: "Бюджетный матрас для грузовика",
      details: "Размер: 180x70x6 см, ткань Премиум",
      price: 7000,
      quantity: 1,
      image: "https://via.placeholder.com/150?text=Матрас+3",
      selected: false,
    },
    {
      id: 5,
      company: "DAF",
      name: "Бюджетный матрас для грузовика",
      details: "Размер: 180x70x6 см, ткань Премиум",
      price: 7000,
      quantity: 1,
      image: "https://via.placeholder.com/150?text=Матрас+3",
      selected: false,
    },
    {
      id: 6,
      company: "DAF",
      name: "Бюджетный матрас для грузовика",
      details: "Размер: 180x70x6 см, ткань Премиум",
      price: 7000,
      quantity: 1,
      image: "https://via.placeholder.com/150?text=Матрас+3",
      selected: false,
    },
    {
      id: 7,
      company: "DAF",
      name: "Бюджетный матрас для грузовика",
      details: "Размер: 180x70x6 см, ткань Премиум",
      price: 7000,
      quantity: 1,
      image: "https://via.placeholder.com/150?text=Матрас+3",
      selected: false,
    },
  ]);

  const handleQuantityChange = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  };

  const handleSelectAll = (checked) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: checked })),
    );
  };

  const handleRemoveSelected = () => {
    setCartItems((prevItems) => prevItems.filter((item) => !item.selected));
  };
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const handleSelectItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const totalCost = cartItems
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const allSelected = cartItems.every((item) => item.selected);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Корзина</h1>
        {cartItems.length > 0 ? (
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
                {cartItems.map((item) => (
                  <li key={item.id} className={styles.cartItem}>
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleSelectItem(item.id)}
                      className={styles.checkbox}
                    />
                    <Link
                      to={`/catalog/${item.company.toLowerCase()}/${item.id}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.cartImage}
                      />
                    </Link>
                    <div className={styles.itemDetails}>
                      <p className={styles.item__articul}>
                        Артикул - #{item.id}
                      </p>
                      <Link
                        to={`/catalog/${item.company.toLowerCase()}/${item.id}`}
                        className={styles.mattress__name}
                      >
                        {item.name}
                      </Link>
                      <p className={styles.mattress__details}>{item.details}</p>
                    </div>
                    <p className={styles.mattress__price}>{item.price} ₽</p>
                    <div className={styles.item__control}>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className={styles.quantityButton}
                        >
                          -
                        </button>
                        <span className={styles.item__quantity}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className={styles.quantityButton}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className={styles.delete_item__btn}
                        onClick={() => {
                          handleRemoveItem(item.id);
                        }}
                      >
                        <RxCross1 size={25} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.cartSummary}>
              <h2>Итого: {totalCost} ₽</h2>
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
