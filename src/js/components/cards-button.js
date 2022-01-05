import { queueList } from './render-queue'
import {watchedList} from './render-watched'
import { movieDetalis } from '../Api/moves-api';
import {addToWatchedMovesBtn,deleteFromWatchedMovesBtn,saveBtnWatchedMovesBtn} from './render-watched'
import { addToQueueMovesBtn, deleteFromQueueMovesBtn, saveBtnQueueMovesBtn } from './render-queue';


const movesCardsTrending = document.querySelector('#gallery');
const movesCardsLibrary = document.querySelector('#library');

movesCardsLibrary.addEventListener('mouseover', saveBtnMoves)
movesCardsLibrary.addEventListener('click', receiveEvtMovesCard)

movesCardsTrending.addEventListener('mouseover', saveBtnMoves)
movesCardsTrending.addEventListener('click', receiveEvtMovesCard)

//шукаєм карточку при ховері для визначення значень кнопок ховерні
export function saveBtnMoves(evt) {
  if (!evt.target.classList.contains('movie__poster') & !evt.target.classList.contains('movie__title') & !evt.target.classList.contains('movie__information') ) {
    return;
  }

  const evtId = evt.target.parentElement;
 
  movieDetalis(evtId.id).then(markup => {
    saveBtnWatchedMovesBtn( markup)
    saveBtnQueueMovesBtn(markup)
    }) 
}
  
//шукаєм карточку при кліку для додавання в локал ховерні
export function receiveEvtMovesCard(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

   const parent = e.target.parentElement;
   const movie = parent.parentElement;
 
  movieDetalis(movie.id).then(mov => {
    mov.genres = mov.genres.map(genre => { 
    return genre.name;
    })
     mov.genres = mov.genres.map((genreId) => {      
       if (mov.genres.length >= 2) {
       mov.genres.length = 3;
      mov.genres[2] = 'Other';
   return genreId
       }}
     );
   mov.popularity = String(mov.popularity).split('.')[0];
   mov.release_date = mov.release_date ? new Date(mov.release_date).getFullYear() : 'No date info';
   return mov;
    })
    .then(markup => {     
      if (e.target.classList.contains('watched')) { addToWatchedMovesBtn(markup) };
       if (e.target.classList.contains('remove__watched')) { deleteFromWatchedMovesBtn(markup) };
       if (e.target.classList.contains('queue')) { addToQueueMovesBtn(markup) };
      if (e.target.classList.contains('remove__queue')) { deleteFromQueueMovesBtn(markup) };
    
      watchedList();
       queueList();
    })
    .catch(error => console.log(error));
   
}



