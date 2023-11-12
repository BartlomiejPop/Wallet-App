import React from 'react';
import css from './CategoryItem.module.css';

const CategoryItem = ({
  labels,
  datasets,
  accountBalance,
  categoryData,
  expenses,
  income,
}) => {
  const totalBalance = datasets[0].data.reduce(
    (total, amount) => total + amount,
    0,
  );

  return (
    <div className={css.categoryContainer}>
      <div className={css.categoryTitle}>
        <h3>Category</h3>
        <h3>Sum</h3>
      </div>
      <div className={css.categoryList}>
        <ul>
          {labels.map((label, index) => (
            <li key={index} className={css.categoryListEl}>
              <span
                className={css.categoryColor}
                style={{
                  backgroundColor: datasets[0].backgroundColor[index],
                  width: '24px',
                  height: '24px',
                  borderRadius: '2px',
                  display: 'inline-block',
                  marginRight: '16px',
                }}
              ></span>
              <div className={css.category}>
                <div className={css.categoryName}>{label}:</div>
                <div className={css.categoryAmount}>
                  {datasets[0].data[index]}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* total balance */}
      <div className={css.accountBalanceContainer}>
        <ul className={css.accountBalanceList}>
          <li>
            <span className={css.expenseText}>Expenses:</span>
            <span className={css.expenseValue}>
              {expenses}
              {categoryData.reduce(
                (total, category) => total + category.amount,
                0,
              )}
            </span>
          </li>
          <li>
            <span className={css.incomeText}>Income:</span>
            <span className={css.incomeValue}>
              {accountBalance}
              {income()}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryItem;
