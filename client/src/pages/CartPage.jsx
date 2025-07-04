import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/cart.module.css";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FeedbackModal from "../components/UI/FeedbackModal/FeedbackModal";
import {
  changeQuantity,
  toggleSelectItem,
  selectAll,
  removeSelected,
  removeItem,
} from "../store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const basket = useSelector((state) => state.cart.basket);
  console.log(basket);
  const selectedItems = basket.filter(item => item.selected);


  const handleQuantityChange = (id, amount, clothe, classIndex) => {
    dispatch(changeQuantity({ id, amount, clothe, classIndex }));
  };

  const handleSelectAll = (checked) => {
    dispatch(selectAll(checked));
  };

  const handleRemoveSelected = () => {
    dispatch(removeSelected());
  };

  const handleRemoveItem = (id, clothe, classIndex) => {
    dispatch(removeItem({ id, clothe, classIndex }));
  };

  const handleSelectItem = (id, clothe, classIndex) => {
    dispatch(toggleSelectItem({ id, clothe, classIndex }));
  };

  const getPrice = (priceArray, quantity, classIndex, clothe, item) => {
    if (item?.type === 'cover') {
      const unitPrice = parseInt(item.price, 10) || 0;
      const totalPrice = unitPrice * (quantity || 1);
      return new Intl.NumberFormat("ru-RU").format(totalPrice);
    }
    if (
      !Array.isArray(priceArray) ||
      typeof classIndex !== 'number' ||
      typeof clothe !== 'number' ||
      typeof quantity !== 'number'
    ) {
      return "0";
    }
    const priceString = priceArray[classIndex]?.[clothe];
    const unitPrice = parseInt(priceString, 10) || 0;
    const totalPrice = unitPrice * quantity;
    if (isNaN(totalPrice)) return "0";
    return new Intl.NumberFormat("ru-RU").format(totalPrice);
  };



  const totalCost = basket
    .filter((item) => item.selected)
    .reduce((total, item) => {
      if (item.type === 'cover') {
        const unitPrice = parseInt(item.price, 10) || 0;
        return total + unitPrice * (item.quantity || 1);
      }
      const priceString = item.price?.[item.classIndex]?.[item.clothe];
      const unitPrice = parseInt(priceString, 10) || 0;
      return total + unitPrice * item.quantity;
    }, 0);



  const allSelected = basket.length > 0 && basket.every((item) => item.selected);
  const clotheNames = {
    0: "Жаккард",
    1: "Велюр",
  };

  const classNames = {
    0: "Комфорт",
    1: "Премиум",
  };

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
                  <span className={styles.deleteText}>Удалить выбранное</span>
                </button>
              </div>
              <ul className={styles.cartList}>
                {basket.map((item) => (
                  <li key={item.id + "-" + item.clothe + "-" + (item.classIndex ?? 0)} className={styles.cartItem}>
                    <div className={styles.itemHeader}>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleSelectItem(item.id, item.clothe, item.classIndex)}
                        className={styles.checkbox}
                      />
                      <div className={styles.mobilePrice}>
                        {getPrice(item.price, item.quantity, item.classIndex, item.clothe, item)} ₽
                      </div>
                    </div>

                    <div className={styles.itemContent}>
                      {item.company ? (
                        <Link
                          to={`/catalog/${item.company.toLowerCase()}/${item.id}`}
                          className={styles.imageLink}
                        >
                          <img
                            src={item.pictures?.[0]?.original}
                            alt={item.name}
                            className={styles.cartImage}
                          />
                        </Link>
                      ) : (
                        <div className={styles.imageLink}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className={styles.cartImage}
                          />
                        </div>
                      )}

                      <div className={styles.itemDetails}>
                        {item.company ? (
                          <Link
                            to={`/catalog/${item.company.toLowerCase()}/${item.id}`}
                            className={styles.mattress__name}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <div className={styles.mattress__name}>{item.name}</div>
                        )}

                        <div className={styles.itemAttributes}>
                          <p className={styles.item__articul}>
                            Артикул: #{item.id}
                          </p>
                          {item.type !== 'cover' && (
                            <>
                              <p className={styles.item__articul}>
                                Ткань: {clotheNames[item.clothe] || item.clothe}
                              </p>
                              <p className={styles.item__articul}>
                                Класс: {classNames[item.classIndex] || item.classIndex}
                              </p>
                            </>
                          )}
                        </div>

                        <div className={styles.mobileControls}>
                          <div className={styles.quantityControl}>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, -1, item.clothe, item.classIndex)
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
                                handleQuantityChange(item.id, 1, item.clothe, item.classIndex)
                              }
                              className={styles.quantityButton}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className={styles.delete_item__btn}
                            onClick={() => handleRemoveItem(item.id, item.clothe, item.classIndex)}
                          >
                            <RxCross1 size={20} />
                            {/* <span className={styles.deleteText}>Удалить</span> */}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.itemFooter}>
                      <p className={styles.mattress__price}>
                        {getPrice(item.price, item.quantity, item.classIndex, item.clothe, item)} ₽
                      </p>

                      <div className={styles.desktopControls}>
                        <div className={styles.quantityControl}>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, -1, item.clothe, item.classIndex)
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
                              handleQuantityChange(item.id, 1, item.clothe, item.classIndex)
                            }
                            className={styles.quantityButton}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className={styles.delete_item__btn}
                          onClick={() => handleRemoveItem(item.id, item.clothe, item.classIndex)}
                        >
                          <RxCross1 size={25} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.cartSummary} ${isSticky ? styles.stickySummary : ''}`}>
              <div className={styles.summaryContent}>
                <h2>Итого: {totalCost.toLocaleString("ru-RU")} ₽</h2>
                <button
                  className={styles.checkoutButton}
                  onClick={() => setIsModalOpen(true)}>
                  Перейти к оформлению
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.emptyCartMessage}>Ваша корзина пуста.</p>
        )}
      </div >
      <Footer />
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} matrasses={selectedItems} />
    </>
  );
}