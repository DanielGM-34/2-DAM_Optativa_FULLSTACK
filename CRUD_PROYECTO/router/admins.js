const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Crear administrador
router.post('/', async (req, res) => {
  try {
    const nuevo = new Admin(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar administradores
router.get('/', async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});

module.exports = router;
