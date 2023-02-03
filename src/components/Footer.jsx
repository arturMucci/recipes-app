import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

function Footer() {
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
              src={ drinkIcon }
              alt="drink icon"
              data-testid="drinks-bottom-btn"
            />
          </a>
          <a href="/meals">
            <img
              src={ mealIcon }
              alt="meal icon"
              data-testid="meals-bottom-btn"
            />
          </a>
        </footer>
      </fieldset>
    </div>
  );
}

export default Footer;
