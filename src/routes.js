import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import MoviesPage from './components/movie/MoviesPage';
import ManageMoviePage from './components/movie/ManageMoviePage'; //eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="movies" component={MoviesPage} />
    <Route path="movie" component={ManageMoviePage} />
    <Route path="movie/:id" component={ManageMoviePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
