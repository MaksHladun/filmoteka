//Запит для отримання популярних фільмів які відображаються на стартовій сторінці///




const API_KEY = '9f0e1a5db1805e19173b01041df22dc3';
let page = 1;

export  async function popularFilms() {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    const films = await response.json();
    page += 1;
      return films;
  }
    catch (e) {
    console.log(e);
  }
 
};


//Запит для отримання популярних фільмів інпута///

export async function seachFilmInput(seachQuery) {
  let page = 1;
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${seachQuery}&page=${page}&include_adult=false`);
    const films = await response.json();
   page += 1;
    return films;
  }
    catch (e) {
    console.log(e);
  }
 
};

//Запит для отримання популярних фільмів для модал///

export   async function movieDetalis(movie_id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`);
    const films = await response.json();
    
    return films;
  }
    catch (e) {
    console.log(e);
  }
 
};