import { showLoader } from '../loader/loader';

const KEY = 'api-key=ccA9QsXbvrHhGuvowEcHjyxEU2jAukPO';
const BASE_URL = 'https://api.nytimes.com/svc';

async function getPopular() {
  const articleFetch = await fetch(
    `${BASE_URL}/mostpopular/v2/viewed/1.json?${KEY}`
  );

  if (articleFetch.ok) {
    const popular = await articleFetch.json();
    return popular.results;
  }
  throw new Error(articleFetch.statusText);
}

async function getCategoryList() {
  showLoader();
  const categoryList = await fetch(
    `${BASE_URL}//news/v3/content/section-list.json?${KEY}`
  );

  if (categoryList.ok) {
    const categories = await categoryList.json();
    return categories.results;
  }

  throw new Error(categoryList.statusText);
}

async function getDataByCategory(value) {
  showLoader();
  console.log(value);
  let normalazeValue = value.toLowerCase();
  let newValue = encodeURIComponent(normalazeValue);

  const data = await fetch(
    `${BASE_URL}/news/v3/content/all/${newValue}.json?${KEY}&limit=100`
  );
  if (data.ok) {
    const articles = await data.json();

    return articles.results;
  }

  throw new Error(data.statusText);
}

async function getSearchArticle(value, page = 0, date = '') {
  showLoader();
  let dateUrl = '';
  // dateForUrl = ` &begin_date=${date}&end_date=${date}`;
  // &page=26

  if (date !== '') {
    dateUrl = `&begin_date=${date}&end_date=${date}`;
  }

  const articleFetch = await fetch(
    `${BASE_URL}/search/v2/articlesearch.json?q=${value}&page=${page}&${KEY}${dateUrl}`
  );

  https: if (articleFetch.ok) {
    const articles = await articleFetch.json();

    // console.log(articles.response);
    return articles.response.docs;
  }

  throw new Error(articleFetch.statusText);
}

export { getPopular, getCategoryList, getSearchArticle, getDataByCategory };
