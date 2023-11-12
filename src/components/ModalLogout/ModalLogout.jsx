// Komponent LogoutModal
import React, { useState } from 'react';
import css from './ModalLogout.module.css';
import close from '../../icons/close.svg';

function LogoutModal({ isOpen, onClose }) {
  const toggleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  return (
    <div className={`${css.overlay} ${isOpen ? css.show : ''}`}>
      <div className={css.modalContainer}>
        <h2 className={css.title}>Logout Confirmation!</h2>
        <img
          className={css.closeBtn}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
          src={close}
          alt="wallet icon"
        />
        <p>Are you sure you want to log out?!</p>
        <button onClick={toggleLogout}>Logout</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
}

export default LogoutModal;
