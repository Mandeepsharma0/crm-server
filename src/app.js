const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./services/auth.service');
const connectDB = require('./config/db.config');
require('dotenv').config();

const app = express();

// 🛡️ Required for secure cookies on Render (behind proxy)
app.set('trust proxy', 1); 

// 🌐 CORS for cross-origin frontend access
app.use(cors({
  origin: 'https://crm-client-laej.onrender.com' || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// 🔐 Secure session config
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'None', // ✅ Allows cookies across domains
    secure: true      // ✅ Required for HTTPS (Render)
  }
}));

// 🧭 Passport session handling
app.use(passport.initialize());
app.use(passport.session());

// 🔗 Connect to MongoDB
connectDB();

// 📦 Define your routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/campaigns', require('./routes/campaign.routes'));
app.use('/api/ai', require('./routes/gemini.routes'));

// 🚀 Launch the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
