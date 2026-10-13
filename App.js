```jsx
// File: src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(60000); // Default to 1 minute

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'bitcoin,ethereum',
            vs_currencies: 'usd'
          }
        });
        setBtcPrice(response.data.bitcoin.usd);
        setEthPrice(response.data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleRefresh = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin,ethereum',
          vs_currencies: 'usd'
        }
      });
      setBtcPrice(response.data.bitcoin.usd);
      setEthPrice(response.data.ethereum.usd);
    } catch (error) {
      console.error('Error refreshing prices:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cryptocurrency Price Tracker</h1>
      </header>
      <main className="App-main">
        <div className="App-price-display">
          <h2>Bitcoin (BTC)</h2>
          <p>${btcPrice?.toLocaleString() || 'Loading...'}</p>
        </div>
        <div className="App-price-display">
          <h2>Ethereum (ETH)</h2>
          <p>${ethPrice?.toLocaleString() || 'Loading...'}</p>
        </div>
        <button className="App-refresh-button" onClick={handleRefresh}>
          Refresh Prices
        </button>
        <div className="App-settings">
          <h3>Refresh Interval</h3>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
          >
            <option value={60000}>1 minute</option>
            <option value={300000}>5 minutes</option>
            <option value={600000}>10 minutes</option>
          </select>
        </div>
      </main>
    </div>
  );
}

export default App;
```