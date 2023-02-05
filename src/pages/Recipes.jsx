import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesProvider from '../context/RecipesProvider';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoryFood from '../components/ButtonCategoryFood';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Recipes.css';

const doze = 12;
const cinco = 5;
function Recipes({ match: { url } }) {
  const {
    recipesFood,
    listFood,
    setRecipesFood,
    setTitle,
    fetchFood,
    fetchListFood,
  } = useContext(RecipesProvider);

  const [test, setTest] = useState(true);

  useEffect(() => {
    setTitle('Meals');
  }, [setTitle]);

  useEffect(() => {
    fetchFood();
    fetchListFood();
  }, [fetchFood, fetchListFood]);

  const fetchFilterFood = async (category) => {
    const endereco = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    await fetch(endereco)
      .then((e) => e.json())
      .then((data) => {
        setRecipesFood(data.meals);
        setTest(false);
      });
  };

  const fetchFood2 = async () => {
    const endereco = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    await fetch(endereco)
      .then((e) => e.json())
      .then((data) => {
        setRecipesFood(data.meals);
        setTest(true);
      });
  };

  useEffect(() => {
    fetchFood();
    fetchListFood();
  }, [fetchFood, fetchListFood]);

  return (
    <div className="recipes-container">
      <Header />
      <div className="filter-container">
        { listFood.map((category, index) => (
          index < cinco && (
            <ButtonCategoryFood
              key={ category.strCategory }
              category={ category.strCategory }
              fetchFilterFood={ test ? fetchFilterFood : fetchFood2 }
            />
          )
        )) }
        <button
          type="button"
          data-testid="All-category-filter"
          className="category-btn"
          onClick={ () => fetchFood2() }
        >
          All
        </button>
      </div>
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
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
