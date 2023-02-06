import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ButtonCategoryFood.css';
import BeefLogo from '../images/BeefLogo.svg';
import GoatLogo from '../images/GoatLogo.svg';
import ChickenLogo from '../images/ChickenLogo.svg';
import BreakfastLogo from '../images/BreakfastLogo.svg';
import DessertLogo from '../images/DessertLogo.svg';

export default function ButtonCategoryFood({ category, fetchFilterFood }) {
  const img = (cat) => {
    switch (cat) {
    case 'Beef':
      return BeefLogo;
    case 'Goat':
      return GoatLogo;
    case 'Chicken':
      return ChickenLogo;
    case 'Breakfast':
      return BreakfastLogo;
    case 'Dessert':
      return DessertLogo;
    default:
      break;
    }
  };
  return (
    <div className="category-container">
      <button
        className="category"
        data-testid={ `${category}-category-filter` }
        onClick={ () => fetchFilterFood(category) }
      >
        <img src={ img(category) } alt="" />
      </button>
    </div>
  );
}

ButtonCategoryFood.propTypes = {
  category: PropTypes.string.isRequired,
  fetchFilterFood: PropTypes.func.isRequired,
};
