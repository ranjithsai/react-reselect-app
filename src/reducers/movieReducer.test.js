import expect from 'expect';
import movieReducer from './movieReducer';
import * as actions from '../actions/movieActions';

describe('Movie Reducer', () => {
  it('should add movie when passed CREATE_MOVIE_SUCCESS', () => {
    // arrange
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];

    const newMovie = {title: 'C'};

    const action = actions.createMovieSuccess(newMovie);

    //act
    const newState = movieReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should update movie when passed UPDATE_MOVIE_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ];

    const movie = {id: 'B', title: 'New Title'};
    const action = actions.updateMovieSuccess(movie);

    // act
    const newState = movieReducer(initialState, action);
    const updatedMovie = newState.find(a => a.id == movie.id);
    const untouchedMovie = newState.find(a => a.id == 'A');

    // assert
    expect(updatedMovie.title).toEqual('New Title');
    expect(untouchedMovie.title).toEqual('A');
    expect(newState.length).toEqual(3);
  });
});
