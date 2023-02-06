/// ~/src/pages/RecipeDetails.jsx
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import InputImg from '../components/InputImg';
import '../styles/RecipeDetails.css';
import {
  objectIsEmpty,
  isRecipeInProgressInLocalStorage,
  isRecipeDoneInLocalStorage,
  getRecipeIngredients,
  carousel } from '../services';

const SIX = 6;

export default function RecipeDetails({ history, match: { params: { id }, url } }) {
  const [recipe, setRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState({});
  const [loading, setLoading] = useState(true);

  const splitUrl = useCallback(() => url.split('/'), [url]);
  const ask = splitUrl();
  const key = ask[1];
  const recipeIsMeal = (key === 'meals');

  const nameKey = `str${key[0].toUpperCase()}${key.slice(1, key.length - 1)}`;
  const imgSrcKey = `${nameKey}Thumb`;
  const position = ['-0%', '-100%', '-200%', '-300%', '-400%', '-500%'];
  const [carouselIndex, setCarouselIndex] = useState(0);

  let lookUp;
  let search;
  let recipeId;
  let carouselKey;

  if (recipeIsMeal) {
    lookUp = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    search = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    recipeId = recipe.idMeal;
    carouselKey = 'drinks';
  } else {
    lookUp = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    search = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    recipeId = recipe.idDrink;
    carouselKey = 'meals';
  }

  useEffect(() => {
    fetch(lookUp)
      .then((response) => response.json())
      .then((data) => setRecipe(data[key][0]));

    fetch(search)
      .then((response) => response.json())
      .then((data) => setRecomendations(data[carouselKey].slice(0, SIX)));

    if (!objectIsEmpty(recipe)) setLoading(false);
  }, [lookUp, key, search, carouselKey, recipe]);

  const { ingredients, measures } = getRecipeIngredients(recipe);

  const handleStartButton = ({ target }) => {
    switch (target.id) {
    case 'start-recipe':
      history.push(`${url}/in-progress`);
      break;
    default:
      break;
    }
  };

  const moveCarousel = ({ target }) => {
    const carouselIndexResponse = carousel(target, carouselIndex, recomendations);
    setCarouselIndex(carouselIndexResponse);
  };

  const commendButton = isRecipeInProgressInLocalStorage(recipeId, ask);
  const recipeIsDone = isRecipeDoneInLocalStorage(recipeId);

  const carouselTitleKey = `str${carouselKey[0]
    .toUpperCase()}${carouselKey.slice(1, carouselKey.length - 1)}`;
  const carouselImgKey = `${carouselTitleKey}Thumb`;

  return (
    (loading) ? (<span>Loading...</span>) : (
      <section className="recipe-details-container">
        <InputImg
          recipe={ recipe }
          ask={ ask }
          nameKey={ nameKey }
          imgKeys={ [imgSrcKey, nameKey] }
        />
        <img
          data-testid="recipe-photo"
          className="recipe-photo"
          src={ recipe[imgSrcKey] }
          alt={ recipe[nameKey] }
        />
        <h1
          data-testid="recipe-title"
          className="recipe-title"
        >
          {recipe[nameKey]}
        </h1>
        <p
          data-testid="recipe-category"
          className="recipe-category"
        >
          {recipe[recipeIsMeal ? 'strCategory' : 'strAlcoholic']}
        </p>
        <ol>
          {ingredients.map((each, index) => (
            (each !== '' && each !== null) && (
              <li
                key={ `strIngredient${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
                className="ingredient-name-and-measure"
              >
                {`${each} - ${measures[index] ?? ''}`}
              </li>
            )))}
        </ol>
        <p
          data-testid="instructions"
          className="instructions"
        >
          {recipe.strInstructions}
        </p>
        <section className="recipe-video">
          {recipeIsMeal && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={
                recipe.strYoutube
                  ? recipe.strYoutube.replace('watch?v=', 'embed/')
                  : ''
              }
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
            />)}
        </section>
        <div className="carousel-container">
          <button
            className="recomendation-btn"
            type="button"
            id="lesserThan"
            onClick={ (evt) => moveCarousel(evt) }
          >
            &lt;
          </button>
          <div className="carousel">
            {recomendations.length > 0 && (
              recomendations
                .map((each, index) => (
                  <div
                    data-testid={ `${index}-recommendation-card` }
                    key={ `${index}${each[`str${carouselKey}`]}` }
                    className="inner"
                    style={ { transform: `translateX(${position[carouselIndex]})` } }
                  >
                    <img
                      className="carousel-item-img"
                      src={ each[carouselImgKey] }
                      alt={ each[`str${carouselKey}`] }
                    />
                    <span
                      data-testid={ `${index}-recommendation-title` }
                      className="recommendation-title"
                    >
                      {each[carouselTitleKey]}
                    </span>
                  </div>
                )))}
          </div>
          <button
            className="recomendation-btn"
            type="button"
            id="greaterThan"
            onClick={ (evt) => moveCarousel(evt) }
          >
            &gt;
          </button>
        </div>
        { (recipeIsDone) || (
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            id="start-recipe"
            type="button"
            onClick={ (evt) => handleStartButton(evt) }
          >
            {commendButton ? 'Start Recipe' : 'Continue Recipe'}
          </button>)}
      </section>
    ));
}

RecipeDetails.propTypes = PropTypes.shape({}).isRequired;
