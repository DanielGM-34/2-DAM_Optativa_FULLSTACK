const express = require('express');
const router = express.Router();

// Agrupación de rutas principales
router.use('/usuarios', require('./usuarios'));
router.use('/clientes', require('./clientes'));
router.use('/instructores', require('./instructores'));
router.use('/admins', require('./admins'));

module.exports = router;
