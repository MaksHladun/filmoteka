import { watchedList } from './render-watched';
import {queueList} from './render-queue'

//міняєм властивості кнопок в хедері

const headerForm = document.querySelector('.header-form');
const btnLibrary = document.querySelector('#btn-library');
const btnHome = document.querySelector('#btn-home');
const hederImg = document.querySelector('header');
const libraryPage = document.querySelector('.js-library');
const moviCard = document.querySelector('#library');
const moviCards = document.querySelector('#gallery');
const btnMyWatchedList = document.querySelector('#btn-watched');
const btnMyQueueList = document.querySelector('#btn-queue');
const addMov = document.querySelector('#button-movies');


btnLibrary.addEventListener('click', activBtnLibrary);
btnHome.addEventListener('click', activBtnHome);
btnMyWatchedList.addEventListener('click', activBtnWatched)
btnMyQueueList.addEventListener('click', activBtnQueue)

export function activBtnLibrary() {
  moviCards.classList.add('is-hidden');
   moviCard.classList.remove('is-hidden');
  headerForm.classList.add('visually-hidden');
  btnLibrary.classList.add('header__btn--accent');
  btnHome.classList.remove('header__btn--accent');
  libraryPage.classList.remove('visually-hidden');
  addMov.classList.add('visually-hidden');
   changeHeaderImg();
  watchedList();
  queueList();

 
}

 function activBtnHome() {
  moviCards.classList.remove('is-hidden');
   moviCard.classList.add('is-hidden');
   moviCard.innerHTML = '';
  headerForm.classList.remove('visually-hidden');
  btnLibrary.classList.remove('header__btn--accent');
  btnHome.classList.add('header__btn--accent');
  libraryPage.classList.add('visually-hidden');
  addMov.classList.remove('visually-hidden');
  changeHeaderImg();
   watchedList();
  queueList();
}


//міняєм бекграун хедера

function changeHeaderImg() {
  if (headerForm.classList.contains('visually-hidden')) {
    hederImg.classList.replace('header-container__home', 'header-container__library');
  
  } else {
    hederImg.classList.replace('header-container__library', 'header-container__home');
  }
}

/// активність кнопок Watched та Queue
  function activBtnWatched() {
  btnMyWatchedList.classList.add('is-active');
    btnMyQueueList.classList.remove('is-active');
    watchedList();
    queueList();
}


 function activBtnQueue() {
  btnMyWatchedList.classList.remove('is-active');
   btnMyQueueList.classList.add('is-active');
   queueList();
   watchedList();
}
