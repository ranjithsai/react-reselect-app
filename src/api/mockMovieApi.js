import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const movies = [
  {
    id: "doctor-strange-2016",
    title: "Doctor Strange 2016",
    watchHref: "https://www.youtube.com/watch?v=Bme-XHo-AA4&list=PLHPTxTxtC0ibCJB1vtN_-cwL5X-yPiPyO&feature=c4-overview-vl",
    directorId: "scott-derrickson",
    length: "1:54:58",
    category: "Science Fiction"
  },
  {
    id: "arrival-2016",
    title: "Arrival 2016",
    watchHref: "https://www.youtube.com/watch?v=SUiavMWW5Vo&list=PLHPTxTxtC0iaNb2gYer181oSTHvU3JLmU&feature=c4-overview-vl",
    directorId: "denis-villeneuve",
    length: "1:56:23",
    category: "Science Fiction"
  },
  {
    id: "zootopia-2016",
    title: "Zootopia 2016",
    watchHref: "https://www.youtube.com/watch?v=d4WEUn0yS74",
    directorId: "byron-howard",
    length: "1:48:30",
    category: "Animation"
  },
  {
    id: "tangled-2016",
    title: "Tangled 2016",
    watchHref: "https://www.youtube.com/watch?v=UVxQTCSSSqE",
    directorId: "byron-howard",
    length: "1:40:17",
    category: "Animation"
  },
  {
    id: "the-day-the-earth-stood-still-2008",
    title: "The Day The Earth Stood Still 2008",
    watchHref: "https://www.youtube.com/watch?v=tQk7Fbmp2oM",
    directorId: "scott-derrickson",
    length: "1:43:35",
    category: "Adventure"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (movie) => {
  return replaceAll(movie.title, ' ', '-');
};

class MovieApi {
  static getAllMovies() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], movies));
      }, delay);
    });
  }

  static saveMovie(movie) {
    movie = Object.assign({}, movie); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minMovieTitleLength = 1;
        if (movie.title.length < minMovieTitleLength) {
          reject(`Title must be at least ${minMovieTitleLength} characters.`);
        }

        if (movie.id) {
          const existingMovieIndex = movies.findIndex(a => a.id == movie.id);
          movies.splice(existingMovieIndex, 1, movie);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new movies in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          movie.id = generateId(movie);
          movie.watchHref = `https://www.youtube.com/movies/${movie.id}`;
          movies.push(movie);
        }

        resolve(movie);
      }, delay);
    });
  }

  static deleteMovie(movieId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfMovieToDelete = movies.findIndex(movie => {
          movie.movieId == movieId;
        });
        movies.splice(indexOfMovieToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default MovieApi;
