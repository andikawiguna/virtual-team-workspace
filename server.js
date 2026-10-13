```javascript
// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy data for demonstration
const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' }
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Signup route (simple example, no validation or database check)
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.status(201).json({ message: 'User created successfully', user: { username } });
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the dashboard' });
});

// API Data route
app.get('/api-data', (req, res) => {
  const dummyData = {
    message: 'Here is some data from the API',
    data: { id: 1, name: 'Sample Data' }
  };
  res.json(dummyData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```