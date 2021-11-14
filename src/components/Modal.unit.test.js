
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import mockMovieData from './mockData/mockMovieData';

describe('<Modal>', () => {
  test('renders with data', () => {
    const modalData = mockMovieData;
    const spy = jest.fn()

    render(<Modal modalData={modalData} setModalData={spy} />);

    expect(screen.getByTestId('Modal')).toBeTruthy();
    expect(document.querySelector('img').src).toContain('https://via.placeholder.com/150');
    
    expect(screen.getByText(/Bigdata 2: Timeseries Bender/i)).toBeTruthy();
    expect(screen.getByText(/November 11, 2021/i)).toBeTruthy();

    fireEvent.click(screen.getByTestId('Modal-close'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});