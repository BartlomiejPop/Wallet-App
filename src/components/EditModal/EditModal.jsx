import React, { useState } from 'react';
import css from './EditModal.module.css';
import close from '../../icons/close.svg';

const EditModal = ({ open, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  if (!open) return null;

  return (
    <div className={css.overlay}>
      <div className={css.modalContainer}>
        <h2 className={css.tittle}>Edit transaction</h2>
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
        </select>

        <div className={css.modalContainer2}>
          <input className={css.valueInput} type="number" placeholder="0.00" />
          <input
            className={css.dateInput}
            type="date"
            min="2023-01-01"
            max="2025-04-20"
          />
        </div>
        <input className={css.commentInput} type="text" placeholder="Comment" />
        <button className={css.btn}>SAVE</button>
        <button className={css.btn2} onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default EditModal;
