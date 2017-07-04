import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const MovieListRow = ({movie}) => {
  return (
    <tr>
      <td><a href={movie.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/movie/' + movie.id}>{movie.title}</Link></td>
      <td>{movie.directorId}</td>
      <td>{movie.category}</td>
      <td>{movie.length}</td>
    </tr>
  );
};

MovieListRow.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieListRow;
