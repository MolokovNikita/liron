import React from 'react';
import styles from '../styles/delivery.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";

const DeliveryPage = () => {
  return (
    <>
      <Helmet>
        <title>Доставка матрасов по России — LIRON</title>
        <meta name="description" content="Доставка матрасов для грузовиков по всей России. Быстро, удобно, надежно." />
        <meta name="keywords" content="доставка матрасов, доставка по России, матрасы для фур, матрасы для грузовиков" />
        <meta property="og:title" content="Доставка матрасов по России — LIRON" />
        <meta property="og:description" content="Доставка матрасов для грузовиков по всей России. Быстро, удобно, надежно." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <h1 className={styles.title}>Доставка</h1>
      <div className={styles.deliveryContainer}>
        <p className={styles.text}>
          Доставляем нашими курьерами в следующие регионы:
        </p>

        <ul className={styles.regionList}>
          <li>Владимирская область</li>
          <li>Московская область</li>
          <li>Нижегородская область</li>
          <li>Тульская область</li>
          <li>Рязань</li>
          <li>Казань</li>
          <li>Санкт-Петербург</li>
        </ul>

        <p className={styles.text}>
          Услуга доставки от <strong>1000 до 1500 рублей</strong> за 1 матрас (в зависимости от габаритов).
          <br />
          Оплата — <strong>при получении товара</strong>.
        </p>

        <p className={styles.text}>
          Если вы находитесь за пределами указанных регионов, вы можете воспользоваться услугами транспортной компании (ТК).
        </p>

        <p className={styles.text}>
          Также доступен <strong>самовывоз</strong>:
        </p>
        <ul className={styles.pickupList}>
          <li>С трассы М-12 возле Мурома</li>
          <li>По адресу: <strong>Муромская ул., 2, г. Муром</strong></li>
        </ul>
      </div>
      <Footer />
    </>

  );
};

export default DeliveryPage;
