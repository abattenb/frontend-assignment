
import { render, screen, fireEvent } from '@testing-library/react';
import PosterContainer from './PosterContainer';
import mockMovieData from './mockData/mockMovieData';

describe('<PosterContainer>', () => {
  test('renders with data', () => {
    const movieList = [mockMovieData];

    render(<PosterContainer {...{movieList}} />);

    expect(screen.getByText(/Bigdata 2: Timeseries Bender/i)).toBeTruthy();
    expect(screen.getByText(/9.9/i)).toBeTruthy();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('Modal')).toBeTruthy();
  });
});