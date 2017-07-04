import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const directors = [
  {
    id: 'scott-derrickson',
    firstName: 'Scott',
    lastName: 'Derrickson'
  },
  {
    id: 'denis-villeneuve',
    firstName: 'Denis',
    lastName: 'Villeneuve'
  },
  {
    id: 'byron-howard',
    firstName: 'Byron',
    lastName: 'Howard'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (director) => {
  return director.firstName.toLowerCase() + '-' + director.lastName.toLowerCase();
};

class DirectorApi {
  static getAllDirectors() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], directors));
      }, delay);
    });
  }

  static saveDirector(director) {
    director = Object.assign({}, director); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minDirectorNameLength = 3;
        if (director.firstName.length < minDirectorNameLength) {
          reject(`First Name must be at least ${minDirectorNameLength} characters.`);
        }

        if (director.lastName.length < minDirectorNameLength) {
          reject(`Last Name must be at least ${minDirectorNameLength} characters.`);
        }

        if (director.id) {
          const existingDirectorIndex = directors.findIndex(a => a.id == director.id);
          directors.splice(existingDirectorIndex, 1, author);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new directors in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          director.id = generateId(director);
          directors.push(director);
        }

        resolve(director);
      }, delay);
    });
  }

  static deleteDirector(directorId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfDirectorToDelete = directors.findIndex(director => {
          director.directorId == directorId;
        });
        directors.splice(indexOfDirectorToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default DirectorApi;
