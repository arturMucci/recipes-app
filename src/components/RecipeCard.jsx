import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ index, recipe, url }) {
  const split = url.split('/');
  const key = `${split[1][0].toUpperCase()}${split[1].slice(1, split[1].length - 1)}`;

  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <img
        data-testid={ `${index}-card-img` }
        className="recipe-img"
        src={ recipe[`str${key}Thumb`].replace('\\', '') }
        alt={ recipe[`str${key}`] }
        style={ { width: '200px' } }
      />
      <span
        data-testid={ `${index}-card-name` }
        className="recipe-title"
      >
        { recipe[`str${key}`] }
      </span>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({}).isRequired,
  url: PropTypes.string.isRequired,
};
