import React, { useState, useEffect } from 'react';
import styles from './IncomeExpense.module.css';
import editBtn from '../../icons/editBtn.svg';

const IncomeExpenseTable = (balance) => {
  const isWideScreen = window.innerWidth > 768;
  const isDesktopScreen = window.innerWidth > 1279;

  const [transactions, setTransactionList] = useState(
    JSON.parse(localStorage.getItem('transactions')) || [], // Dodaj obsługę, gdy 'transactions' nie jest zainicjowane
  );

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const deleteTransaction = (index) => {
    const updatedTransactionList = transactions.filter((el, i) => i !== index);
    setTransactionList(updatedTransactionList);
  };

  return isWideScreen ? (
    <div className={isDesktopScreen ? styles.desktopScreen : ''}>
      {isWideScreen && (
        <ul className={styles.listKeys}>
          <li className={styles.desktopItem}>
            <strong>Date</strong>
          </li>
          <li className={styles.desktopItem}>
            <strong>Type</strong>
          </li>
          <li className={styles.desktopItem}>
            <strong>Category</strong>
          </li>
          <li className={styles.desktopItem}>
            <strong>Comment</strong>
          </li>
          <li className={styles.desktopItem}>
            <strong>Sum</strong>
          </li>
          <li className={styles.desktopItem}></li>
        </ul>
      )}
      {balance.balance.map((item, index) => (
        <ul key={index} className={styles.listValues}>
          <li style={{ minWidth: '30px' }}>
            <div className={styles.listValuesDate}>{item.Date}</div>
          </li>
          <li>
            <div className={styles.listValuesType}>{item.Type}</div>
          </li>
          <li>
            <div className={styles.listValuesCategory}>{item.Category}</div>
          </li>
          <li>
            <div className={styles.listValuesComment}>{item.Comment}</div>
          </li>
          <li>
            <div style={{ color: item.Type === '-' ? 'red' : 'green' }} className={styles.listValuesSum}>
              {item.Sum}
            </div>
          </li>
          <li className={styles.buttonBox}>
            <button className={styles.editBtn}>
              <img src={editBtn} alt="edit button" />
            </button>
            <button
              onClick={() => {
                deleteTransaction(index);
              }}
              className={styles.deleteBtn}
            >
              Delete
            </button>
          </li>
        </ul>
      ))}
    </div>
  ) : (
    <div className={styles.table}>
      {balance.balance.map((item, index) => (
        <ul key={index} className={styles.list}>
          <li className={styles.item}>
            <div
              style={{
                backgroundColor: item.Type === '-' ? '#ff6596' : '#24CCA7',
              }}
              className={styles.colorBox}
            ></div>
            <strong>Date:</strong> <span>{item.Date}</span>
          </li>
          <li className={styles.item}>
            <div
              style={{
                backgroundColor: item.Type === '-' ? '#ff6596' : '#24CCA7',
              }}
              className={styles.colorBox}
            ></div>
            <strong>Type:</strong> <span>{item.Type}</span>
          </li>
          <li className={styles.item}>
            <div
              style={{
                backgroundColor: item.Type === '-' ? '#ff6596' : '#24CCA7',
              }}
              className={styles.colorBox}
            ></div>
            <strong>Category:</strong> <span>{item.Category}</span>
          </li>
          <li className={styles.item}>
            <div
              style={{
                backgroundColor: item.Type === '-' ? '#ff6596' : '#24CCA7',
              }}
              className={styles.colorBox}
            ></div>
            <strong>Comment:</strong> <span>{item.Comment}</span>
          </li>
          <li className={styles.item}>
            <div
              style={{
                backgroundColor: item.Type === '-' ? '#ff6596' : '#24CCA7',
              }}
              className={styles.colorBox}
            ></div>
            <strong>Sum:</strong>{' '}
            <span style={{ color: item.Type === '-' ? 'red' : 'green' }}>
              {item.Sum}
            </span>
          </li>
          <li className={styles.item}>
            <div
              style={{
                backgroundColor: item.Type === '-' ? '#ff6596' : '#24CCA7',
              }}
              className={styles.colorBox}
            ></div>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                deleteTransaction(index);
              }}
            >
              Delete
            </button>
            <button className={styles.editBtn}>
              <img src={editBtn} alt="edit button" />
              <span>Edit</span>
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default IncomeExpenseTable;
