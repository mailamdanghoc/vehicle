const mongoose = require('mongoose');

module.exports = function connectDB() {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Mongo connected'))
    .catch(err => {
      console.error('❌ Mongo error', err);
      process.exit(1);
    });
};
