require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Mongo connected'))
  .catch(err => console.error(err));

app.use('/api/plates', require('./routes/plates'));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(), // server chạy bao lâu (giây)
    timestamp: Date.now()     // thời điểm hiện tại
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
