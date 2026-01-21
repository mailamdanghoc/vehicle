const mongoose = require('mongoose');

const plateSchema = new mongoose.Schema({
  plate: String,
  price: Number,
  province: String,
  type: String
});

module.exports = mongoose.model('Plate', plateSchema);
