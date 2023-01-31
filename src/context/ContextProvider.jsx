import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesProvider from './RecipesProvider';

export function ContextProvider({ children }) {
  const [path, setPath] = useState('/drinks');
  const [recipesFood, setRecipesFood] = useState([]);
  const [recipesDrink, setRecipesDrink] = useState([]);
  const [title, setTitle] = useState('');
  const [doneRecipes, setDoneRecipes] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const [searching, setSearching] = useState({
    value: '',
    clicked: false,
    done: false,
  });

  const [inProgressRecipes, setInProgressRecipes] = useState({
    meals: {},
    drinks: {},
  });

  const fetchFood = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    await fetch(url)
      .then((e) => e.json())
      .then((data) => setRecipesFood(data.meals));
  };

  const fetchDrink = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    await fetch(url)
      .then((e) => e.json())
      .then((data) => setRecipesDrink(data.drinks));
  };

  useEffect(() => {
    fetchFood();
    fetchDrink();
  }, []);

  useEffect(() => {
    if (!localStorage.inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        drinks: {},
      }));
    } else {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setInProgressRecipes(recipes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  const GLOBAL_CONTEXT = useMemo(
    () => ({
      path,
      setPath,
      title,
      setTitle,
      recipesFood,
      recipesDrink,
      setRecipesFood,
      searching,
      setSearching,
      inProgressRecipes,
      setInProgressRecipes,
      doneRecipes,
      setDoneRecipes,
      isCopied,
      setIsCopied,
      favoriteRecipes,
      setFavoriteRecipes,
    }),
    [
      path,
      setPath,
      title,
      setTitle,
      recipesFood,
      recipesDrink,
      setRecipesFood,
      searching,
      setSearching,
      inProgressRecipes,
      setInProgressRecipes,
      doneRecipes,
      setDoneRecipes,
      isCopied,
      setIsCopied,
      favoriteRecipes,
      setFavoriteRecipes,
    ],
  );

  return (
    <RecipesProvider.Provider value={ GLOBAL_CONTEXT }>
      {children}
    </RecipesProvider.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
