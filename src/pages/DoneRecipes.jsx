import React, { useContext, useEffect } from 'react';
import RecipesProvider from '../context/RecipesProvider';
import Header from '../components/Header';

function DoneRecipes() {
  const { setTitle } = useContext(RecipesProvider);
  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default DoneRecipes;
