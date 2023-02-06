import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';

describe('A página Recipe In Progress contém', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByRole('button');

    const userEmail = 'alguem@alguem.com';
    const userPassword = '1234567';

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    userEvent.click(loginButton);

    history.push('/52771/in-progress');
  });

  test('elementos de uma receita de comida', () => {
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeImgSrc = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareButton = screen.getByTestId('share-btn');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.src).toBe(recipeImgSrc);
    expect(recipeTitle).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
  });
});
