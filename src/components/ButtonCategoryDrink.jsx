import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonCategoryDrink({ category, fetchFilterDrink }) {
  return (
    <section>
      <div>
        <button
          data-testid={ `${category}-category-filter` }
          className="category-btn"
          onClick={ () => fetchFilterDrink(category) }
        >
          { category }
        </button>
      </div>
    </section>
  );
}

ButtonCategoryDrink.propTypes = {
  category: PropTypes.string.isRequired,
  fetchFilterDrink: PropTypes.func.isRequired,
};
