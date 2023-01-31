import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonCategoryFood({ category, fetchFilterFood }) {
  return (
    <div>
      <button
        data-testid={ `${category}-category-filter` }
        onClick={ () => fetchFilterFood(category) }
      >
        { category }
      </button>
    </div>
  );
}

ButtonCategoryFood.propTypes = {
  category: PropTypes.string.isRequired,
  fetchFilterFood: PropTypes.func.isRequired,
};
