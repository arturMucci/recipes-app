export const objectIsEmpty = (object) => Object.entries(object).length === 0;

export const arrayIsEmpty = (array) => (array) && array.length === 0;

export const isRecipeInProgress = (recipeId, inProgressRecipesArray) => (
  (inProgressRecipesArray)
    ? inProgressRecipesArray.some((savedRecipe) => savedRecipe.id === recipeId)
    : false
);

export const isRecipeDone = (recipeId, doneRecipesArray) => (
  doneRecipesArray.some((doneRecipe) => doneRecipe.id === recipeId)
);

export const checkInProgressIngredients = (checkedIngredientsIds) => {
  checkedIngredientsIds.forEach((ingredientId) => {
    if (document.getElementById(ingredientId) !== null) {
      document.getElementById(ingredientId).classList.add('done-step');
      document.getElementById(ingredientId).firstChild.checked = true;
    }
  });
};

export const getRecipeIngredients = (recipe) => {
  const ingredients = Object.entries(recipe)
    .filter((ingredient) => ingredient[0].includes('strIngredient'))
    .map((ingredient) => ingredient[1]);

  const measures = Object.entries(recipe)
    .filter((measure) => measure[0].includes('strMeasure'))
    .map((measure) => measure[1]);

  return { ingredients, measures };
};

export const carousel = (target, carouselIndex, recomendations) => {
  switch (target.id) {
  case 'lesserThan':
    return carouselIndex > 0 ? carouselIndex - 2 : recomendations.length - 2;
  case 'greaterThan':
    return carouselIndex < recomendations.length - 2 ? carouselIndex + 2 : 0;
  default:
    break;
  }
};

export const isRecipeInProgressInLocalStorage = (recipeId, recipeType) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  let inProgressArray = [];

  if (inProgressRecipes !== null) {
    inProgressArray = inProgressRecipes[recipeType];
  }

  return isRecipeInProgress(recipeId, inProgressArray);
};

export const isRecipeDoneInLocalStorage = (recipeId) => {
  const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  let doneArray = [];

  if (doneRecipesLocalStorage !== null) {
    doneArray = doneRecipesLocalStorage;
  }

  return isRecipeDone(recipeId, doneArray);
};
