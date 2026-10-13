```javascript
// File: src/App.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import App from './App';

jest.mock('axios');
const mockedAxios = axios;

describe('App', () => {
  test('renders cryptocurrency price tracker and fetches initial prices', async () => {
    const mockData = {
      bitcoin: { usd: 50000 },
      ethereum: { usd: 3000 },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    render(<App />);

    // Check if initial prices are fetched and displayed
    await waitFor(() => expect(screen.getByText('$50,000')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('$3,000')).toBeInTheDocument());
    expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument();
    expect(screen.getByText('Ethereum (ETH)')).toBeInTheDocument();
  });

  test('refreshes prices when refresh button is clicked', async () => {
    const mockDataInitial = {
      bitcoin: { usd: 50000 },
      ethereum: { usd: 3000 },
    };

    const mockDataUpdated = {
      bitcoin: { usd: 52000 },
      ethereum: { usd: 3100 },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockDataInitial });
    mockedAxios.get.mockResolvedValueOnce({ data: mockDataUpdated });

    render(<App />);

    // Wait for initial prices to be fetched
    await waitFor(() => expect(screen.getByText('$50,000')).toBeInTheDocument());

    // Click the refresh button
    const refreshButton = screen.getByRole('button', { name: /refresh prices/i });
    fireEvent.click(refreshButton);

    // Wait for updated prices to be fetched and displayed
    await waitFor(() => expect(screen.getByText('$52,000')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('$3,100')).toBeInTheDocument());
  });

  test('updates refresh interval when user selects a new option', () => {
    render(<App />);

    const selectElement = screen.getByRole('combobox');

    // Select 5 minutes option
    fireEvent.change(selectElement, { target: { value: '300000' } });

    // Check if selected option is displayed
    expect(selectElement).toHaveValue('300000');
  });
});
```