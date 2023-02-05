import React, { useContext, useEffect } from 'react';
import RecipesProvider from '../context/RecipesProvider';

function DoneRecipes() {
  const { setTitle } = useContext(RecipesProvider);

  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);

  return (
    <div>DoneRecipes</div>
  );
}

export default DoneRecipes;
