import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesProvider from '../context/RecipesProvider';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import MealsPageLogo from '../images/MealsPageLogo.svg';
import DrinksPageLogo from '../images/DrinksPageLogo.svg';
import RecipesAppLogoHeader from '../images/RecipesAppLogoHeader.svg';
import RecipesWord from '../images/RecipesWord.svg';
import AppWord from '../images/AppWord.svg';
import '../styles/Header.css';

function Header() {
  const history = useHistory();
  const { title, searching, setSearching } = useContext(RecipesProvider);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const sendToProfile = () => {
    history.push('/profile');
  };

  const handleClick = () => {
    setSearching((prevState) => ({ ...prevState, clicked: !prevState.clicked }));
  };

  const handleSearch = ({ target }) => {
    setSearching(searching, { value: target.value });
  };

  const { pathname } = history.location;

  let showProfile = true;

  if (
    pathname === '/'
    || pathname.startsWith('/meals/')
    || pathname.startsWith('/drinks/')
    || pathname.startsWith('meals/:id/')
    || pathname.startsWith('drinks/:id/')
  ) {
    showProfile = true;

    return null;
  }

  if (
    pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes'
  ) {
    showProfile = true;
    return (
      <div>
        <div>
          <button type="button" onClick={ sendToProfile }>
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </button>
        </div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
    );
  }

  if (showProfile) {
    return (
      <header>
        <div className="logo-container">
          <section>
            <img
              className="header-recipesApp-logo"
              src={ RecipesAppLogoHeader }
              alt="recipes app logo"
            />
            <div>
              <img
                className="header-recipes-word"
                src={ RecipesWord }
                alt=""
              />
              <img
                className="header-app-word"
                src={ AppWord }
                alt=""
              />
            </div>
          </section>
          <section>
            <button
              className="header-search-btn"
              type="button"
              onClick={ handleClick }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search"
              />
            </button>
            <button
              className="header-profile-btn"
              type="button"
              onClick={ sendToProfile }
            >
              <img
                src={ profileIcon }
                alt="profile"
                data-testid="profile-top-btn"
              />
            </button>
          </section>
        </div>
        <div>
          <section>
            {title === 'Meals'
              ? (
                <img
                  className="page-logo"
                  src={ MealsPageLogo }
                  alt="meals page logo"
                />
              ) : (
                <img
                  src={ DrinksPageLogo }
                  alt="meals page logo"
                />
              )}
            <h1
              data-testid="meals-page-title"
              className="recipe-page-title"
            >
              {title}
            </h1>
          </section>
          <section className="searchbar-container">
            {
              (searching.clicked) && (
                <label htmlFor="search-input">
                  <input
                    type="text"
                    name="search-input"
                    onChange={ handleSearch }
                    data-testid="search-input"
                  />
                </label>
              )
            }
          </section>
        </div>
      </header>
    );
  }
}

export default Header;
