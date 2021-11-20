import { render, screen, waitFor} from '@testing-library/react';
// NB the version of React Testing Library that ships with create-react-app
// DOESN'T have the .keyboard() functionality, so we have to use fireEvent()
import userEvent from '@testing-library/user-event';

import TagList from './TagList';
import ApiService from '../../ApiService';

jest.mock('../../ApiService', () => {
  return {
    createTag: (tagName) => {
      // console.log('MOCKED createTag() called')
      return [
        ...mockTags,
        { name: tagName }
      ]
    }
  }
});

const INITIAL_TAGS = [
  { name: 'Teen Pop', status: "inactive"},
  { name: 'Country', status: "inactive"},
  { name: 'Hairspray Rock', status: "inactive"},
];

let mockTags = [];

function mockedSetTags (newList) {
  mockTags = [...newList];
}

const { rerender } = render(<TagList tags={INITIAL_TAGS} setTags={mockedSetTags}/>);

describe.skip('TagList', () => {

  beforeEach(() => {
    mockTags = [...INITIAL_TAGS];
  })

  describe('rendering the tag list', () => {

    test('should render a sorted list of tags', () => {
      const allTags = screen.getAllByTestId('taglist-tag');
      expect(allTags.length).toBe(3);
      expect(allTags[0]).toHaveTextContent('Country');
      expect(allTags[2]).toHaveTextContent('Teen Pop');
    });

  })

  describe('adding tags', () => {

    test.only('should create a new tag', async () => {
      const punkGenre = 'Punk';
      const tagInput = screen.getByPlaceholderText('add tag...');
      const submitBtn = screen.getByRole('button', {name: 'Submit tag'});

      // screen.debug() // <--- useful tip to see that DOM is rendering as you expect
      userEvent.type(tagInput, punkGenre);
      await waitFor(() => userEvent.click(submitBtn));

      rerender(<TagList tags={mockTags}/>);
      const allTags = screen.getAllByTestId('taglist-tag');
      expect(allTags[2]).toHaveTextContent('Punk');
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