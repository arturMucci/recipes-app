import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import InputImg from '../components/InputImg';
import '../styles/RecipeInProgress.css';
import ButtonFinishRecipe from '../components/ButtonFinishRecipe';
import IngredientsCheckboxes from '../components/IngredientsCheckboxes';
import { objectIsEmpty, isRecipeInProgress } from '../services';

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

    setLoading(false);
  }, [endpoint, recipeType]);

  const checkIfRecipeIsAlreadyInProgress = useCallback(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    let recipeId;
    let localStorageRecipes;

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

      checkedIngredientsIds.forEach((ingredientId) => {
        if (document.getElementById(ingredientId) !== null) {
          document.getElementById(ingredientId).classList.add('done-step');
          document.getElementById(ingredientId).firstChild.checked = true;
        }
      });
    }
  }, [recipeIsMeal, recipe.idMeal, recipe.idDrink]);

  const markedCheckboxesVerification = () => {
    const ingredientsCheckboxes = document.getElementsByTagName('label');
    const checkedIngredients = document.getElementsByClassName('done-step');
    const finishedRecipe = (ingredientsCheckboxes.length === checkedIngredients.length);
    setDisableFinishRecipeButton(!finishedRecipe);
  };

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
            <InputImg />
            <img
              src={ recipeIsMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt=""
              data-testid="recipe-photo"
              className="recipe-photo"
            />
            <h1
              data-testid="recipe-title"
            >
              { recipeIsMeal ? recipe.strMeal : recipe.strDrink }
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
              objectIsEmpty={ objectIsEmpty }
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
