import * as types from './actionTypes';
import movieApi from '../api/mockMovieApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadMoviesSuccess(movies) {
  return { type: types.LOAD_MOVIES_SUCCESS, movies};
}

export function createMoviesSuccess(movie) {
  return {type: types.CREATE_MOVIE_SUCCESS, movie};
}

export function updateMovieSuccess(movie) {
  return {type: types.UPDATE_MOVIE_SUCCESS, movie};
}

export function loadMovies() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return movieApi.getAllMovies().then(movies => {
      dispatch(loadMoviesSuccess(movies));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveMovie(movie) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return movieApi.saveMovie(movie).then(movie => {
      movie.id ? dispatch(updateMovieSuccess(movie)) :
        dispatch(createMovieSuccess(movie));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
