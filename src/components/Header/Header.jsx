import React from 'react';
import { useSelector } from 'react-redux'; // Importuje useSelector z react-redux
import wallet from '../../icons/wallet.svg';
import exit1 from '../../icons/exit1.svg';
import css from './Header.module.css';

const Header = () => {
  const firstName = useSelector((state) => state.user.username);
  const handleClick = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  return (
    <div className={css.wrapper}>
      <div className={css.wrapper_fst}>
        <img className={css.icons_wallet} src={wallet} alt="wallet icon" />
        <span className={css.wallet_title}>Wallet</span>
      </div>
      <div className={css.wrapper_second}>
        <span className={css.name}>{firstName}</span>
        <img
          className={css.icons_exit1}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
          src={exit1}
          alt="wallet icon"
        />
        <span
          style={{ cursor: 'pointer' }}
          onClick={handleClick}
          className={css.Exit_span}
        >
          Exit
        </span>
      </div>
    </div>
  );
};

export default Header;
