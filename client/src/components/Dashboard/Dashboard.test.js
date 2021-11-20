import { render, screen, act, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import TagList from '../TagList/TagList';
import Dashboard from './Dashboard';

function MockDashboard (props) {
  return (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  )
}

jest.mock('../../ApiService', () => {
  const code = 'some code';
  return {
    getLibrary: () => {
      // console.log('MOCKED ApiService.getLibrary() called')
      return Promise.resolve(mockLibrary);
    },
    login: () => {
      // console.log('MOCKED ApiService.login() called')
      return Promise.resolve(code);
    }
  }
});

const mockLibrary = [
  {
    username: 'TEST USER',
    tags: [
      { name: 'Indie'},
      { name: 'Rock'},
      { name: 'Pop'},
    ],
    artists: [
      {
        _id: 'jhdfkgjldkjfglkdfjgl',
        id: 0,
        artistTags: [{ name: 'Indie' }, { name: 'Rock' }],
        name: 'Rick',
        images: [
          { url: 'https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg'}
        ]
      },
      {
        _id: 1,
        id: 1,
        artistTags: [{ name: 'Indie' }],
        name: 'Nick',
        images: [
          { url: 'https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg'}
        ]
      },
      {
        _id: 2,
        id: 2,
        artistTags: [],
        name: 'Sammy',
        images: [
          { url: 'https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg'}
        ]
      },
      {
        _id: 3,
        id: 3,
        artistTags: [{ name: 'Pop' }],
        name: 'Tammy',
        images: [
          { url: 'https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg'}
        ]
      },
    ],
  }
];

describe('Dashboard', () => {
  test.only('should display artists that match the selected tag', async () => {
    render(<MockDashboard />);
    await waitFor(() => userEvent.click(screen.getByText('Indie')));
    expect(screen.getByText('Rick')).toBeInTheDocument()
    expect(screen.getByText('Nick')).toBeInTheDocument()
    expect(screen.queryByText('Sammy')).not.toBeInTheDocument();
    await waitFor(() => userEvent.click(screen.getByText('Indie')));
    expect(screen.getByText('Sammy')).toBeInTheDocument()
  })
})