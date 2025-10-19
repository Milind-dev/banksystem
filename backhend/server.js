// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Here is your data', data: [1, 2, 3] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
