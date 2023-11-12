import React, { useState, useEffect } from 'react';
import styles from './Curriences.module.css';
import bg from '../../icons/curriencesBg.svg';
import bgTablet from '../../icons/curriencesBgTablet.svg';
import bgDesktop from '../../icons/curriencesBg.svg';

const Curriences = () => {
  const [usdData, setUsdData] = useState(null);
  const [eurData, setEurData] = useState(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        // Pobierz dane kursu sprzedaży dla USD
        const usdResponse = await fetch(
          'http://api.nbp.pl/api/exchangerates/rates/c/USD/',
        );
        const usdData = await usdResponse.json();
        setUsdData(usdData);

        // Pobierz dane kursu sprzedaży dla EUR
        const eurResponse = await fetch(
          'http://api.nbp.pl/api/exchangerates/rates/c/EUR/',
        );
        const eurData = await eurResponse.json();
        setEurData(eurData);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyData();
  }, []); // Pusta tablica zależności oznacza, że useEffect wykona się tylko raz po zamontowaniu komponentu

  const renderCurrencyRow = (currency, purchaseRate, saleRate) => (
    <li className={styles.walletValues}>
      <span className={styles.item}>{currency}</span>
      <span className={styles.item}>{purchaseRate} zł</span>
      <span className={styles.item}>{saleRate}zł</span>
    </li>
  );

  return (
    <ul className={styles.walletBox}>
      <li className={styles.walletKeys}>
        <span className={styles.item}>Currency</span>
        <span className={styles.item}>Purchase</span>
        <span className={styles.item}>Sale</span>
      </li>
      <ul className={styles.walletValuesBox}>
        {usdData &&
          renderCurrencyRow(
            'USD',
            usdData.rates[0].ask.toFixed(2),
            usdData.rates[0].bid.toFixed(2),
          )}
        {eurData &&
          renderCurrencyRow(
            'EUR',
            eurData.rates[0].ask.toFixed(2),
            eurData.rates[0].bid.toFixed(2),
          )}
      </ul>
      <img className={styles.walletBg} src={bgTablet} alt="bg"></img>
    </ul>
  );
};

export default Curriences;
