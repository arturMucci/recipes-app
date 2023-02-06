import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesProvider from '../context/RecipesProvider';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import SearchBar from './SearchBar';

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
    const { value } = target;
    setSearching({ value, clicked: searching.clicked, done: searching.done });
  };

  const { pathname } = history.location;

  if (
    pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes'
  ) {
    return (
      <div className="header-container">
        <h1 data-testid="page-title">{title}</h1>
        <div className="btn-container">
          <button type="button" onClick={ sendToProfile }>
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="header-container">
      <h1 data-testid="page-title">{title}</h1>
      <div className="btn-container">
        <button
          className="header-btn"
          type="button"
          onClick={ sendToProfile }
        >
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
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
        <SearchBar pageTitle={ title } />
      </div>
    </div>
  );
}

export default Header;
