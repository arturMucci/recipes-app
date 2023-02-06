function urlFoodFilter({ key, search } = { key: 'name', search: '' }) {
  const initialUrl = 'https://www.themealdb.com/api/json/v1/1/';

  const urlFilter = {
    name: `${initialUrl}search.php?s=${search}`,
    firstLetter: `${initialUrl}search.php?f=${search}`,
    ingredient: `${initialUrl}filter.php?i=${search}`,
    categories: `${initialUrl}list.php?c=list`,
  };
  return urlFilter[key];
}

export async function infoFood({ key, search }) {
  try {
    const results = await fetch(urlFoodFilter({ key, search }));
    const data = await results.json();
    return data;
  } catch (error) {
    return error;
  }
}
