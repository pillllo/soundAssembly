import { render, screen, fireEvent } from '@testing-library/react';
// NB the version of React Testing Library that ships with create-react-app
// DOESN'T have the .keyboard() functionality, so we have to use fireEvent()
import userEvent from '@testing-library/user-event';

import TagList from './TagList';
// import { createTag } from '../../ApiService.js';

describe('TagList', () => {

  const mockTags = [
    {
      name: 'Teen Pop',
      status: 'active',
    },
    {
      name: 'Country',
      status: 'active',
    },
    {
      name: 'Hairspray Rock',
      status: 'active',
    },
  ];

  // jest.mock('createTag', () => {
  //   console.log('executed')
  //   return [{ name: 'Punk' }]
  // });

  jest.mock('../../ApiService', () => {
    return {
      createTag: (tagName) => [
        ...mockTags,
        { name: tagName }]
    }
  });

  // beforeEach stuff goes here?
  render(<TagList tags={mockTags} />)

  describe('rendering the tag list', () => {

    test('should render a sorted list of tags', () => {
      const allTags = screen.getAllByTestId('taglist-tag');
      expect(allTags.length).toBe(4);
      expect(allTags[0]).toHaveTextContent('Country');
      expect(allTags[2]).toHaveTextContent('Teen Pop');
    });

  })

  describe.only('adding tags', () => {

    test('should create a new tag', async () => {

      const punkGenre = 'Punk';
      const tagInput = screen.getByTestId('taglist-input')

      // screen.debug() // <--- useful tip to see that DOM is rendering as you expect
      userEvent.type(tagInput, punkGenre);
      expect(screen.getByTestId('taglist-input')).toHaveValue(punkGenre);
      fireEvent.keyUp(tagInput, { key: 'Enter', code: 'Enter', charCode: 13 })
      // expect(screen.getByTestId('taglist-input')).toHaveTextContent('');
      // screen.debug()
      // const result = await screen.findByText(punkGenre);
      // console.log(result);
    });

    test('should not allow the creation of duplicate tags', () => {

    })

    test('should convert all entered tag names into TitleCase', () => {

    })

    test('should ignore leading / trailing whitespace in tag names', () => {

    })
  })
});



// All tags that exist in my library should be displayed