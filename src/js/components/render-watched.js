import {noDataLibrary} from './no-data-to-render';
import movieCard from '../../templates/movie-card-watched.hbs';

let watchedArr = JSON.parse(localStorage.getItem('watchedMovie')) || [];

const moviCard = document.querySelector('#library');
const btnMyWatchedList = document.querySelector('#btn-watched');



//добавляємо фільм в локал і записуєм в масив в модал

export  function addToWatched(evt, addToWatchedBtn, removeFromWatched) {
  watchedArr.push(evt);
  localStorage.setItem('watchedMovie', JSON.stringify(watchedArr));
    addToWatchedBtn.classList.add('btn__disabled')
    removeFromWatched.classList.remove('btn__disabled')
  watchedList();
}


export function deleteFromWatched(evt, removeFromWatched, addToWatchedBtn) {
  addToWatchedBtn.classList.remove('btn__disabled')
    removeFromWatched.classList.add('btn__disabled')
  
    // удаляємо добавлений фільм ізаписуєм новий масив в локал в модал
  
  const modifiedArr = watchedArr.filter(item => item.id !== evt.id);
  localStorage.setItem('watchedMovie', JSON.stringify(modifiedArr));
  watchedArr = modifiedArr;
  watchedList();
  }

//Провіряєм яку кнопку показувати в модал
export function saveBtnWatched(evt, addToWatchedBtn,removeFromWatched) {
   watchedArr.filter(item => {
     if (item.id === evt.id) {
        addToWatchedBtn.classList.add('btn__disabled')
        removeFromWatched.classList.remove('btn__disabled')
     }
   });

}

//Рендеримо збережені фільми переглянуті
export function watchedList() {
  const savedMoviesWatched = localStorage.getItem('watchedMovie');
  const moviesArrayWatched = JSON.parse(savedMoviesWatched);
 
  if (btnMyWatchedList.classList.contains('is-active')) {
    if (!moviesArrayWatched || moviesArrayWatched.length === 0) {
      noDataLibrary('You have not added anything here yet');
    } else {
      moviCard.innerHTML = movieCard(moviesArrayWatched);
      
    }
  }
  
}

//// додаємо фільм  через ховерні кнопки

export function addToWatchedMovesBtn(markup) {
  watchedArr.push(markup);
  localStorage.setItem('watchedMovie', JSON.stringify(watchedArr));

  saveBtnWatchedMovesBtn(markup)

}
//видаляєм з локал добавлений фільм через ховерні кнопки
export function deleteFromWatchedMovesBtn(markup) {
  const modifiedArr = watchedArr.filter(item => item.id !== markup.id);
  localStorage.setItem('watchedMovie', JSON.stringify(modifiedArr));
  watchedArr = modifiedArr;

  saveBtnWatchedMovesBtn(markup)
    
}
  
///провіряєм яке має бути значення кнопок на головній сторінці
export function saveBtnWatchedMovesBtn(markup) {
  
  const storageMovieArr = JSON.parse(localStorage.getItem('watchedMovie')) || [];
  let el = document.getElementById(markup.id);

  if (storageMovieArr.length === 0) {
    el.querySelector('#watched-btn').classList.remove('btn__disabled');
    el.querySelector('#watchedRemove-btn').classList.add('btn__disabled');
    
    return;
  }
  
  for (let i = 0; i < storageMovieArr.length; i += 1) {
    if (storageMovieArr[i].id === markup.id) {
      el.querySelector('#watched-btn').classList.add('btn__disabled');
      el.querySelector('#watchedRemove-btn').classList.remove('btn__disabled');
      return;  
    }
    else {
      el.querySelector('#watched-btn').classList.remove('btn__disabled');
      el.querySelector('#watchedRemove-btn').classList.add('btn__disabled');
    }}
}
