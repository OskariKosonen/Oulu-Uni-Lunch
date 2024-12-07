const express = require('express');
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menu');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api', menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});