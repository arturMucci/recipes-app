import React, { useContext, useEffect, useState, useCallback } from 'react';
import RecipesProvider from '../context/RecipesProvider';
import Header from '../components/Header';
import Button from '../components/Button';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const { setTitle } = useContext(RecipesProvider);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipeType, setRecipeType] = useState('all');

  useEffect(() => {
    setTitle('Done Recipes');
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
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes) filterRecipes(recipes);
  }, [filterRecipes]);

  return (
    <div>
      <Header />
      <section>
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
      </section>
      {filteredRecipes.map((eachRecipe, index) => (
        <DoneRecipeCard
          key={ `done-recipe-${index}` }
          index={ index }
          data={ eachRecipe }
        />
      ))}
    </div>
  );
}

export default DoneRecipes;
