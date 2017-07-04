import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as movieActions from '../../actions/movieActions';
import MovieList from './MovieList';
import {browserHistory} from 'react-router';

class MoviesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddMoviePage = this.redirectToAddMoviePage.bind(this);
  }

  movieRow(movie, index) {
    return <div key={index}>{movie.title}</div>;
  }

  redirectToAddMoviePage() {
    browserHistory.push('/movie');
  }

  render() {
    const {movies} = this.props;

    return (
      <div>
        <h1>Movies</h1>
        <input type="submit"
               value="Add Movie"
               className="btn btn-primary"
               onClick={this.redirectToAddMoviePage}/>
        <MovieList movies={movies}/>
      </div>
    );
  }
}

MoviesPage.propTypes = {
  movies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    movies: state.movies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(movieActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);
