const express = require('express');
const Plate = require('../models/Plate');
const router = express.Router();

/**
 * GET /api/plates
 * ?plate=
 * ?province=
 * ?type=
 */
router.get('/', async (req, res) => {
  try {
    const {
      plate = '',
      province = '',
      type = ''
    } = req.query;

    const query = {
      plate: { $regex: plate, $options: 'i' },
      province: { $regex: province, $options: 'i' }
    };

    if (type) query.type = type;

    const data = await Plate.find(query);

    res.json({
      total: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
