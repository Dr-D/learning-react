import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders tic tac toe', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Tic Tac Toe/i);
  expect(linkElement).toBeInTheDocument();
});
