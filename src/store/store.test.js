import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as movieActions from '../actions/movieActions';

describe('Store', function() {
  it('Should handle creating movies', function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const movie = {
      title: "Clean Code"
    };

    // act
    const action = movieActions.createMovieSuccess(movie);
    store.dispatch(action);

    // assert
    const actual = store.getState().movies[0];
    const expected = {
      title: "Clean Code"
    };

    expect(actual).toEqual(expected);
  });
});
