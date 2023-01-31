import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesProvider from '../context/RecipesProvider';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoryDrink from '../components/ButtonCategoryDrink';
import '../styles/Recipes.css';

const doze = 12;
const cinco = 5;

function RecipesDrinks({ match: { url } }) {
  const { recipesDrink,
    listDrink,
    setRecipesDrink } = useContext(RecipesProvider);

  const [isFiltered, setIsFiltered] = useState(true);

  const fetchFilterDrink = async (category) => {
    const endereco = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    await fetch(endereco)
      .then((e) => e.json())
      .then((data) => {
        setRecipesDrink(data.drinks);
        setIsFiltered(false);
      });
  };

  const fetchDrink = async () => {
    const endereco = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    await fetch(endereco)
      .then((e) => e.json())
      .then((data) => setRecipesDrink(data.drinks));
    setIsFiltered(true);
  };
  console.log();

  return (
    <div className="recipes-container">
      { recipesDrink.map((recipe, index) => (
        index < doze && (
          <NavLink
            key={ recipe.idDrink }
            to={ `/drinks/${recipe.idDrink}` }
          >
            <RecipeCard
              recipe={ recipe }
              index={ index }
              url={ url }
            />
          </NavLink>
        )
      )) }
      {' '}
      <div>
        { listDrink.map((category, index) => (
          index < cinco && (
            <ButtonCategoryDrink
              key={ category.strCategory }
              category={ category.strCategory }
              fetchFilterDrink={ isFiltered ? fetchFilterDrink : fetchDrink }
            />
          )
        )) }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => fetchDrink() }
        >
          All
        </button>
      </div>
    </div>
  );
}

RecipesDrinks.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesDrinks;
