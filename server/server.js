const express = require('express');
const mongoose = require('mongoose');
const notes = require('./routes/notes/notes');
const authenticate = require('./routes/auth/auth');
const { notFound, errorHandler } = require('./middlewares/errors');
const authorize = require('./middlewares/auth');
require('dotenv').config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our notes api 🤘' });
});

app.use('/api/notes', authorize, notes);
app.use('/api/auth', authenticate);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
try {
  mongoose.connect(process.env.MONGODB_URI);
  app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
} catch (err) {
  console.log(err);
  process.exit(1);
}
