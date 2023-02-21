import { refs } from '../refs/refs';
import { errorSearch } from '../errorSearch';
import { createNewsCard } from '../markup/card';
import { btnAddToFavorite } from './addToFavorite';

console.log(refs.favorite);

const savedNews = localStorage.getItem('newsSection');
const parsedNews = JSON.parse(savedNews);

errorSearch();

parsedNews.map(el => {
  addMarkup(refs.favoriteLists, createNewsCard(el));
});

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

refs.favoriteLists.addEventListener('click', btnAddToFavorite);

// function btnFavoriteRemove(e) {
//   if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'path') return;

//   const id = e.target.closest('.news__article').dataset.id;
//   const indexElLocalStorege = parsedNews.findIndex(e => e.id === id);

//   localStorage.removeItem('newsSection');
//   parsedNews.splice(indexElLocalStorege, 1);

//   localStorage.setItem(`newsSection`, JSON.stringify(parsedNews));

//   refs.favoriteLists.innerHTML = '';

//   console.log(parsedNews);
//   errorSearch();

//   parsedNews.map(el => {
//     addMarkup(refs.favoriteLists, createNewsCard(el));
//   });
// }
