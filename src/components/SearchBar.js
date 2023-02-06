import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesProvider from '../context/RecipesProvider';
import { infoDrink } from '../services/drinksAPI';
import { infoFood } from '../services/foodAPI';

const NO_RECIPES = 'Sorry, we haven\'t found any recipes for these filters.';
export const ONE_CHARACTER = 'Your search must have only 1 (one) character';

function SearchBar(props) {
  const history = useHistory();
  const { pageTitle } = props;
  const { searching, setRecipesFood, setRecipesDrink } = useContext(RecipesProvider);
  const [search, setSearch] = useState({ searchFilter: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearch({ ...search, [name]: value });
  };

  const handleClick = async () => {
    const { searchFilter } = search;
    if (searchFilter === 'firstLetter'
    && searching.value.length > 1) {
      global.alert(ONE_CHARACTER);
    }
    switch (pageTitle) {
    case 'Meals': {
      const fetchedMeals = await infoFood({
        key: searchFilter,
        search: searching.value,
      });
      // console.log(fetchedMeals.meals);
      setRecipesFood(fetchedMeals.meals);
      if (fetchedMeals.meals) {
        const recipesQuantity = Object.keys(fetchedMeals.meals);
        const recipes = Object.values(fetchedMeals.meals);
        const oneMeal = recipesQuantity.length === 1;
        if (oneMeal) history.push(`/meals/${recipes[0].idMeal}`);
      } else {
        global.alert(NO_RECIPES);
      }
    }
      break;

    case 'Drinks': {
      const fetchedDrinks = await infoDrink({
        key: searchFilter,
        search: searching.value,
      });
      setRecipesDrink(fetchedDrinks.drinks);
      if (fetchedDrinks.drinks) {
        const recipesQuantity = Object.keys(fetchedDrinks.drinks);
        const recipes = Object.values(fetchedDrinks.drinks);
        const oneDrink = recipesQuantity.length === 1;
        if (oneDrink) history.push(`/drinks/${recipes[0].idDrink}`);
      } else {
        global.alert(NO_RECIPES);
      }
    }
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            onClick={ handleChange }
            value="ingredient"
            name="searchFilter"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            onClick={ handleChange }
            value="name"
            name="searchFilter"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="firstLetter">
          First Letter
          <input
            type="radio"
            onClick={ handleChange }
            value="firstLetter"
            name="searchFilter"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        SEARCH

      </button>
    </div>
  );
}

export default SearchBar;
