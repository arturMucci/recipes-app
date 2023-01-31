import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesProvider from '../context/RecipesProvider';
import '../styles/RecipeDetails.css';
import InputImg from '../components/InputImg';

const SIX = 6;

// {
//   id,
//   type: ask[1],
//   nationality: recipe.strArea,
//   category: recipe[ask[1] === 'meals' ? 'strCategory' : 'strAlcoholic'],
//   alcoholicOrNot: ask[1] === 'meals' ? '' : recipe.strAlcoholic,
//   name: recipe[nameKey],
//   image: [
//     recipe[imgSrcKey],
//     recipe[imgAltKey],
//   ],
// },

export default function RecipeDetails({ history, match: { params: { id }, url } }) {
  const {
    inProgressRecipes,
    setInProgressRecipes,
    doneRecipes,
  } = useContext(RecipesProvider);

  const [recipe, setRecipe] = useState(null);
  const [recomendations, setRecomendations] = useState({});

  const splitUrl = useCallback(() => url.split('/'), [url]);
  const ask = splitUrl();
  const key = ask[1];

  const nameKey = `str${key[0].toUpperCase()}${key.slice(1, key.length - 1)}`;
  const imgSrcKey = `str${key[0].toUpperCase()}${key.slice(1, key.length - 1)}Thumb`;
  const imgAltKey = `str${key[0].toUpperCase()}${key.slice(1, key.length - 1)}`;

  const commendButton = !Object.keys(inProgressRecipes[key]).includes(id);

  const carouselKey = ask[1] === 'meals' ? 'drinks' : 'meals';
  const carouselImgKey = `str${carouselKey[0]
    .toUpperCase()}${carouselKey.slice(1, carouselKey.length - 1)}Thumb`;
  const position = ['-0%', '-100%', '-200%', '-300%', '-400%', '-500%'];
  const [carouselIndex, setCarouselIndex] = useState(0);

  const lookUp = ask[1] === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const search = ask[1] === 'meals'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const carouselTitleKey = `str${carouselKey[0]
    .toUpperCase()}${carouselKey
    .slice(1, carouselKey.length - 1)}`;

  useEffect(() => {
    fetch(lookUp)
      .then((response) => response.json())
      .then((data) => setRecipe(data[key][0]));

    fetch(search)
      .then((response) => response.json())
      .then((data) => setRecomendations(data[carouselKey].slice(0, SIX)));
  }, [lookUp, key, search, carouselKey]);

  if (!recipe) {
    return <span>Loading...</span>;
  }

  const handleStartButton = ({ target }) => {
    const newKey = {
      ...inProgressRecipes,
      [key]: {
        ...inProgressRecipes[key],
        [id]: [],
      },
    };

    switch (target.id) {
    case 'start-recipe':
      setInProgressRecipes(newKey);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newKey));
      history.push(`${url}/in-progress`);
      break;
    default:
      break;
    }
  };

  const ingredients = Object.entries(recipe)
    .filter((each) => each[0].includes('strIngredient'))
    .map((each) => each[1]);
  const measure = Object.entries(recipe)
    .filter((each) => each[0].includes('strMeasure'))
    .map((each) => each[1]);

  const moveCarousel = ({ target }) => {
    switch (target.id) {
    case 'lesserThan':
      setCarouselIndex(
        carouselIndex > 0
          ? carouselIndex - 2
          : recomendations.length - 2,
      );
      break;
    case 'greaterThan':
      setCarouselIndex(
        carouselIndex < recomendations.length - 2
          ? carouselIndex + 2
          : 0,
      );
      break;
    default:
      break;
    }
  };

  return (
    <section
      className="recipe-details-container"
    >
      <InputImg url={ url } />
      <img
        data-testid="recipe-photo"
        className="recipe-photo"
        src={
          recipe[imgSrcKey]
        }
        alt={ recipe[imgAltKey] }
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
        {recipe[ask[1] === 'meals' ? 'strCategory' : 'strAlcoholic']}
      </p>
      <ol>
        {
          ingredients.map((each, index) => (
            (each !== '' && each !== null) && (
              <li
                key={ `strIngredient${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
                className="ingredient-name-and-measure"
              >
                {`${each} - ${measure[index] ?? ''}`}
              </li>
            )
          ))
        }
      </ol>
      <p
        data-testid="instructions"
        className="instructions"
      >
        {recipe.strInstructions}
      </p>
      <section className="recipe-video">
        {
          ask[1] === 'meals' && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ `${recipe.strYoutube.replace('watch?v=', 'embed/')}` }
              title="YouTube video player"
              allow="accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;"
              allowFullScreen
            />
          )
        }
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
          {
            recomendations.length > 0
              && (
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
                  ))
              )
          }
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
      {Object.keys(doneRecipes).includes(id) || (
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          id="start-recipe"
          type="button"
          onClick={ (evt) => handleStartButton(evt) }
        >
          {commendButton ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}
    </section>
  );
}

RecipeDetails.propTypes = PropTypes.shape({}).isRequired;
