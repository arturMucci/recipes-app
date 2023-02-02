import React, { useContext, useEffect } from 'react';
import RecipesProvider from '../context/RecipesProvider';
import Header from '../components/Header';

function FavoriteRecipes() {
  const { setTitle } = useContext(RecipesProvider);
  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default FavoriteRecipes;
