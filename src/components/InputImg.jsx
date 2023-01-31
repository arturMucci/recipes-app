import React, { useContext } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import RecipesProvider from '../context/RecipesProvider';

function InputImg(url) {
  const {
    isCopied,
    setIsCopied,
    // favoriteRecipes,
    // setFavoriteRecipes,
  } = useContext(RecipesProvider);

  const actualUrl = window.location.href;
  const copyLink = () => {
    if (!isCopied) {
      setIsCopied(true);
      copy(actualUrl);
    } else {
      setIsCopied(false);
    }
  };

  const favoriteRecipe = () => {
    console.log(url);
  };

  return (
    <>
      <div>
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
          src={ favoriteIcon }
          alt=""
          onClick={ () => favoriteRecipe() }
        />
      </div>
      {isCopied && <span>Link copied!</span>}
    </>
  );
}

InputImg.proptype = {
  url: PropTypes.string,
}.isRequired;

export default InputImg;
