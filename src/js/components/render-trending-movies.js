
//Рендер популярних фільмів на стартовій сторінці//


import {popularFilms}  from '../Api/moves-api';
import changeDataGenres from './change-data-genres';
import movieCardTml from '../../templates/movie-cards.hbs';


const moviCards = document.querySelector('#gallery');
const addMov = document.querySelector('#button-movies');
const spiner = document.querySelector('.spin');
//


/////
addMov.addEventListener('click', renderTrendingMovies);


export default function renderTrendingMovies() {
  
  enableSpiner();

  return popularFilms()
    .then(mov => {
      changeDataGenres(mov);
      return movieCardTml(mov);
    })
    .then(markup => {    
      moviCards.insertAdjacentHTML('beforeend', markup);

      disableSpiner();

      return moviCards;
    })
    .catch(error => console.log(error));
};


function disableSpiner() {
 spiner.classList.add('is-hidden');
  addMov.classList.remove('is-hidden');
  
}
function enableSpiner() {
  spiner.classList.remove('is-hidden');
  
 }

