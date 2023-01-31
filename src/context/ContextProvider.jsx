import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesProvider from './RecipesProvider';

export function ContextProvider({ children }) {
  const [path, setPath] = useState('/drinks');
  const [recipesFood, setRecipesFood] = useState([]);
  const [recipesDrink, setRecipesDrink] = useState([]);
  const [title, setTitle] = useState('');
  const [listFood, setListFood] = useState([]);
  const [listDrink, setListDrink] = useState([]);
  const [filterDrink, setFilterDrink] = useState([]);
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
      .then((data) => {
        setRecipesFood(data.meals);
      });
  };

  const fetchDrink = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    await fetch(url)
      .then((e) => e.json())
      .then((data) => {
        setRecipesDrink(data.drinks);
      });
  };

  const fetchListFood = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    await fetch(url)
      .then((e) => e.json())
      .then((data) => setListFood(data.meals));
  };

  const fetchListDrink = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    await fetch(url)
      .then((e) => e.json())
      .then((data) => setListDrink(data.drinks));
  };

  useEffect(() => {
    fetchFood();
    fetchDrink();
    fetchListFood();
    fetchListDrink();
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
      setRecipesDrink,
      listDrink,
      listFood,
      filterDrink,
      setFilterDrink,
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
      setRecipesDrink,
      listDrink,
      listFood,
      filterDrink,
      setFilterDrink,
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
