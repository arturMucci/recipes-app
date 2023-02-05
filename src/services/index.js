export const objectIsEmpty = (object) => Object.entries(object).length === 0;

export const isRecipeInProgress = (recipeId, inProgressRecipesArray) => (
  (!objectIsEmpty(inProgressRecipesArray))
    ? inProgressRecipesArray.some((savedRecipe) => savedRecipe.id === recipeId)
    : false
);
