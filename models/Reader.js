const mongoose = require('mongoose');

const readerSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true, 
    minlength: 2 
  },
  lastName: { 
    type: String, 
    required: true, 
    minlength: 2 
  },
  username: { 
    type: String, 
    required: true, 
    minlength: 5 
  },
});

module.exports = mongoose.model('Reader', readerSchema);