import {noDataLibrary} from './no-data-to-render';
import movieCard from '../../templates/movie-card-queue.hbs';



let queueArr = JSON.parse(localStorage.getItem('queueMovie')) || [];

const btnMyQueueList = document.querySelector('#btn-queue');
const moviCard = document.querySelector('#library');




//добавляємо фільм в локал і записуєм в масив

export  function addToQueue(evt,addToQueueBtn,removeFromQueue) {
  queueArr.push(evt);
  localStorage.setItem('queueMovie', JSON.stringify(queueArr));
    addToQueueBtn.classList.add('btn__disabled')
  removeFromQueue.classList.remove('btn__disabled')
 
  queueList();

  }


export function deleteFromQueue(evt, removeFromQueue, addToQueueBtn) {
  
  addToQueueBtn.classList.remove('btn__disabled')
  removeFromQueue.classList.add('btn__disabled')

    // удаляємо добавлений фільм і записуєм новий масив в локал

  const modifiedArr = queueArr.filter(item => item.id !== evt.id);
  localStorage.setItem('queueMovie', JSON.stringify(modifiedArr));
   queueArr = modifiedArr;
  queueList();
}


//Провіряєм яку кнопку показувати 
export function saveBtnQueue(evt, removeFromQueue, addToQueueBtn) {

  queueArr.filter(item => {
     if (item.id === evt.id) {
        addToQueueBtn.classList.add('btn__disabled')
    removeFromQueue.classList.remove('btn__disabled')
     }
   });
}


//Рендеримо збережені фільми в чергу
export function queueList() {
  const savedMoviesQueue = localStorage.getItem('queueMovie');
  const moviesArrayQueue = JSON.parse(savedMoviesQueue);

  if (btnMyQueueList.classList.contains('is-active')) {
    if ( !moviesArrayQueue || moviesArrayQueue.length === 0) {
      noDataLibrary('You have not added anything here yet');
    } else {
      moviCard.innerHTML = movieCard(moviesArrayQueue);

    }
  }
  
}

/////


//додаєм в локал фільм через ховерні кнопки
export function addToQueueMovesBtn(markup) { 
  queueArr.push(markup); 
  localStorage.setItem('queueMovie', JSON.stringify(queueArr));
 
  saveBtnQueueMovesBtn(markup) 
 
}
//видаляєм з локал добавлений фільм через ховерні кнопки
export function deleteFromQueueMovesBtn(markup) {
  const modifiedArr = queueArr.filter(item => item.id !== markup.id);
  localStorage.setItem('queueMovie', JSON.stringify(modifiedArr));
  queueArr = modifiedArr;
   
  saveBtnQueueMovesBtn(markup)

 
  }
///провіряєм яке має бути значення кнопок на головній
export function saveBtnQueueMovesBtn(markup) {
  const storageQueueMovieArr = JSON.parse(localStorage.getItem('queueMovie')) || [];
  let el = document.getElementById(markup.id);

  if (storageQueueMovieArr.length === 0) {
    el.querySelector('#queue-btn').classList.remove('btn__disabled');
    el.querySelector('#queueRemove-btn').classList.add('btn__disabled');
    return;
  }
 
  for (let i = 0; i < storageQueueMovieArr.length; i += 1) {
    if (storageQueueMovieArr[i].id === markup.id) {
      el.querySelector('#queue-btn').classList.add('btn__disabled');
      el.querySelector('#queueRemove-btn').classList.remove('btn__disabled');         
    }
       else {
      el.querySelector('#queue-btn').classList.remove('btn__disabled');
      el.querySelector('#queueRemove-btn').classList.add('btn__disabled');  
    }}
}

