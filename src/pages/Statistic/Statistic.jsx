import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import ChartComponent from '../../components/Chart/Chart';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import CategoryItem from '../../components/Category/CategoryItem';
import Balance from '../../components/Balance/Balance';
import Curriences from '../../components/Curriences/Curriences';
import css from './Statistic.module.css';
import elipse1 from '../../icons/elipse1.svg';
import elipse2 from '../../icons/elipse2.svg';

const accountBalanceKey = 'accountBalance';
const expensesKey = 'expenses';

const Statistic = () => {
  const balance = JSON.parse(localStorage.getItem('transactions'));

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const calculateTotalExpense = (transactions, category) => {
    return transactions.reduce((sum, transaction) => {
      if (transaction.Category === category && transaction.Type === '-') {
        return sum + parseFloat(transaction.Sum);
      }
      return sum;
    }, 0);
  };

  const categoryData = useMemo(
    () => [
      {
        category: 'Main Expenses',
        amount: calculateTotalExpense(balance, 'Main Expenses'),
      },
      {
        category: 'Products',
        amount: calculateTotalExpense(balance, 'Leisure'),
      },
      { category: 'Car', amount: calculateTotalExpense(balance, 'Car') },
      {
        category: 'Self care',
        amount: calculateTotalExpense(balance, 'Self care'),
      },
      {
        category: 'Child care',
        amount: calculateTotalExpense(balance, 'Child care'),
      },
      {
        category: 'Household products',
        amount: calculateTotalExpense(balance, 'Household products'),
      },
      {
        category: 'Education',
        amount: calculateTotalExpense(balance, 'Education'),
      },
      {
        category: 'Leisure',
        amount: calculateTotalExpense(balance, 'Leisure'),
      },
      {
        category: 'Other expenses',
        amount: calculateTotalExpense(balance, 'Other expenses'),
      },
    ],
    [],
  );

  const [selectedMonth, setSelectedMonth] = useState('January');

  const shouldRenderCurriences = windowWidth > 767;

  // LOCAL STORAGE
  const [accountBalance, setAccountBalance] = useState(() => {
    const storedBalance = localStorage.getItem(accountBalanceKey);
    return storedBalance ? parseFloat(storedBalance) : 2400;
  });

  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem(expensesKey);
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const income = () => {
    return balance.reduce((sum, transaction) => {
      if (transaction.Type === '+') {
        return sum + parseFloat(transaction.Sum);
      }
      return sum;
    }, 0);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);

    const newBalance = calculateNewBalance();
    setAccountBalance(newBalance);
    localStorage.setItem(accountBalanceKey, newBalance.toString());
  };

  const calculateNewBalance = () => {
    const currentBalance = accountBalance;
    const expensesTotal = expenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );
    const newBalance = currentBalance - expensesTotal;
    return { newBalance, expensesTotal };
  };

  const chartData = useMemo(() => {
    const expensesTotal = expenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );
    return {
      datasets: [
        {
          data: categoryData.map((category) => category.amount),
          backgroundColor: [
            '#FED057',
            '#FFD8D0',
            '#FD9498',
            '#C5BAFF',
            '#6E78E8',
            '#4A56E2',
            '#81E1FF',
            '#24CCA7',
            '#00AD84',
          ],
        },
      ],
      labels: categoryData.map((category) => category.category),
      expensesTotal: expensesTotal,
    };
  }, [categoryData, expenses]);

  return (
    <div>
      <Header />
      <div className={css.statistic_container}>
        <div className={css.statistic_container_desktop_left}>
          {windowWidth < 767 && <Navigation />}
          {shouldRenderCurriences ? (
            <div className={css.tabletViewBox1}>
              <div className={css.tabletViewBox2}>
                <Navigation />
                <Balance balance={balance} />
              </div>
              <div className={css.tabletViewBox3}>
                <Curriences />
              </div>
            </div>
          ) : null}
        </div>

        <div className={css.statistic_container_desktop_right}>
          <div className={css.statistic_containerActual}>
            <div className={css.statistic_container_left}>
              <div className={css.h1_container}>
                <h1>Statistics</h1>
              </div>

              <ChartComponent
                chartData={{ ...chartData, accountBalance: accountBalance }}
              />
            </div>

            <div className={css.statistic_container_right}>
              <DropdownMenu
                selected={selectedMonth}
                options={[
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
                ]}
                onOptionSelect={handleMonthSelect}
              />

              <CategoryItem
                labels={chartData.labels}
                datasets={chartData.datasets}
                expenses={expenses}
                income={income}
                categoryData={categoryData}
              />
              <div className={css.bg}></div>
              <img className={css.elipse1} src={elipse1} alt="elipse orange" />
              <img className={css.elipse2} src={elipse2} alt="elipse purple" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
