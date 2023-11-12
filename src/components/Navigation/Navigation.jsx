import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import homeIconMobile from '../../icons/homeActiveMobile.svg';
import curriencesIcon from '../../icons/currency.svg';
import diagramIconMobile from '../../icons/diagramMobile.svg';
import HomeIconTabletActive from '../../icons/HomeIconTabletActive.svg';

function Navigation() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isWideScreen = window.innerWidth >= 768;
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const shouldRenderNavigationItem = windowWidth <= 768;

  return (
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <NavLink
          className={styles.link}
          to="/home"
          isActive={(match, location) => {
            if (match) {
              return true;
            }
            return location.pathname.startsWith('/home');
          }}
        >
          <img
            className={styles.navigationIcon}
            src={isWideScreen ? HomeIconTabletActive : homeIconMobile}
            alt="home nav icon"
          ></img>
          {!shouldRenderNavigationItem && (
            <span
              style={{
                fontWeight:
                  location.pathname.startsWith('/home') && isWideScreen
                    ? 'bold'
                    : 'normal',
              }}
              className={styles.navigationName}
            >
              Home
            </span>
          )}
        </NavLink>
      </li>
      <li className={styles.navigationItem}>
        <NavLink className={styles.link} to="/statistic">
          <img
            className={styles.navigationIcon}
            src={diagramIconMobile}
            alt="statistic nav icon"
          ></img>
          {!shouldRenderNavigationItem && (
            <span
              style={{
                fontWeight:
                  location.pathname === '/statistic' ? 'bold' : 'normal',
              }}
              className={styles.navigationName}
            >
              Statistics
            </span>
          )}
        </NavLink>
      </li>
      {shouldRenderNavigationItem ? (
        <li className={styles.navigationItem}>
          <NavLink className={styles.link} to="/currencies">
            <img
              className={styles.navigationIcon}
              src={curriencesIcon}
              alt="currencies nav icon"
            />
          </NavLink>
        </li>
      ) : null}
    </ul>
  );
}

export default Navigation;
