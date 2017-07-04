import DirectorApi from '../api/mockDirectorApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadDirectorsSuccess(directors) {
  return {type: types.LOAD_DIRECTORS_SUCCESS, directors};
}

export function loadDirectors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return DirectorApi.getAllDirectors().then(directors => {
      dispatch(loadDirectorsSuccess(directors));
    }).catch(error => {
      throw(error);
    });
  };
}
