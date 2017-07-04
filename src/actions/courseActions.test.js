import expect from 'expect';
import * as movieActions from './movieActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Movie Actions', () => {
  describe('createMovieSuccess', () => {
    it('should create a CREATE_MOVIE_SUCCESS action', () => {
      //arrange
      const movie = {id: 'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_MOVIE_SUCCESS,
        movie: movie
      };

      //act
      const action = movieActions.createMovieSuccess(movie);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_MOVIES_SUCCESS when loading movies', (done) => {
    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_MOVIES_SUCCESS, body: {movies: [{id: 'clean-code', title: 'Clean Code'}]}}
    ];

    const store = mockStore({movies: []}, expectedActions, done);
    store.dispatch(movieActions.loadMovies()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_MOVIES_SUCCESS);
      done();
    });
  });
});
