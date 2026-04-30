import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/cart.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import FeedbackModal from "../components/UI/FeedbackModal/FeedbackModal";
import {
  changeQuantity,
  toggleSelectItem,
  selectAll,
  removeSelected,
  removeItem,
} from "../store/cartSlice";

const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

export default function Cart() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const basket = useSelector((state) => state.cart.basket);
  const selectedItems = basket.filter((item) => item.selected);

  const handleQuantityChange = (id, amount, clothe, classIndex) => {
    dispatch(changeQuantity({ id, amount, clothe, classIndex }));
  };
  const handleSelectAll = (checked) => dispatch(selectAll(checked));
  const handleRemoveSelected = () => dispatch(removeSelected());
  const handleRemoveItem = (id, clothe, classIndex) => dispatch(removeItem({ id, clothe, classIndex }));
  const handleSelectItem = (id, clothe, classIndex) => dispatch(toggleSelectItem({ id, clothe, classIndex }));

  const getUnitPrice = (item) => {
    if (item?.type === "cover") return parseInt(item.price, 10) || 0;
    const str = item.price?.[item.classIndex]?.[item.clothe];
    return parseInt(str, 10) || 0;
  };

  const getItemTotal = (item) => {
    const unitPrice = getUnitPrice(item);
    return unitPrice * (item.quantity || 1);
  };

  const formatPrice = (n) => new Intl.NumberFormat("ru-RU").format(n);

  const totalCost = basket
    .filter((i) => i.selected)
    .reduce((sum, i) => sum + getItemTotal(i), 0);

  const allSelected = basket.length > 0 && basket.every((i) => i.selected);

  const clotheNames = { 0: "Жаккард", 1: "Велюр" };
  const classNames  = { 0: "Комфорт", 1: "Премиум" };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Корзина</h1>

        {basket.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <div className={styles.emptyTitle}>Корзина пуста</div>
            <Link to="/catalog" className={styles.emptyBtn}>В каталог</Link>
          </div>
        ) : (
          <div className={styles.cartContent}>

            {/* ── LIST ── */}
            <div className={styles.cartListContainer}>
              {/* Select all row */}
              <div className={styles.selectAllRow}>
                <label className={styles.selectAllLabel}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>Выбрать все ({basket.length})</span>
                </label>
                <button onClick={handleRemoveSelected} className={styles.deleteSelectedBtn}>
                  <IconTrash /> Удалить выбранное
                </button>
              </div>

              {/* Items */}
              <ul className={styles.cartList}>
                {basket.map((item) => {
                  const key = `${item.id}-${item.clothe}-${item.classIndex ?? 0}`;
                  return (
                    <li key={key} className={styles.cartItem}>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleSelectItem(item.id, item.clothe, item.classIndex)}
                        className={styles.checkbox}
                      />

                      {/* Image */}
                      {item.company ? (
                        <Link to={`/catalog/${item.company.toLowerCase()}/${item.id}`} className={styles.imageLink}>
                          <img
                            src={item.pictures?.[0]?.original || item.image}
                            alt={item.name}
                            className={styles.cartImage}
                          />
                        </Link>
                      ) : (
                        <div className={styles.imageLink}>
                          <img src={item.image} alt={item.name} className={styles.cartImage} />
                        </div>
                      )}

                      {/* Info */}
                      <div className={styles.itemInfo}>
                        {item.company ? (
                          <Link to={`/catalog/${item.company.toLowerCase()}/${item.id}`} className={styles.itemName}>
                            {item.name}
                          </Link>
                        ) : (
                          <div className={styles.itemName}>{item.name}</div>
                        )}
                        <div className={styles.itemTags}>
                          {item.type !== "cover" && (
                            <>
                              <span className={styles.itemTag}>{clotheNames[item.clothe] ?? item.clothe}</span>
                              <span className={styles.itemTag}>{classNames[item.classIndex] ?? item.classIndex}</span>
                            </>
                          )}
                          <span className={styles.itemTagDim}>Арт. #{item.id}</span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className={styles.itemControls}>
                        <div className={styles.itemPrice}>
                          {formatPrice(getItemTotal(item))} ₽
                        </div>
                        <div className={styles.qtyRow}>
                          <div className={styles.qtyControl}>
                            <button
                              className={styles.qtyBtn}
                              onClick={() => handleQuantityChange(item.id, -1, item.clothe, item.classIndex)}
                            >−</button>
                            <span className={styles.qtyNum}>{item.quantity}</span>
                            <button
                              className={styles.qtyBtn}
                              onClick={() => handleQuantityChange(item.id, 1, item.clothe, item.classIndex)}
                            >+</button>
                          </div>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleRemoveItem(item.id, item.clothe, item.classIndex)}
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ── SUMMARY ── */}
            <div className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Итого</h2>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Товаров</span>
                <span className={styles.summaryVal}>{selectedItems.length} шт.</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryTotalRow}>
                <span className={styles.summaryTotalLabel}>К оплате</span>
                <span className={styles.summaryTotalPrice}>{formatPrice(totalCost)} ₽</span>
              </div>
              <button
                className={styles.checkoutBtn}
                disabled={selectedItems.length === 0}
                onClick={() => setIsModalOpen(true)}
              >
                Оформить заказ
              </button>
              <p className={styles.summaryDisclaimer}>
                Нажимая кнопку, вы соглашаетесь с условиями оферты
              </p>
              <div className={styles.summaryPhone}>
                <span className={styles.summaryPhoneLabel}><IconPhone /> Или позвоните нам</span>
                <a href="tel:+79209219311" className={styles.summaryPhoneNum}>+7 920 921-93-11</a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} matrasses={selectedItems} />
    </>
  );
}
