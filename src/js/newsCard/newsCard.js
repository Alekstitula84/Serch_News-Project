import { getPopular } from '../api/news.js';
import { hideLoader } from '../loader/loader';
import { orderedNumber } from '../markup/markup.js';
import { btnAddToFavorite } from '../favorite/addToFavorite';

import Sprite from '../../images/sprite.svg';

const newsList = document.querySelector('.news__lists');
// console.log(newsList);

const newsCard = document.querySelector('.news__item');
// console.log(newsCard);

// const readMoreBtn = document.querySelector("a");
// console.log(readMoreBtn)

//Створюється одна карточка

// getPopular()
//   .then(data => {
//     addMarkup(newsList, createNewsCard(data[0]));
//   })
//   .catch()
//   .finally(data => hideLoader());

//Функція створення однієї карточки

// addMarkup Додаю розмітку

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

function addMarkupAfter(element, constMarkup) {
  element.insertAdjacentHTML('afterbegin', constMarkup);
}

//Add ... 80 elements Перевірка довжини тексту

//Клік мишкою на улюблене

newsList.addEventListener('click', btnAddToFavorite);
let newLocalStorage = [];

//Клік на readmore

newsList.addEventListener('click', linkReadMore);

//Перевірка чи є Favorite в  LocalStorage

function isLocalEmpty() {
  if (JSON.parse(localStorage.getItem('newsSection')) === null) {
    newLocalStorage = [];
    return;
  }
  newLocalStorage = JSON.parse(localStorage.getItem('newsSection'));
}
isLocalEmpty();

// Перевірка чи є Readmore в LocalStorage
let readMoreId = [];
isLocalReadEmpty();

function isLocalReadEmpty() {
  if (JSON.parse(localStorage.getItem('readMoreLocal')) === null) {
    return;
  }
  readMoreId = JSON.parse(localStorage.getItem('readMoreLocal'));
}

//Кнопка Readmore

function linkReadMore(event) {
  const readMore = event.target.closest(`.news__link-more`);
  if (!readMore) return;

  console.log(readMore);
  // console.log(readMore.nextElementSibling);

  readMore.parentNode.parentNode.parentNode.classList.add('opacity');
  addReadMore(readMore);
  // Have read
  const btn = event.target.closest(`.news__article`);
  console.log(btn);

  const Readmorestatus = btn.parentNode.children[0].children[0].children[2];
  // const Readmorestatus = btn.children[0].children[2];
  console.log(Readmorestatus);

  Readmorestatus.classList.remove('hidden');
  addMarkupAfter(newsCard);
}

//Кнопка улюблене

//Додаємо в Readmore

function addReadMore(readMore) {
  const evenDateNow = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const readDateNow = evenDateNow
    .toLocaleDateString([], options)
    .replaceAll('.', '/');
  const read = {
    uri: readMore.nextElementSibling.textContent,
    published_date: readMore.parentNode.firstElementChild.innerText,
    media: readMore.parentNode.parentNode.childNodes[1].children[0].currentSrc,
    title: readMore.parentNode.parentNode.childNodes[3].children[0].innerText,
    abstract:
      readMore.parentNode.parentNode.childNodes[3].children[1].innerText,
    url: readMore.parentNode.children[1].href,
    read: 'true',
    section: readMore.parentNode.parentNode.childNodes[1].children[1].innerHTML,
    dayRead: readDateNow,
  };
  for (let i = 0; i < readMoreId.length; i += 1) {
    if (readMoreId[i].uri === read.uri) {
      return;
    }
  }
  readMoreId.push(read);
  localStorage.setItem(`readMoreLocal`, JSON.stringify(readMoreId));
}

//

function makeReadNewsMarkup(news) {
  return `
  <div class="read-news__list">
    <button class="read-news__btn js-read-news-btn">
      <span>20/02/2021</span>
      <svg><use href="${Sprite + '#arrow-down'}"></use></svg></button></div>
      `;
}
