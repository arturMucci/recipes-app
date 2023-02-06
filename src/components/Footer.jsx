import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer-container"
    >
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
  );
}

export default Footer;
