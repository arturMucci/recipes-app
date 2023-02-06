import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import meals from '../../cypress/mocks/meals';
// import drinks from '../../cypress/mocks/drinks';
import { ONE_CHARACTER } from '../components/SearchBar';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';
const BUTTON_TEST_ID = 'login-submit-btn';

// const mockFetch = jest.fn((url) => Promise.resolve({
//   json: async () => {
//     console.log('Entrou no mock');
//     switch (url) {
//     case 'https://www.themealdb.com/api/json/v1/1/search.php?s=sugar':
//       return Promise.resolve({ meals: [{
//         strMeal: 'Apam balik',
//         strMealThumb: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg',
//       }] });

//     case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef':
//       return Promise.resolve({ meals: [{
//         strMeal: 'Beef and Mustard Pie',
//         strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
//         idMeal: '52874',
//       }] });
//     case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
//       return Promise.resolve({
//         meals: [
//           { strCategory: 'Beef' },
//           { strCategory: 'Breakfast' },
//           { strCategory: 'Chicken' },
//           { strCategory: 'Dessert' },
//           { strCategory: 'Goat' },
//         ],
//       });
//     case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
//       return Promise.resolve(meals);

//     default:
//       return Promise.resolve(meals);
//     }
//   },
// }));

// const mockFetch2 = jest.fn((url) => Promise.resolve({
//   json: async () => {
//     if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=pizza') {
//       return Promise.resolve({ meals: [{
//         strMeal: 'Apam balik',
//         strMealThumb: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg',
//       }] });
//     }
//     if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
//       return Promise.resolve({ meals: [{
//         strMeal: 'Beef and Mustard Pie',
//         strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
//         idMeal: '52874',
//       }] });
//     }
//     if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
//       return Promise.resolve({ meals: [
//         { strCategory: 'Beef' },
//         { strCategory: 'Breakfast' },
//         { strCategory: 'Chicken' },
//         { strCategory: 'Dessert' },
//         { strCategory: 'Goat' },
//       ] });
//     }

//     return Promise.resolve(meals);
//   } }));

describe('o componente SearchBar', () => {
  test('se o usuário consegue pesquisar por alguma receita de meal', async () => {
    renderWithRouter(<App />);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(BUTTON_TEST_ID);

    const userEmail = 'alguem@alguem.com';
    const userPassword = '1234567';

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    userEvent.click(loginButton);

    const searchButton = await screen.findByTestId('search-top-btn');

    await act(async () => {
      userEvent.click(searchButton);
    });

    const nameRadio = screen.getByTestId('name-search-radio');
    const firstNameRadio = screen.getByTestId('first-letter-search-radio');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const filterButton = document.querySelector('[data-testid="exec-search-btn"]');

    waitFor(() => {
      expect(nameRadio).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
      expect(firstNameRadio).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(nameRadio);
      userEvent.type(searchInput, 'pizza');
      userEvent.click(filterButton);
    });

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=pizza');
  });
  // test('se o usuário consegue pesquisar por alguma receita de drink', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValueOnce(drinks),
  //   });

  //   const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
  //   const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
  //   const loginButton = screen.getByTestId(BUTTON_TEST_ID);

  //   const userEmail = 'alguem@alguem.com';
  //   const userPassword = '1234567';

  //   userEvent.type(emailInput, userEmail);
  //   userEvent.type(passwordInput, userPassword);
  //   userEvent.click(loginButton);

  //   const redirectToDrinks = screen.getByTestId('drinks-bottom-btn');

  //   await act(async () => {
  //     history.push('/drinks');
  //   });

  //   console.log(history.location.pathname);

  //   const searchButton = await screen.findByTestId('search-top-btn');

  //   await act(async () => {
  //     userEvent.click(searchButton);
  //   });

  //   const nameRadio = screen.getByTestId('name-search-radio');
  //   const firstNameRadio = screen.getByTestId('first-letter-search-radio');
  //   const ingredientRadio = screen.getByTestId('ingredient-search-radio');
  //   const searchInput = screen.getByTestId('search-input');
  //   const filterButton = document.querySelector('[data-testid="exec-search-btn"]');

  //   waitFor(() => {
  //     expect(nameRadio).toBeInTheDocument();
  //     expect(ingredientRadio).toBeInTheDocument();
  //     expect(firstNameRadio).toBeInTheDocument();
  //   });

  //   await act(async () => {
  //     userEvent.click(ingredientRadio);
  //     userEvent.type(searchInput, 'sugar');
  //     userEvent.click(filterButton);
  //   });

  //   expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=sugar');
  //   // renderWithRouter(<App />);

  //   // waitFor(() => {
  //   //   const { history } = useHistory();
  //   //   history.push('/meals');
  //   //   expect(history.location.pathname).toBe('/meals');
  //   // });

  //   // const searchButton = screen.getByTestId('search-top-btn');
  //   // userEvent.click(searchButton);
  //   // const searchInput = screen.getByTestId('search-input');
  //   // userEvent.type(searchInput, 'pizza');

  //   // const nameRadio = screen.getByTestId('name-search-radio');
  //   // const filterButton = document.querySelector('[data-testid="exec-search-btn"]');
  //   // userEvent.click(nameRadio);
  //   // userEvent.click(filterButton);

  //   // expect(global.fetch).toHaveBeenCalled();
  //   // const balik = await findByTestId(TEXT_TESTID);
  //   // expect(balik).toHaveTextContent('Apam balik');

  //   /// /// //// //// //// /// /// /// / / / // / / // / / / / / / / / /

  //   // waitFor(() => {
  //   //   expect(infoFood).toHaveBeenCalledWith({ key: 'name', search: 'pizza' });
  //   // }, { timeout: 1500 });

  //   // userEvent.click(firstLetterRadio);
  //   // userEvent.click(searchButton);

  //   // expect(global.alert).toHaveBeenCalledWith(ONE_CHARACTER);
  // });
  test('se o usuário recebe um alerta se digita mais de uma letra', async () => {
    renderWithRouter(<App />);
    jest.spyOn(global, 'alert').mockResolvedValue(
      { ONE_CHARACTER },
    );

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(BUTTON_TEST_ID);

    const userEmail = 'alguem@alguem.com';
    const userPassword = '1234567';

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    userEvent.click(loginButton);

    const searchButton = await screen.findByTestId('search-top-btn');

    await act(async () => {
      userEvent.click(searchButton);
    });

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const filterButton = document.querySelector('[data-testid="exec-search-btn"]');

    await act(async () => {
      userEvent.click(firstLetter);
      userEvent.type(searchInput, 'pi');
      userEvent.click(filterButton);
    });

    expect(global.alert).toHaveBeenCalledWith(ONE_CHARACTER);
  });
});
