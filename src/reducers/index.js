import {combineReducers} from 'redux';
import movies from './movieReducer';
import directors from './directorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  movies,
  directors,
  ajaxCallsInProgress
});

export default rootReducer;
