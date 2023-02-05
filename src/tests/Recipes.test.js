import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';
const TEXT_TESTID = '0-card-name';

describe('Recipes component', () => {
  it('should fetch and render the recipes', async () => {
    global.fetch = jest.fn((url) => Promise.resolve({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return { meals: [{
            strMeal: 'Corba',
            strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
          }] };
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
          return { meals: [{
            strMeal: 'Beef and Mustard Pie',
            strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
            idMeal: '52874',
          }] };
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
          return { meals: [
            { strCategory: 'Beef' },
            { strCategory: 'Breakfast' },
            { strCategory: 'Chicken' },
            { strCategory: 'Dessert' },
            { strCategory: 'Goat' },
          ] };
        }
      },
    }));

    const {
      getByTestId,
      findByTestId,
      findByRole,
      findByText,
      history } = renderWithRouter(<App />);

    const emailInput = getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByRole('button');

    const userEmail = 'alguem@alguem.com';
    const userPassword = '1234567';

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    userEvent.click(loginButton);

    waitFor(() => expect(history.location.pathname).toBe('/meals'));

    const button = getByTestId('All-category-filter');
    userEvent.click(button);

    expect(global.fetch).toHaveBeenCalled();

    const buttonCategory = await findByRole('button', { name: /beef/i });
    expect(buttonCategory).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalled();
    const corba = await findByTestId(TEXT_TESTID);
    expect(corba).toHaveTextContent('Corba');

    userEvent.click(buttonCategory);

    const chicken = await findByText('Beef and Mustard Pie');
    expect(chicken).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(buttonCategory);
    const corba2 = await findByText('Corba');
    expect(corba2).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalled();
  });
});
