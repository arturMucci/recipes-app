import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { NavLink } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import RecipesProvider from '../context/RecipesProvider';
import unFavoriteIcon from '../images/blackHeartIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

export default function DoneRecipeCard({
  index,
  needFavoriteButton,
  data,
}) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipesProvider);

  const [isCopied, setIsCopied] = useState(false);

  const {
    id,
    type,
    image,
    name,
    category,
    nationality,
    doneDate,
    tags,
    alcoholicOrNot,
  } = data;

  const actualUrl = window.location.href;
  const detailsUrl = actualUrl.replace('favorite-recipes', `${type}s/${id}`);
  const copyLink = () => {
    if (!isCopied) {
      setIsCopied(true);
      console.log(detailsUrl);
      copy(detailsUrl);
    } else {
      setIsCopied(false);
    }
  };

  const toggleFavoriteRecipe = ({ target }) => {
    if (
      !favoriteRecipes.map((each) => each.id).includes(data.id)
      && target.id === 'add'
    ) {
      const newFavorite = [
        ...favoriteRecipes,
        {
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
        }];
      setFavoriteRecipes(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    } else {
      const newFavorite = favoriteRecipes
        .filter((each) => id !== each.id);
      setFavoriteRecipes(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    }
  };

  return (
    <div>
      {needFavoriteButton && (
        <input
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="image"
          id={
            !favoriteRecipes.map((each) => each.id).includes(id)
              ? 'add'
              : 'remove'
          }
          src={
            !favoriteRecipes.map((each) => each.id).includes(id)
              ? favoriteIcon
              : unFavoriteIcon
          }
          alt="favorite-btn"
          onClick={ (evt) => toggleFavoriteRecipe(evt) }
        />)}
      <NavLink to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '100px' } }
          src={ image }
          alt={ `${name}` }
        />
      </NavLink>
      <NavLink to={ `/${type}s/${id}` }>
        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
      </NavLink>
      <div>
        <span data-testid={ `${index}-horizontal-top-text` }>
          {
            type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot
          }
        </span>
        {!needFavoriteButton
        && <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>}
        {!needFavoriteButton
          && tags.map((tag, tagIndex) => {
            let retorno;
            if (tagIndex < 2) {
              retorno = (
                <span
                  key={ `${index}-${tag}` }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              );
              return retorno;
            }
            return retorno;
          })}
        <section>
          <input
            data-testid={ `${index}-horizontal-share-btn` }
            type="image"
            src={ shareIcon }
            alt="share-btn"
            onClick={ () => copyLink() }
          />
          {isCopied && <span>Link copied!</span>}
        </section>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  needFavoriteButton: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ),
    alcoholicOrNot: PropTypes.string.isRequired,
  }),
};

DoneRecipeCard.defaultProps = {
  data: {
    doneDate: ''.isRequired,
    tags: [],
  },
};
