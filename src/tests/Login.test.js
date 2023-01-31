import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';

describe('A página de Login', () => {
  test('contém campos para colocar email e senha, e um botão para fazer login', () => {
    render(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByRole('button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('mantém o botão de login desabilitado caso os campos estejam preenchidos incorretamente', () => {
    render(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByRole('button');

    const userEmail = 'alguem';
    const userPassword = '1234';

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    expect(loginButton).toBeDisabled();
  });

  test('habilita o botão de login caso os campos estejam preenchidos corretamente', () => {
    render(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByRole('button');

    const userEmail = 'alguem@alguem.com';
    const userPassword = '1234567';

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    expect(loginButton).toBeEnabled();
  });

  test('muda a rota ao clicar no botão de login caso os campos estejam preenchidos corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByRole('button');

    const userEmail = 'alguem@alguem.com';
    const userPassword = '1234567';

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    userEvent.click(loginButton);

    waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });
});
