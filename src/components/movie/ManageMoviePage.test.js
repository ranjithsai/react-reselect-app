import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageMoviePage} from './ManageMoviePage';

describe ('Manage Movie Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      directors: [],
      actions: { saveMovie: () => { return Promise.resolve(); }},
      movie: {id: '', watchHref: '', title: '', directorId: '', length: '', category: ''}
    };

    const wrapper = mount(<ManageMoviePage {...props}/>);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');

  });
});
