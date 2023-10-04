const mongoose = require('mongoose');
require('dotenv').config()

// Replace <your_mongodb_uri> with your MongoDB connection URI
const mongoURI = process.env.MONGO_URI //kindly refer mongodb atlas tutorial and u can create ur own url and can jst paste here so thereafter collections will get created;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Check for successful connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

module.exports=db