// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const helloRoute = require('./routes/hello');   // optional, just a sample
const chatRoute = require('./routes/chat');     // voice/chatbot route
const authRoute = require('./routes/auth');     // 👈 your login/register

// Mount routes
app.use('/api', helloRoute);
app.use('/api', chatRoute);
app.use('/api/auth', authRoute);

// Health check
app.get('/', (req, res) => res.send('Backend is running 🚀'));

// Debug logs (keys exist, not their values!)
console.log('USE_GEMINI:', process.env.USE_GEMINI === 'true');
console.log('GEMINI_KEY exists?', !!process.env.GEMINI_API_KEY);
console.log('OPENAI_KEY exists?', !!process.env.OPENAI_KEY);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});