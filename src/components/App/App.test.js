import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

xtest('renders CatalogCount Component', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
