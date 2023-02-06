import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import InputImg from '../components/InputImg';
import '../styles/RecipeInProgress.css';
import ButtonFinishRecipe from '../components/ButtonFinishRecipe';
import IngredientsCheckboxes from '../components/IngredientsCheckboxes';
import {
  isRecipeInProgress,
  checkInProgressIngredients,
  objectIsEmpty,
} from '../services';

export default function RecipeInProgress({ match: { params: { id }, url } }) {
  const [recipe, setRecipe] = useState({});
  const [disableFinishRecipeButton, setDisableFinishRecipeButton] = useState(true);
  const [loading, setLoading] = useState(true);

  const getRecipeType = useCallback(() => {
    const splitUrl = url.split('/');
    return (splitUrl[1]);
  }, [url]);

  const recipeType = getRecipeType();
  const recipeIsMeal = (recipeType === 'meals');

  const endpoint = (recipeIsMeal)
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setRecipe(data[recipeType][0]));

    if (!objectIsEmpty(recipe)) setLoading(false);
  }, [endpoint, recipeType, recipe]);

  const checkIfRecipeIsAlreadyInProgress = useCallback(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    let recipeId;
    let localStorageRecipes;

    if (inProgressRecipes !== null) {
      if (recipeIsMeal) {
        recipeId = recipe.idMeal;
        localStorageRecipes = inProgressRecipes.meals;
      } else {
        recipeId = recipe.idDrink;
        localStorageRecipes = inProgressRecipes.drinks;
      }

      if (isRecipeInProgress(recipeId, localStorageRecipes)) {
        const { checkedIngredientsIds } = localStorageRecipes.find(
          (localStorageRecipe) => localStorageRecipe.id === recipeId,
        );

        checkInProgressIngredients(checkedIngredientsIds);
      }
    }
  }, [recipeIsMeal, recipe.idMeal, recipe.idDrink]);

  const markedCheckboxesVerification = () => {
    const ingredientsCheckboxes = document.getElementsByTagName('label');
    const checkedIngredients = document.getElementsByClassName('done-step');
    const finishedRecipe = (ingredientsCheckboxes.length === checkedIngredients.length);
    setDisableFinishRecipeButton(!finishedRecipe);
  };

  const nameKey = `str${recipeType[0]
    .toUpperCase()}${recipeType.slice(1, recipeType.length - 1)}`;
  const imgSrcKey = `${nameKey}Thumb`;

  return (
    (loading)
      ? (
        <div>
          <p>Loading...</p>
        </div>
      )
      : (
        <div>
          <fieldset>
            <legend>Recipe In Progress</legend>
            <InputImg
              recipe={ recipe }
              ask={ recipeType }
              nameKey={ nameKey }
              imgKeys={ [imgSrcKey, nameKey] }
            />
            <img
              src={ recipe[imgSrcKey] }
              alt=""
              data-testid="recipe-photo"
              className="recipe-photo"
            />
            <h1
              data-testid="recipe-title"
            >
              { recipe[nameKey] }
            </h1>
            <h2
              data-testid="recipe-category"
            >
              { recipe.strCategory }
            </h2>
            <IngredientsCheckboxes
              recipe={ recipe }
              recipeIsMeal={ recipeIsMeal }
              markedCheckboxesVerification={ markedCheckboxesVerification }
              isRecipeInProgress={ isRecipeInProgress }
              checkIfRecipeIsAlreadyInProgress={ checkIfRecipeIsAlreadyInProgress }
            />
            <div
              data-testid="instructions"
            >
              { recipe.strInstructions }
            </div>
            <ButtonFinishRecipe
              recipe={ recipe }
              disabled={ disableFinishRecipeButton }
              recipeIsMeal={ recipeIsMeal }
            />
          </fieldset>
        </div>
      )
  );
}

RecipeInProgress.propTypes = PropTypes.shape({}).isRequired;
