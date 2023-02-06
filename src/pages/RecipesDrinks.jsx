import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesProvider from '../context/RecipesProvider';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoryDrink from '../components/ButtonCategoryDrink';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AllLogo from '../images/AllDrinksLogo.svg';
import '../styles/RecipesDrinks.css';

const doze = 12;
const cinco = 5;

function RecipesDrinks({ match: { url } }) {
  const {
    recipesDrink,
    listDrink,
    setRecipesDrink,
    fetchDrink,
    fetchListDrink } = useContext(RecipesProvider);

  const [isFiltered, setIsFiltered] = useState(true);

  const { setTitle } = useContext(RecipesProvider);
  useEffect(() => {
    setTitle('Drinks');
  }, [setTitle]);

  const fetchFilterDrink = async (category) => {
    const endereco = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    await fetch(endereco)
      .then((e) => e.json())
      .then((data) => {
        setRecipesDrink(data.drinks);
        setIsFiltered(false);
      });
  };

  const fetchDrink2 = async () => {
    const endereco = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    await fetch(endereco)
      .then((e) => e.json())
      .then((data) => setRecipesDrink(data.drinks));
    setIsFiltered(true);
  };

  useEffect(() => {
    fetchDrink();
    fetchListDrink();
  }, [fetchDrink, fetchListDrink]);

  return (
    <div className="recipes-page-container">
      <Header />
      <div className="category-container">
        { listDrink.map((category, index) => (
          index < cinco && (
            <ButtonCategoryDrink
              key={ category.strCategory }
              category={ category.strCategory }
              fetchFilterDrink={ isFiltered ? fetchFilterDrink : fetchDrink2 }
            />
          )
        )) }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => fetchFood2() }
          style={ { backgroundColor: 'inherit', border: 'none' } }
        >
          <img src={ AllLogo } alt="AllLogo" />
        </button>
      </div>
      <div className="recipes-container">
        { recipesDrink.map((recipe, index) => (
          index < doze && (
            <NavLink
              className="recipe-card-link"
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
      </div>
      <Footer />
    </div>
  );
}

RecipesDrinks.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesDrinks;
