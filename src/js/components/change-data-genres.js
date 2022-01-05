
// https://image.tmdb.org/t/p/w500/no-image.jpg
//Заміна дати з цілої на рік та жарни з масиву чисел на масив слів//
const NO_IMG_URL = 'https://dukhovnist.in.ua/images/stories/news_photo/kino13.jpg';
 

export default function changeDataGenres(mov) {
  let genresArray;
  
if(!genresArray) genresArray = JSON.parse(localStorage.getItem('genres'));


  const movies = mov.results;
    movies.map(elem => {
    elem.release_date = new Date(elem.release_date).getFullYear();
    elem.poster_path = elem.poster_path ? 'https://image.tmdb.org/t/p/w500' + elem.poster_path : NO_IMG_URL;
    elem.genre_ids = replaceGenres(elem);
  })
  

  function replaceGenres(el) {
        if (el.genres) {
      el.genre_ids = el.genres.map(elem => elem.id);
    }
     if (!el.genre_ids || el.genre_ids.length === 0) {
      el.genre_ids[0] = 'No genre info';
    }
    if (el.genre_ids.length >= 2) {
      el.genre_ids.length = 3;
      el.genre_ids[2] = 'Other';
            
    }
      return el.genre_ids.map((genreId, id)=> {
       
       for (const key of genresArray) {
         if (key.id === genreId) {
           if (id === 0)  key.name;
           return ` ${key.name}`;
         }
       }
       return genreId;
     })
  }
}

