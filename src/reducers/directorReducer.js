import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function directorReducer(state = initialState.directors, action) {
  switch (action.type) {
    case types.LOAD_DIRECTORS_SUCCESS:
      return action.directors;

    default:
      return state;
  }
}
