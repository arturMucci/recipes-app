import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Recipes from './pages/Recipes';
import RecipesDrinks from './pages/RecipesDrinks';
import Profile from './pages/Profile';
import { ContextProvider } from './context/ContextProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipesInProgress from './pages/RecipesInProgress';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ RecipesDrinks } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/meals/:id/in-progress" component={ RecipesInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipesInProgress } />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
