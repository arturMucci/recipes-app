import React, { useContext, useEffect } from 'react';
import RecipesProvider from '../context/RecipesProvider';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

const doze = 12;
function Recipes() {
  const { recipesFood, setTitle } = useContext(RecipesProvider);

  useEffect(() => {
    setTitle('Meals');
  }, [setTitle]);

  return (
    <div>
      { recipesFood.map((recipe, index) => (
        index < doze && (
          <RecipeCard
            key={ recipe.idMeal }
            recipe={ recipe }
            index={ index }
            literal="Meal"
          />
        )
      )) }
      <Footer />
    </div>
  );
}

export default Recipes;
