```javascript
// App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { AuthContext } from './App';

describe('App Component', () => {
  test('renders Home component as default', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the Simple React App/i)).toBeInTheDocument();
  });

  test('renders Login component when on /login route and not authenticated', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders Dashboard component when on /dashboard route and authenticated', () => {
    const value = { isAuthenticated: true, login: () => {}, logout: () => {} };
    render(
      <AuthContext.Provider value={value}>
        <App />
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByText(/Dashboard/i));
    expect(screen.getByText(/Welcome to the dashboard/i)).toBeInTheDocument();
  });

  test('redirects to Login when trying to access Dashboard without authentication', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Dashboard/i));
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
```