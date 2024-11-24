const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const readersRoutes = require('./routes/readersRoutes');
const booksRoutes = require('./routes/booksRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(logger);

app.use('/readers', readersRoutes);
app.use('/books', booksRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
  })
  .catch((err) => console.error('Database connection error:', err));
