import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TagList from './TagList';
import { createTag } from '../../ApiService.js';

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

  jest.mock('../../ApiService.js', () => ({
    createTag: () => ([{name: 'Punk'}])
  }));

  // beforeEach stuff goes here?

  describe('rendering the tag list', () => {

    test('should render a sorted list of tags', () => {
      render(<TagList tags={mockTags} />)
      const allTags = screen.getAllByTestId('taglist-tag');
      expect(allTags.length).toBe(4);
      expect(allTags[0]).toHaveTextContent('Country');
      expect(allTags[2]).toHaveTextContent('Teen Pop');
    });

  })

  describe('adding tags', () => {

    test.only('should call createTag with the right input', async () => {

      const createTag = jest.fn();
      const tag = { name: 'Punk' };

      render(<TagList tags={mockTags} />)

      const tagInput = screen.getByPlaceholderText('add tag...')

      userEvent.type(tagInput, 'Punk');
      fireEvent.keyDown(tagInput, { key: 'Enter', code: 'Enter' })
      console.log(`typeof createTag: ${typeof createTag}`)

      // createTag.mockResolvedValue([
      //   {
      //     name: 'Teen Pop',
      //     status: 'active',
      //   },
      //   {
      //     name: 'Country',
      //     status: 'active',
      //   },
      //   {
      //     name: 'Hairspray Rock',
      //     status: 'active',
      //   },
      //   {
      //     name: tag.name,
      //     status: 'active',
      //   },
      // ])

      // await waitFor(() => expect(createTag).toHaveBeenCalledTimes(1))
      // expect(createTag).toHaveBeenCalledWith(tag)

      const allTags = await screen.findAllByTestId('taglist-tag');
      console.log('🎯 allTags', allTags);
      expect(allTags).toHaveTextContent('Punk');





    })
  })


  test('should show the new tag in the list when a tag is created', () => {
    // search for element that contains the tag

  })

  test('should not allow the creation of duplicate tags', () => {

  })

  test('should convert all entered tag names into TitleCase', () => {

  })

  test('should ignore leading / trailing whitespace in tag names', () => {

  })

});



// All tags that exist in my library should be displayed