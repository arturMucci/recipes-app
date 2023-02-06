import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeInProgress.css';
import RecipesProvider from '../context/RecipesProvider';
import {
  arrayIsEmpty,
  objectIsEmpty,
  getRecipeIngredients,
  isRecipeInProgressInLocalStorage,
} from '../services';

export default function IngredientsCheckboxes(
  {
    recipe,
    recipeIsMeal,
    markedCheckboxesVerification,
    checkIfRecipeIsAlreadyInProgress,
  },
) {
  const [recipeIngredients, setRecipeIngredients] = useState({});

  const { setInProgressRecipes } = useContext(RecipesProvider);

  useEffect(() => {
    const recipeIngredientsObj = getRecipeIngredients(recipe);
    setRecipeIngredients(recipeIngredientsObj);
  }, [recipe]);

  const saveMealProgress = (checkedIngredientsIds, inProgressRecipes) => {
    const inProgressRecipeObject = {
      id: recipe.idMeal,
      checkedIngredientsIds,
    };
    let localStorageMeals;
    let localStorageDrinks;

    if (inProgressRecipes === null) {
      localStorageMeals = [];
      localStorageDrinks = [];
    } else {
      localStorageMeals = inProgressRecipes.meals;
      localStorageDrinks = (
        arrayIsEmpty(inProgressRecipes.drinks)
          ? []
          : inProgressRecipes.drinks
      );
    }

    let inProgressMeals = {};

    if (arrayIsEmpty(localStorageMeals)) {
      inProgressMeals = {
        drinks: [...localStorageDrinks],
        meals: [
          inProgressRecipeObject,
        ],
      };
    } else if (!(isRecipeInProgressInLocalStorage(recipe.idMeal, 'meals'))) {
      inProgressMeals = {
        drinks: [...localStorageDrinks],
        meals: [
          ...localStorageMeals,
          inProgressRecipeObject,
        ],
      };
    } else {
      const filteredMeals = localStorageMeals
        .filter((inProgressRecipe) => inProgressRecipe.id !== recipe.idMeal);
      inProgressMeals = {
        drinks: [...localStorageDrinks],
        meals: [
          ...filteredMeals,
          inProgressRecipeObject,
        ],
      };
    }
    const inProgressMealsJSON = JSON.stringify(inProgressMeals);
    localStorage.setItem('inProgressRecipes', inProgressMealsJSON);
    setInProgressRecipes(inProgressMeals);
  };

  const saveDrinkProgress = (checkedIngredientsIds, inProgressRecipes) => {
    const inProgressRecipeObject = {
      id: recipe.idDrink,
      checkedIngredientsIds,
    };
    let localStorageMeals;
    let localStorageDrinks;

    if (inProgressRecipes === null) {
      localStorageMeals = [];
      localStorageDrinks = [];
    } else {
      localStorageMeals = (
        arrayIsEmpty(inProgressRecipes.meals)
          ? []
          : inProgressRecipes.meals
      );
      localStorageDrinks = inProgressRecipes.drinks;
    }

    let inProgressDrinks = {};

    if (arrayIsEmpty(localStorageDrinks)) {
      inProgressDrinks = {
        drinks: [
          inProgressRecipeObject,
        ],
        meals: [...localStorageMeals],
      };
    } else if (!isRecipeInProgressInLocalStorage(recipe.idDrink, 'drinks')) {
      inProgressDrinks = {
        drinks: [
          ...localStorageDrinks,
          inProgressRecipeObject,
        ],
        meals: [...localStorageMeals],
      };
    } else {
      const filteredDrinks = localStorageDrinks
        .filter((inProgressRecipe) => inProgressRecipe.id !== recipe.idDrink);
      inProgressDrinks = {
        drinks: [
          ...filteredDrinks,
          inProgressRecipeObject,
        ],
        meals: [...localStorageMeals],
      };
    }
    const inProgressDrinksJSON = JSON.stringify(inProgressDrinks);
    localStorage.setItem('inProgressRecipes', inProgressDrinksJSON);
    setInProgressRecipes(inProgressDrinks);
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
