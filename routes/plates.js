const express = require('express');
const router = express.Router();

const plateService = require('../services/plate.service');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

/**
 * GET /api/plates (PUBLIC)
 */
router.get('/', async (req, res) => {
  try {
    const data = await plateService.findPlates(req.query);
    res.json({ total: data.length, data });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/plates (ADMIN)
 */
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const plate = await plateService.createPlate(req.body);
    res.status(201).json(plate);
  } catch (err) {
    res.status(400).json({ message: 'Create failed' });
  }
});

/**
 * PUT /api/plates/:id (ADMIN)
 */
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const plate = await plateService.updatePlate(req.params.id, req.body);
    res.json(plate);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
});

/**
 * DELETE /api/plates/:id (ADMIN)
 */
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await plateService.deletePlate(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed' });
  }
});

module.exports = router;
