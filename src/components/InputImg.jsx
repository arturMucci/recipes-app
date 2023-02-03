// ~/src/components/InputImg.jsx
import React, { useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import unFavoriteIcon from '../images/blackHeartIcon.svg';
import RecipesProvider from '../context/RecipesProvider';

function InputImg({
  recipe,
  ask,
  nameKey,
  imgKeys,
}) {
  const {
    isCopied,
    setIsCopied,
    favoriteRecipes,
    setFavoriteRecipes,
  } = useContext(RecipesProvider);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) {
      setFavoriteRecipes(storage);
    }
  }, [setFavoriteRecipes]);

  const actualUrl = window.location.href;
  const copyLink = () => {
    if (!isCopied) {
      setIsCopied(true);
      copy(actualUrl);
    } else {
      setIsCopied(false);
    }
  };

  const toggleFavoriteRecipe = ({ target }) => {
    if (
      !favoriteRecipes.map((each) => each.id).includes(recipe.id)
      && target.id === 'add'
    ) {
      const newFavorite = [
        ...favoriteRecipes,
        {
          id: ask[2],
          type: ask[1].slice(0, ask[1].length - 1),
          nationality: ask[1] === 'meals' ? recipe.strArea : '',
          category: recipe.strCategory,
          alcoholicOrNot: ask[1] === 'meals' ? '' : recipe.strAlcoholic,
          name: recipe[nameKey],
          image: recipe[imgKeys[0]],
        }];
      setFavoriteRecipes(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    } else {
      const newFavorite = favoriteRecipes
        .filter((each) => ask[2] !== each.id);
      setFavoriteRecipes(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    }
  };

  return (
    <section
      style={ { padding: '10px' } }
    >
      <input
        data-testid="share-btn"
        type="image"
        src={ shareIcon }
        alt="share-btn"
        onClick={ () => copyLink() }
      />
      <input
        data-testid="favorite-btn"
        type="image"
        id={
          !favoriteRecipes.map((each) => each.id).includes(ask[2])
            ? 'add'
            : 'remove'
        }
        src={
          !favoriteRecipes.map((each) => each.id).includes(ask[2])
            ? favoriteIcon
            : unFavoriteIcon
        }
        alt="favorite-btn"
        onClick={ (evt) => toggleFavoriteRecipe(evt) }
      />
      {isCopied && <span>Link copied!</span>}
    </section>
  );
}

InputImg.propTypes = {
  recipe: PropTypes.shape({
    strArea: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
  ask: PropTypes.arrayOf(PropTypes.string).isRequired,
  nameKey: PropTypes.string.isRequired,
  imgKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
}.isRequired;

export default InputImg;
