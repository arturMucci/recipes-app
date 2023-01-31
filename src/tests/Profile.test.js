import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';

describe('A página Profile contém', () => {
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

    history.push('/profile');
  });

  test('um elemento que mostra um email de exemplo caso não haja email do usuário', () => {
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();

    const exampleEmail = 'example@example.com';
    expect(userEmail.textContent).toBe(exampleEmail);
  });

  test('um elemento que mostra o email do usuário caso esteja no localStorage', () => {
    const emailElement = screen.findByText(/alguem@alguem.com/i);
    waitFor(() => expect(emailElement).toBeInTheDocument());
  });

  test('um botão para fazer Logout', () => {
    const logoutBtn = screen.getByText(/Logout/i);
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
  });
});

describe('A página Profile contém um botão que redireciona', () => {
  test('para a página Done Recipes', () => {
    const { history } = renderWithRouter(<Profile />);

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    expect(doneRecipesBtn).toBeInTheDocument();

    userEvent.click(doneRecipesBtn);
    waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });

  test('para a página Favorite Recipes', () => {
    const { history } = renderWithRouter(<Profile />);

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipesBtn).toBeInTheDocument();

    userEvent.click(favoriteRecipesBtn);
    waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));
  });

  test('para a página de Login', () => {
    const { history } = renderWithRouter(<Profile />);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
    waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});
