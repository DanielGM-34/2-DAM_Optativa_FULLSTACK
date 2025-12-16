const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

// Crear instructor
router.post('/', async (req, res) => {
  try {
    const nuevo = new Instructor(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar instructores
router.get('/', async (req, res) => {
  const instructores = await Instructor.find();
  res.json(instructores);
});

module.exports = router;
