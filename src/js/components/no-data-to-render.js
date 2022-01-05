
const galleryContainer = document.querySelector('#gallery');
const libraryContainet = document.querySelector('#library');

export  function noData(message) {
  
 return galleryContainer.innerHTML = `<li class="list empty-library__bg-image ">
   <p class="empty-library__message">${message}</p>
    </li>`; 
}

export  function noDataLibrary(message) {
  
 return libraryContainet.innerHTML = `<li class="list empty-library__bg-image ">
   <p class="empty-library__message">${message}</p>
    </li>`; 
}