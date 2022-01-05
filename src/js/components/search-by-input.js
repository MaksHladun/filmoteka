import {seachFilmInput}  from "../Api/moves-api";
import changeDataGenres from '../components/change-data-genres';
import movieCardTml from '../../templates/movie-cards.hbs';
import {noData} from './no-data-to-render';
import  renderTrendingMovies  from './render-trending-movies'

const moviCard = document.querySelector('#gallery');
const addMov = document.querySelector('#button-movies');
var debounce = require('lodash.debounce');


const searchForm = document.querySelector('.header-form')
const seachInput = document.querySelector('.header-input');

seachInput.addEventListener('input', debounce(seachFilmbyInput, 500));
searchForm.addEventListener('submit', e => e.preventDefault());


export default function seachFilmbyInput(evt) {
  const seachQuery = evt.target.value;
  
     if (!seachQuery) {
     moviCard.innerHTML = '';
  renderTrendingMovies();
  return}
  
  try {
    seachFilmInput(seachQuery).then(mov => {
      if (mov.results.length === 0) {
        addMov.classList.add('visually-hidden');
        return noData('Sorry. There is nothing for your request');
      }
    
      changeDataGenres(mov);
      addMov.classList.remove('visually-hidden');
      
      return movieCardTml(mov);
    })
      .then(markup => {
        moviCard.innerHTML = markup;
        
        return moviCard;
      })
  }
  catch (error) { console.log('error', e); } finally { 
    

  }
}

