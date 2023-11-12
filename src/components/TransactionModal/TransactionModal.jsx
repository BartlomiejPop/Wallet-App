import React, { useState } from 'react';
import css from './TransactionModal.module.css';
import close from '../../icons/close.svg';

const TransactionModal = ({ open, onClose, handleAddTransaction }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [valueInput, setValueInput] = useState(0.0);
  const [dateInput, setDateInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  const addTransaction = () => {
    onClose();
    const transactionType = isChecked === false ? '+' : '-';
    const transactionCategory =
      selectedCategory === '' ? 'Other' : selectedCategory;
    const transactionData = {
      Date: dateInput,
      Type: transactionType,
      Category: transactionCategory,
      Comment: commentInput,
      Sum: valueInput,
    };
    handleAddTransaction(transactionData);
  };

  if (!open) return null;

  return (
    <div className={css.overlay}>
      <div className={css.modalContainer}>
        <h2 className={css.tittle}>Add transaction</h2>
        <img
          className={css.closeBtn}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
          src={close}
          alt="wallet icon"
        />
        <div className={css.switch_container}>
          <p
            className={css.income}
            style={{ color: isChecked ? '#e0e0e0' : '#24cca7' }}
          >
            Income
          </p>
          <label className={css.switch}>
            <input
              className={css.switch_input}
              type="checkbox"
              onChange={() => setIsChecked(!isChecked)}
            />
            <span className={css.slider}></span>
          </label>
          <p
            className={css.expens}
            style={{ color: isChecked ? '#FF6596' : '#e0e0e0' }}
          >
            Expense
          </p>
        </div>

        <select
          className={css.selectStyle}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ display: isChecked ? 'flex' : 'none' }}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Car">Car</option>
          <option value="Self care">Self care</option>
          <option value="Household products">Household products</option>
          <option value="Education">Education</option>
          <option value="Leisure">Leisure</option>
          <option value="Other expenses">Other expenses</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Main Expenses">Main Expenses</option>
          <option value="Child care">Child care</option>
        </select>

        <div className={css.modalContainer2}>
          <input
            className={css.valueInput}
            type="number"
            min="0.00"
            placeholder="0.00"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
          <input
            className={css.dateInput}
            type="date"
            min="2023-01-01"
            max="2025-04-20"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
        </div>
        <input
          className={css.commentInput}
          type="text"
          placeholder="Comment"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button className={css.btn} onClick={addTransaction}>
          ADD
        </button>
        <button className={css.btn2} onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
