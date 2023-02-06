function urlDrinkFilter({ key, search } = { key: 'name', search: '' }) {
  const initialUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  const urlFilter = {
    name: `${initialUrl}search.php?s=${search}`,
    firstLetter: `${initialUrl}search.php?f=${search}`,
    ingredient: `${initialUrl}filter.php?i=${search}`,
    categories: `${initialUrl}list.php?c=list`,
  };
  console.log(urlFilter[key]);
  return urlFilter[key];
}

export async function infoDrink({ key, search }) {
  try {
    const result = await fetch(urlDrinkFilter({ key, search }));
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
}

export function drinkImg(ingredient) {
  return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
}
