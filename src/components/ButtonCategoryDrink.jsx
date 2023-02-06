import React from 'react';
import PropTypes from 'prop-types';
import ordinaryDrinkLogo from '../images/OrdinaryDrinksLogo.svg';
import cocktailLogo from '../images/CocktailLogo.svg';
import shakeLogo from '../images/ShakeLogo.svg';
import otherLogo from '../images/OtherLogo.svg';
import cocoaLogo from '../images/CocoaLogo.svg';
import '../styles/ButtonCategoryDrink.css';

export default function ButtonCategoryDrink({ category, fetchFilterDrink }) {
  const img = (cat) => {
    switch (cat) {
    case 'Ordinary Drink':
      return ordinaryDrinkLogo;
    case 'Cocktail':
      return cocktailLogo;
    case 'Shake':
      return shakeLogo;
    case 'Other / Unknown':
      return otherLogo;
    case 'Cocoa':
      return cocoaLogo;
    default:
      break;
    }
  };
  return (
    <section className="btn-category-container">
      <button
        data-testid={ `${category}-category-filter` }
        className="category"
        onClick={ () => fetchFilterDrink(category) }
      >
        <img src={ img(category) } alt={ `${category}-category-logo` } />
      </button>
    </section>
  );
}

ButtonCategoryDrink.propTypes = {
  category: PropTypes.string.isRequired,
  fetchFilterDrink: PropTypes.func.isRequired,
};
