import {movieDetalis} from '../Api/moves-api';
import movieModalCard from '../../templates/modal-cards.hbs';
import { addToWatched, deleteFromWatched, saveBtnWatched } from '../components/render-watched';
import { addToQueue, deleteFromQueue, saveBtnQueue }  from '../components/render-queue';


const modalCard = document.querySelector('.modal');
const bodyRef = document.querySelector('body');
const openModal = document.querySelector('.lightbox');
const imgContainer = document.querySelector('#gallery');
const backDrop = document.querySelector('.lightbox__overlay');
const libraryContainer = document.querySelector('#library');

let watchedArr = JSON.parse(localStorage.getItem('watchedMovie')) || [];
let queueArr = JSON.parse(localStorage.getItem('queueMovie')) || [];



libraryContainer.addEventListener('click', onGalleryImgClick);
imgContainer.addEventListener('click', onGalleryImgClick);
backDrop.addEventListener('click', onBackDropClick);

export default function onGalleryImgClick(evt) {
  if (!evt.target.classList.contains('movie__poster') & !evt.target.classList.contains('movie__title') & !evt.target.classList.contains('movie__information') & !evt.target.classList.contains('movie__card')) {
    return;
  }

  const movesId = evt.target.parentElement.dataset.id;
 

  movieDetalis(movesId).then(mov => {
    mov.genres = mov.genres.map(genre => { 
    return genre.name;
    })
     mov.genres = mov.genres.map((genreId, name) => {      
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
     
     modalCard.insertAdjacentHTML('afterbegin', movieModalCard(markup));   
     addRemoveBtnModal(markup);
     

      return modalCard;
    })
    .catch(error => console.log(error))
  
  OpenModal();
  
  
}


function OpenModal() {
  window.addEventListener('keydown', onEskKeyPress);
  openModal.classList.add('is-open');
  
  const openCarentModal = document.querySelector('.lightbox.is-open');
  if (openCarentModal) {
    bodyRef.classList.add('modal-open');
     
  }
 
  
  addCloseModal();
  
}

function addCloseModal() {
  const closeModalBtn = document.querySelector('.lightbox__button');
  closeModalBtn.addEventListener('click', closeModal);
  
}


function closeModal() {
  
  window.removeEventListener('keydown', onEskKeyPress);
  const openCarentModal = document.querySelector('.lightbox.is-open');

  if (openCarentModal) {
    openModal.classList.remove('is-open');
    bodyRef.classList.remove('modal-open');
  }
modalCard.innerHTML = '<button type="button" class="lightbox__button" data-action="close-lightbox"></button> ';
 
};

function onBackDropClick(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal();
  }
}

function onEskKeyPress(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}



/////////
function addRemoveBtnModal(e) {
   
  const evt = e;
  
  const addToWatchedBtn = document.querySelector('#watched');
  const removeFromWatched = document.querySelector('#watchedRemove');

  const addToQueueBtn = document.querySelector('#queue');
  const removeFromQueue = document.querySelector('#queueRemove');
  
  

  addToWatchedBtn.addEventListener('click', e => {addToWatched(evt, addToWatchedBtn,removeFromWatched)});
  removeFromWatched.addEventListener('click', e => {deleteFromWatched(evt,removeFromWatched, addToWatchedBtn )});
  
  addToQueueBtn.addEventListener('click', e => { addToQueue(evt, addToQueueBtn, removeFromQueue) });
  removeFromQueue.addEventListener('click', e => {deleteFromQueue(evt, removeFromQueue, addToQueueBtn) });
  

  saveBtnQueue(evt, removeFromQueue, addToQueueBtn);
  saveBtnWatched(evt, addToWatchedBtn, removeFromWatched);

}