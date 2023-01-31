import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesProvider from '../context/RecipesProvider';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
        <h1 data-testid="page-title">{title}</h1>
        <button type="button" onClick={ sendToProfile }>
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
      </div>
    );
  }

  if (showProfile) {
    return (
      <div>
        <h1 data-testid="page-title">{title}</h1>
        <button type="button" onClick={ sendToProfile }>
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
        <div>
          {(searching.clicked) && (
            <label htmlFor="search-input">
              <input
                type="text"
                name="search-input"
                onChange={ handleSearch }
                data-testid="search-input"
              />
            </label>
          )}
          <button
            type="button"
            onClick={ handleClick }
          >
            <img
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
