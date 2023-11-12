import React, { useState } from 'react';
import css from './DropdownMenu.module.css';
import arrowIcon from '../../icons/arrow.svg';

const DropdownMenu = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = ['2021', '2022', '2023'];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2023');



  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className={css.statisticContent}>
      {/* Month */}
      <div className={css.statisticContent_input}>
        <div className={css.select}>
          <div onClick={() => toggleDropdown('month')} className={css.timeBox}>
            <div className={css.inputWithArrow}>
              <input
                className={css.selectMonthInput}
                value={selectedMonth}
                readOnly
              />
              <img src={arrowIcon} alt="arrow icon" className={css.arrowIcon} />
            </div>
          </div>
          {openDropdown === 'month' && (
            <ul className={css.optionList}>
              {months.map((month) => (
                <li
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setOpenDropdown(null);
                  }}
                  className={
                    selectedMonth === month
                      ? css.selectedOptionLi
                      : css.optionLi
                  }
                >
                  {month}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Year */}
        <div className={css.select}>
          <div onClick={() => toggleDropdown('year')} className={css.timeBox}>
            <div className={css.inputWithArrow}>
              <input
                className={`${css.selectMonthInput} ${css.selectYearInput}`}
                value={selectedYear}
                readOnly
              />
              <img src={arrowIcon} alt="arrow icon" className={css.arrowIcon} />
            </div>
          </div>
          {openDropdown === 'year' && (
            <ul className={css.optionList}>
              {years.map((year) => (
                <li
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setOpenDropdown(null);
                  }}
                  className={
                    selectedYear === year ? css.selectedOptionLi : css.optionLi
                  }
                >
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
