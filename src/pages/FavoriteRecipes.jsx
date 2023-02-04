import React, { useContext, useEffect, useState, useCallback } from 'react';
import RecipesProvider from '../context/RecipesProvider';
import Header from '../components/Header';
import Button from '../components/Button';
import DoneRecipeCard from '../components/DoneRecipeCard';

function FavoriteRecipes() {
  const { setTitle, favoriteRecipes, setFavoriteRecipes } = useContext(RecipesProvider);

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipeType, setRecipeType] = useState('all');

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);

  const filterRecipes = useCallback((recipes) => {
    if (recipeType === 'all') {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter((recipe) => recipe.type === recipeType));
    }
  }, [recipeType]);

  const handleFilterBtn = ({ target }) => {
    setRecipeType(target.id);
  };

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes) filterRecipes(favoriteRecipes);
  }, [filterRecipes, favoriteRecipes]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) setFavoriteRecipes(storage);
  }, [setFavoriteRecipes]);

  return (
    <div>
      <Header />
      <Button
        value="All"
        id="all"
        testid="filter-by-all-btn"
        handleFilter={ handleFilterBtn }
      />
      <Button
        value="Meals"
        id="meal"
        testid="filter-by-meal-btn"
        handleFilter={ handleFilterBtn }
      />
      <Button
        value="Drinks"
        id="drink"
        testid="filter-by-drink-btn"
        handleFilter={ handleFilterBtn }
      />
      {filteredRecipes.map((eachRecipe, index) => (
        <DoneRecipeCard
          key={ `done-recipe-${index}` }
          index={ index }
          data={ eachRecipe }
          needFavoriteButton
        />
      ))}
    </div>
  );
}

export default FavoriteRecipes;
