import React, { Component } from 'react';
import styles from './PopUpBtn.module.css';
import plus from '../../icons/plus.svg';

class PopUpBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    return (
      <div>
        <div className={styles.btn} onClick={this.toggleModal}>
          <img src={plus} className={styles.icon} alt="plus icon" />
        </div>
        {this.state.showModal && <div className={styles.modal}></div>}
      </div>
    );
  }
}

export default PopUpBtn;
