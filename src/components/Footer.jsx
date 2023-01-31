import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesProvider from '../context/RecipesProvider';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  const { title } = useContext(RecipesProvider);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const sendToProfile = () => {
    history.push('/profile');
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
        <h1 data-testid="page-title">{title}</h1>
        <button type="button" onClick={ sendToProfile }>
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
      </div>
    );
  }

  if (showProfile) {
    return (
      <div
        data-testid="footer"
        className="footer"
      >
        <fieldset>
          <legend>Footer</legend>
          <footer>
            <a href="/drinks">
              <img
                src="src/images/drinkIcon.svg"
                alt="drink icon"
                data-testid="drinks-bottom-btn"
              />
            </a>
            <a href="/meals">
              <img
                src="src/images/mealIcon.svg"
                alt="meal icon"
                data-testid="meals-bottom-btn"
              />
            </a>
          </footer>
        </fieldset>
      </div>
    );
  }
}

export default Footer;
