```javascript
// App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello World message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});

test('centers the Hello World message', () => {
  render(<App />);
  const appElement = screen.getByRole('region', { name: 'App' });
  expect(appElement).toHaveStyle('display: flex');
  expect(appElement).toHaveStyle('justify-content: center');
  expect(appElement).toHaveStyle('align-items: center');
  expect(appElement).toHaveStyle('height: 100vh');
});
```