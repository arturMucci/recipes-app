import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';
const BUTTON_TEST_ID = 'login-submit-btn';

describe('O componente Header', () => {
  test('faz login, input aparece quando botão de search é clicado novamente e o usuário é redirecionado para a página de perfil quando o ícone de perfil for clicado', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT_TESTID);
    const password = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    // act(() => {
    userEvent.type(email, 'trybe@test.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    // });

    // act(() => {
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    // });

    const searchInput = screen.getByTestId('search-input');
    const profileIcon = screen.getByRole('img', { name: /profile/i });
    userEvent.type(searchInput, 'pudim');
    expect(searchInput).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    // act(() => {
    //   userEvent.click(profileIcon);
    //   history.push('/profile');
    // });

    userEvent.click(profileIcon);
    waitFor(() => expect(history.location.pathname).toBe('/profile'));

    // expect(history.location.pathname).toBe('/profile');
  });
});
