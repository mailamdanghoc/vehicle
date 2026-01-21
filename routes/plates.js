const express = require('express');
const Plate = require('../models/Plate');
const router = express.Router();

/**
 * GET /api/plates
 * ?plate=
 * ?province=
 * ?type=
 * ?page=1
 * ?limit=10
 */
router.get('/', async (req, res) => {
  const {
    plate = '',
    province = '',
    type = '',
    page = 1,
    limit = 200
  } = req.query;

  const query = {
    plate: { $regex: plate, $options: 'i' },
    province: { $regex: province, $options: 'i' }
  };

  if (type) query.type = type;

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Plate.find(query).skip(skip).limit(Number(limit)),
    Plate.countDocuments(query)
  ]);

  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    data
  });
});

module.exports = router;
