const express = require('express');
const {
  getAllReaders,
  getReaderById,
  createReader,
  updateReader,
  deleteReader,
  addBookToReader,
  removeBookFromReader
} = require('../controllers/readersController');

const router = express.Router();

router.get('/', getAllReaders);
router.get('/:id', getReaderById);
router.post('/', createReader);
router.put('/:id', updateReader);
router.delete('/:id', deleteReader);
router.post('/:id/books', addBookToReader);
router.delete('/:id/books/:bookId', removeBookFromReader);


module.exports = router;