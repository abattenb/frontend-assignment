
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SearchBox from './SearchBox';

describe('<SearchBox>', () => {
  test('fires search hook', async () => {
    const spy = jest.fn()
    render(<SearchBox setSearchQuery={spy} />);

    const search = screen.getByPlaceholderText(/Search for a movie/i);
    expect(search).toBeTruthy();

    fireEvent.change(screen.getByPlaceholderText(/Search for a movie/i), {target: {value: 'Time'}})
    expect(search.value).toBe('Time');

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
      fireEvent.change(screen.getByPlaceholderText(/Search for a movie/i), {target: {value: 'Database'}})
      expect(search.value).toBe('Database');
    })

    expect(spy).toHaveBeenCalledTimes(2);
  });
});