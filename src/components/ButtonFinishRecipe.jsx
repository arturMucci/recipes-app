import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/RecipeInProgress.css';

export default function ButtonFinishRecipe({ recipe, disabled, recipeIsMeal }) {
  const history = useHistory();

  const setDoneRecipeTemplate = () => (
    (recipeIsMeal)
      ? {
        id: recipe.idMeal,
        nationality: recipe.strArea,
        name: recipe.strMeal,
        category: recipe.strCategory,
        image: recipe.strMealThumb,
        tags: (recipe.strTags !== null) ? recipe.strTags.split(',') : [],
        alcoholicOrNot: '',
        type: 'meal',
        doneDate: new Date(),
      }
      : {
        id: recipe.idDrink,
        nationality: '',
        name: recipe.strDrink,
        category: recipe.strCategory,
        image: recipe.strDrinkThumb,
        tags: (recipe.strTags !== null) ? recipe.strTags.split(',') : [],
        alcoholicOrNot: recipe.strAlcoholic,
        type: 'drink',
        doneDate: new Date(),
      });

  const isRecipeDone = (recipeId, doneRecipesArray) => (
    doneRecipesArray.some((doneRecipe) => doneRecipe.id === recipeId)
  );

  const saveDoneRecipeToLocalStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipeObject = setDoneRecipeTemplate();
    const recipeId = (recipeIsMeal) ? recipe.idMeal : recipe.idDrink;

    let doneRecipe = [];

    //  se o objeto estiver vazio: add a receita atual
    //  se o objeto tiver itens: checar se a receita atual está
    //    se a receita atual não estiver: add a receita atual
    //    se a receita atual estiver: n faz nada

    if (doneRecipes === null) {
      doneRecipe = JSON.stringify([recipeObject]);
    } else if (!isRecipeDone(recipeId, doneRecipes)) {
      doneRecipe = JSON.stringify([...doneRecipes, recipeObject]);
    } else {
      doneRecipe = JSON.stringify([...doneRecipes]);
    }

    localStorage.setItem('doneRecipes', doneRecipe);
  };

  const handleClickFinishRecipeButton = () => {
    saveDoneRecipeToLocalStorage();
    history.push('/done-recipes');
  };

  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ disabled }
      onClick={ handleClickFinishRecipeButton }
    >
      finalizar receita
    </button>
  );
}

ButtonFinishRecipe.propTypes = PropTypes.shape({}).isRequired;
