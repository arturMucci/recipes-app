import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesProvider from '../context/RecipesProvider';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoryFood from '../components/ButtonCategoryFood';
import '../styles/Recipes.css';

const doze = 12;
const cinco = 5;
function Recipes({ match: { url } }) {
  const {
    recipesFood,
    listFood,
    setRecipesFood,
    setTitle,
  } = useContext(RecipesProvider);

  const [test, setTest] = useState(true);

  useEffect(() => {
    setTitle('Meals');
  }, [setTitle]);

  const fetchFilterFood = async (category) => {
    const endereco = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    await fetch(endereco)
      .then((e) => e.json())
      .then((data) => {
        setRecipesFood(data.meals);
        setTest(false);
      });
  };

  const fetchFood = async () => {
    const endereco = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    await fetch(endereco)
      .then((e) => e.json())
      .then((data) => {
        setRecipesFood(data.meals);
        setTest(true);
      });
  };

  return (
    <div className="recipes-container">
      { recipesFood.map((recipe, index) => (
        index < doze && (

          <NavLink
            key={ recipe.idMeal }
            to={ `meals/${recipe.idMeal}` }
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
        { listFood.map((category, index) => (
          index < cinco && (
            <ButtonCategoryFood
              key={ category.strCategory }
              category={ category.strCategory }
              fetchFilterFood={ test ? fetchFilterFood : fetchFood }
            />
          )
        )) }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => fetchFood() }
        >
          All
        </button>
      </div>
    </div>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
