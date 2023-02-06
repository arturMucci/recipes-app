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

  test('um elemento que mostra a foto da receita', () => {
    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const recipeImgSrc = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
    expect(recipePhoto.src).toBe(recipeImgSrc);
  });
});
