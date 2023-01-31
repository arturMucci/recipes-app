import React, { useContext, useEffect } from 'react';
import RecipesProvider from '../context/RecipesProvider';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

const doze = 12;
export default function RecipiesDrinks() {
  const { recipesDrink, setTitle } = useContext(RecipesProvider);

  useEffect(() => {
    setTitle('Drinks');
  }, [setTitle]);

  return (
    <div>
      {recipesDrink.map((recipe, index) => (
        index < doze && (
          <RecipeCard
            key={ recipe.idDrink }
            recipe={ recipe }
            index={ index }
            literal="Drink"
          />
        )
      ))}
      <Footer />
    </div>
  );
}
