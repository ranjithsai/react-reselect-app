import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as movieActions from '../../actions/movieActions';
import MovieForm from './MovieForm';
import {getDirectorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageMoviePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      movie: Object.assign({}, props.movie),
      errors: {},
      saving: false
    };

    this.updateMovieState = this.updateMovieState.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.movie.id != nextProps.movie.id) {
      // Necessary to populate form when existing movie is loaded directly.
      this.setState({movie: Object.assign({}, nextProps.movie)});
    }
  }

  updateMovieState(event) {
    const field = event.target.name;
    let movie = this.state.movie;
    movie[field] = event.target.value;
    return this.setState({movie: movie});
  }

  movieFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.movie.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveMovie(event) {
    event.preventDefault();

    if (!this.movieFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveMovie(this.state.movie)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Movie saved');
    this.context.router.push('/movies');
  }

  render() {
    return (
      <MovieForm
        allDirectors={this.props.directors}
        onChange={this.updateMovieState}
        onSave={this.saveMovie}
        movie={this.state.movie}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageMoviePage.propTypes = {
  movie: PropTypes.object.isRequired,
  directors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageMoviePage.contextTypes = {
  router: PropTypes.object
};

function getMovieById(movies, id) {
  const movie = movies.filter(movie => movie.id == id);
  if (movie) return movie[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const movieId = ownProps.params.id; // from the path `/movie/:id`

  let movie = {id: '', watchHref: '', title: '', directorId: '', length: '', category: ''};

  if (movieId && state.movies.length > 0) {
    movie = getMovieById(state.movies, movieId);
  }

  return {
    movie: movie,
    directors: getDirectorsFormattedForDropdown(state) // use reselect selector
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(movieActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageMoviePage);
