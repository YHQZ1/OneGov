// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Diagnostics: show whether env loaded
console.log('USE_GEMINI:', process.env.USE_GEMINI);
console.log('GEMINI_KEY exists?', !!process.env.GEMINI_API_KEY);
console.log('OPENAI_KEY exists?', !!process.env.OPENAI_KEY);

// Routes
const helloRoute = require('./routes/hello'); // keep existing hello if present
const chatRoute = require('./routes/chat');

app.use('/api', helloRoute);
app.use('/api', chatRoute);

// Root check
app.get('/', (req, res) => res.send('Backend is running!'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});