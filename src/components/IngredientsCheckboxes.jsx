import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeInProgress.css';

export default function IngredientsCheckboxes(
  {
    recipe,
    recipeIsMeal,
    markedCheckboxesVerification,
    isRecipeInProgress,
    objectIsEmpty,
    checkIfRecipeIsAlreadyInProgress,
  },
) {
  const [recipeIngredients, setRecipeIngredients] = useState({});

  const getRecipeIngredients = () => {
    const ingredients = Object.entries(recipe)
      .filter((ingredient) => ingredient[0].includes('strIngredient'))
      .map((ingredient) => ingredient[1]);

    const measures = Object.entries(recipe)
      .filter((measure) => measure[0].includes('strMeasure'))
      .map((measure) => measure[1]);

    setRecipeIngredients({ ingredients, measures });
  };

  useEffect(getRecipeIngredients, [recipe]);

  const saveMealProgress = (checkedIngredientsIds, inProgressRecipes) => {
    const inProgressRecipeObject = {
      id: recipe.idMeal,
      checkedIngredientsIds,
    };

    const localStorageMeals = inProgressRecipes.meals;
    const localStorageDrinks = (objectIsEmpty(inProgressRecipes.drinks)
      ? []
      : inProgressRecipes.drinks);

    let inProgressMeals = {};

    if (objectIsEmpty(localStorageMeals)) {
      inProgressMeals = (JSON.stringify({
        drinks: [...localStorageDrinks],
        meals: [
          inProgressRecipeObject,
        ],
      }));
    } else if (!isRecipeInProgress(recipe.idMeal, localStorageMeals)) {
      inProgressMeals = (JSON.stringify({
        drinks: [...localStorageDrinks],
        meals: [
          ...localStorageMeals,
          inProgressRecipeObject,
        ],
      }));
    } else {
      const filteredMeals = localStorageMeals
        .filter((inProgressRecipe) => inProgressRecipe.id !== recipe.idMeal);

      inProgressMeals = (JSON.stringify({
        drinks: [...localStorageDrinks],
        meals: [
          ...filteredMeals,
          inProgressRecipeObject,
        ],
      }));
    }

    localStorage.setItem('inProgressRecipes', inProgressMeals);
  };

  const saveDrinkProgress = (checkedIngredientsIds, inProgressRecipes) => {
    const inProgressRecipeObject = {
      id: recipe.idDrink,
      checkedIngredientsIds,
    };

    const localStorageMeals = (objectIsEmpty(inProgressRecipes.meals)
      ? []
      : inProgressRecipes.meals);
    const localStorageDrinks = inProgressRecipes.drinks;

    let inProgressDrinks = {};

    if (objectIsEmpty(localStorageDrinks)) {
      inProgressDrinks = (JSON.stringify({
        drinks: [
          inProgressRecipeObject,
        ],
        meals: [...localStorageMeals],
      }));
    } else if (!isRecipeInProgress(recipe.idDrink, localStorageDrinks)) {
      inProgressDrinks = (JSON.stringify({
        drinks: [
          ...localStorageDrinks,
          inProgressRecipeObject,
        ],
        meals: [...localStorageMeals],
      }));
    } else {
      const filteredDrinks = localStorageDrinks
        .filter((inProgressRecipe) => inProgressRecipe.id !== recipe.idDrink);

      inProgressDrinks = (JSON.stringify({
        drinks: [
          ...filteredDrinks,
          inProgressRecipeObject,
        ],
        meals: [...localStorageMeals],
      }));
    }

    localStorage.setItem('inProgressRecipes', inProgressDrinks);
  };

  const saveProgressToLocalStorage = () => {
    const checkedCheckboxes = document.getElementsByClassName('done-step');
    const checkedIngredientsIds = Array.from(checkedCheckboxes)
      .map((checkbox) => checkbox.id);
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (recipeIsMeal) saveMealProgress(checkedIngredientsIds, inProgressRecipes);
    else saveDrinkProgress(checkedIngredientsIds, inProgressRecipes);
  };

  const handleChangeIngredientCheckbox = ({ target }) => {
    const ingredientLabel = document.getElementById(`${target.id}-label`);

    if (target.checked) {
      ingredientLabel.classList.add('done-step');
    } else {
      ingredientLabel.classList.remove('done-step');
    }

    saveProgressToLocalStorage();
    markedCheckboxesVerification();
  };

  useEffect(checkIfRecipeIsAlreadyInProgress);

  return (
    <div>
      {
        (!objectIsEmpty(recipeIngredients))
          && recipeIngredients.ingredients.map((ingredient, index) => (
            (ingredient !== '' && ingredient !== null) && (
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `${index}-ingredient` }
                id={ `${index}-ingredient-label` }
                key={ index }
              >
                <input
                  type="checkbox"
                  id={ `${index}-ingredient` }
                  onChange={ handleChangeIngredientCheckbox }
                />
                {
                  (recipeIngredients.measures[index] !== '')
                  && (recipeIngredients.measures[index] !== null)
                    ? `${recipeIngredients.measures[index]} ${ingredient}`
                    : `${ingredient}`
                }
              </label>
            )
          ))
      }
    </div>
  );
}

IngredientsCheckboxes.propTypes = PropTypes.shape({}).isRequired;
