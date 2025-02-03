const express = require('express');
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menu');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Import and execute the cron job
require('./cron');

app.use(express.json());
app.use('/api', menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});