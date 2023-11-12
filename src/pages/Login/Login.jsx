import React, { useState } from 'react';
import css from './Login.module.css';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import wallet from '../../icons/wallet.svg';
import email from '../../icons/email.svg';
import password from '../../icons/password.svg';
import frame from '../../icons/frame.svg';
import elipse1 from '../../icons/elipse1.svg';
import elipse2 from '../../icons/elipse2.svg';
import { authApi } from '../../api/auth.services';
import { setUsername } from '../../Redux/userSlice';
import Notiflix from 'notiflix';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, username } = await authApi.loginUser(formData);
      dispatch(setUsername(username));
      if (token) {
        console.log(token);
        localStorage.setItem('accessToken', token);
        Notiflix.Notify.success('Logged in successfully');
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        Notiflix.Notify.failure('Login error. Email or password is incorrect!');
      } else {
        Notiflix.Notify.failure('Login error. Try again.');
      }
    }
  };
  const handleRegisterClick = () => {
    navigate('/register');
    Notiflix.Notify.info('You deliberately went to the registration page.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.box}>
          <img className={css.frame_icon} src={frame} alt="frame icon" />
          <img className={css.elipse1} src={elipse1} alt="elipse orange" />
          <img className={css.elipse2} src={elipse2} alt="elipse purple" />
          <h2 className={css.title}>Finance App</h2>
        </div>

        <div className={css.login_container}>
          <div className={css.login_title}>
            <img className={css.wallet_icon} src={wallet} alt="wallet icon" />
            <h2 className={css.wallet_title}>Wallet</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={css.input_container}>
              <input
                className={css.input}
                type="email"
                placeholder="E-mail"
                name="email"
                required=""
                value={formData.email}
                onChange={handleInputChange}
              />
              <img className={css.input_icon} src={email} alt="email icon" />
            </div>

            <div className={css.input_container}>
              <input
                className={css.input}
                type="password"
                placeholder="Password"
                name="password"
                required=""
                value={formData.password}
                onChange={handleInputChange}
              />
              <img
                className={css.input_icon}
                src={password}
                alt="password icon"
              />
            </div>

            <button className={css.login_button}>LOG IN</button>
          </form>

          <div className={css.register_container}>
            <button
              className={css.register_button}
              onClick={handleRegisterClick}
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
