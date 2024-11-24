const Reader = require('../models/Reader');
const Book = require('../models/Book');

exports.getAllReaders = async (req, res) => {
  try {
    const readers = await Reader.find();
    res.status(200).json(readers);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getReaderById = async (req, res) => {
  try {
    const reader = await Reader.findById(req.params.id);
    if (!reader) return res.status(404).json({ error: 'Reader not found' });
    res.status(200).json(reader);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.createReader = async (req, res) => {
  try {
    const { firstName, lastName, username } = req.body;
    const reader = new Reader ({ firstName, lastName, username });
    await reader.save();
    res.status(201).json(reader);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateReader = async (req, res) => {
  try {
    const reader = await Reader.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reader) return res.status(404).json({ error: 'Reader not found' });
    res.status(200).json(reader);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deleteReader = async (req, res) => {
  try {
    const reader = await Reader.findByIdAndDelete(req.params.id);
    if (!reader) return res.status(404).json({ error: 'Reader not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.addBookToReader = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookId } = req.body;

    const reader = await Reader.findById(id);
    if (!reader) return res.status(404).json({ error: 'Reader not found' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    if (reader.books && reader.books.includes(bookId)) {
      return res.status(400).json({ error: 'Book already borrowed' });
    }

    reader.books = [...(reader.books || []), bookId];
    await reader.save();

    res.status(200).json({ message: 'Book borrowed successfully', reader });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeBookFromReader = async (req, res) => {
  try {
    const { id, bookId } = req.params;

    const reader = await Reader.findById(id);
    if (!reader) return res.status(404).json({ error: 'Reader not found' });

    if (!reader.books || !reader.books.includes(bookId)) {
      return res.status(400).json({ error: 'Book not borrowed' });
    }

    reader.books = reader.books.filter((b) => b.toString() !== bookId);
    await reader.save();

    res.status(200).json({ message: 'Book returned successfully', reader });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


