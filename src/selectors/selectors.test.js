import expect from 'expect';
import {directorsFormattedForDropdown} from './selectors';

describe('Director Selectors', () => {
  describe('directorsFormattedForDropdown', () => {
    it('should return author data formatted for use in a dropdown', () => {
      const directors = [
        {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
        {id: 'scott-allen',firstName: 'Scott',lastName: 'Allen'}
      ];

      const expected = [
        {value: 'cory-house', text: 'Cory House'},
        {value: 'scott-allen', text: 'Scott Allen'}
      ];

      expect(directorsFormattedForDropdown(directors)).toEqual(expected);
    });
  });
});
