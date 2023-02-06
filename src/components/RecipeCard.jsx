import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

export default function RecipeCard({ index, recipe, url }) {
  const split = url.split('/');
  const key = `${split[1][0].toUpperCase()}${split[1].slice(1, split[1].length - 1)}`;

  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="recipe-card-container"
    >
      <img
        data-testid={ `${index}-card-img` }
        className="recipe-img"
        src={ recipe[`str${key}Thumb`].replace('\\', '') }
        alt={ recipe[`str${key}`] }
      />
      <span
        data-testid={ `${index}-card-name` }
        className="recipe-name"
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
