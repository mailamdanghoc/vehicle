const mongoose = require('mongoose');

const plateSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    default: 0
  },
  province: {
    type: String,
    index: true
  },
  type: {
    type: String,
    index: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plate', plateSchema);
