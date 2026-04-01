import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page replacement simulator', () => {
  render(<App />);
  const linkElement = screen.getByText(/Page Replacement Algorithm Simulator/i);
  expect(linkElement).toBeInTheDocument();
});
