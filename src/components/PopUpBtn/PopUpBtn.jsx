import React, { Component } from 'react';
import styles from './PopUpBtn.module.css';
import plus from '../../icons/plus.svg';

class PopUpBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false, // Dodajemy stan do zarządzania widocznością modala
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal, // Zmieniamy stan modalu przy każdym kliknięciu
    }));
  };

  render() {
    return (
      <div>
        <div className={styles.btn} onClick={this.toggleModal}>
          <img src={plus} className={styles.icon} alt="plus icon" />
        </div>

        {/* Warunkowe renderowanie modala na podstawie stanu */}
        {this.state.showModal && (
          <div className={styles.modal}>
            {/* Tutaj dodaj zawartość formularza edycji transakcji */}
            {/* Na przykład możesz użyć wcześniejszego komponentu EditTransactionForm */}
            {/* <EditTransactionForm /> */}
          </div>
        )}
      </div>
    );
  }
}

export default PopUpBtn;
