
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import mockMovieData from './mockData/mockMovieData';

afterEach(() => jest.restoreAllMocks());

describe('<App>', () => {
  test('renders with no data', async () => {
    await act(async () => render(<App />));

    expect(screen.getByText(/No movies found/i)).toBeTruthy();
  });

  test('renders data after fetch', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({results: [mockMovieData]})
    })

    await act(async () => render(<App />));

    expect(screen.getByText(/Bigdata 2: Timeseries Bender/i)).toBeTruthy();
  });
});
