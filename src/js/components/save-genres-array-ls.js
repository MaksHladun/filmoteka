
//Запит на сервер для збереження  жанрів в localStorage для переведення з числових на слова//


const API_KEY = '9f0e1a5db1805e19173b01041df22dc3';

async function getGenres() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const genre = await response.json();
    return genre;
  } catch (e) {
    console.log(e);
  }
};


//Збереження в локал//

getGenres().then(genres => {
  localStorage.setItem("genres", JSON.stringify(genres.genres));
})

