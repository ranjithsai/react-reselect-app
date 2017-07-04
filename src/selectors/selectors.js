import { createSelector } from 'reselect';

const getDirectors = state => state.directors; // input dropdown selector

export const getDirectorsFormattedForDropdown = createSelector(
	
	[getDirectors], // selectors

	(directors) => { // callback function that returns memoized data
		return directors.map(director => {
			return {
				value: director.id,
				text: director.firstName + ' ' + director.lastName
			};
		});
	}
);

// similarly create and export multiple selectors as needed.
