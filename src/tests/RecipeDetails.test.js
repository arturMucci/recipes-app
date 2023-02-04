// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import App from '../App';
// import meals from '../../cypress/mocks/meals';
// import drinks from '../../cypress/mocks/drinks';
// import oneMeal from '../../cypress/mocks/oneMeal';
// import oneDrink from '../../cypress/mocks/oneDrink';
// import mealCategories from '../../cypress/mocks/mealCategories';
// import drinkCategories from '../../cypress/mocks/drinkCategories';
// import { renderWithRouter } from './helpers/renderWith';

// const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
// const mealCategoriesUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
// const drinkCategoriesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
// const oneMealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
// const oneDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';

// const emailExample = 'test.test@test.com';
// const passwordExample = '1234567';

// describe('RecipeDetails Tests: ', () => {
//   beforeEach(() => {
//     global.fetch = jest.fn((url) => Promise.resolve({
//       json: async () => {
//         switch (url) {
//         case mealsUrl:
//           return meals;
//         case oneMealUrl:
//           return oneMeal;
//         case mealCategoriesUrl:
//           return mealCategories;
//         case drinkCategoriesUrl:
//           return drinkCategories;
//         case drinksUrl:
//           return drinks;
//         case oneDrinkUrl:
//           return oneDrink;
//         default:
//           break;
//         }
//       },
//     }));
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   test('the initial behavior of the component: ', async () => {
//     const { history } = renderWithRouter(<App />);
//     act(() => history.push('/meals'));
//     screen.debug();
//     expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
//     screen.debug();
//     const firstCard = await screen.findByTestId('0-card-name');
//   });
// });
