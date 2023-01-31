import React, { useContext, useEffect } from 'react';
import RecipesProvider from '../context/RecipesProvider';
import Footer from '../components/Footer';

function Profile() {
  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user); // https://www.w3schools.com/js/js_json_stringify.asp

  const { setTitle } = useContext(RecipesProvider);
  useEffect(() => {
    setTitle('Profile');
  }, [setTitle]);

  return (
    <div>
      <fieldset>
        <legend>Profile</legend>
        <p
          data-testid="profile-email"
        >
          {
            user === null ? 'example@example.com' : userObj.email
          }
        </p>
        <a
          href="/done-recipes"
          data-testid="profile-done-btn"
        >
          <button>
            Done Recipes
          </button>
        </a>
        <a
          href="/favorite-recipes"
          data-testid="profile-favorite-btn"
        >
          <button>
            Favorite Recipes
          </button>
        </a>
        <a
          href="/"
          data-testid="profile-logout-btn"
        >
          <button
            onClick={ () => localStorage.clear() }
          >
            Logout
          </button>
        </a>
      </fieldset>
      <Footer />
    </div>
  );
}

export default Profile;
