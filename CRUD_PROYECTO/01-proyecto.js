// 01-proyecto.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ===== Middlewares =====
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ===== Configuración de vistas y estáticos =====
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/templates'); // mejor apuntar a /views/templates
app.use(express.static(__dirname + '/public'));

// ===== Conexión a MongoDB =====
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@daniel.wxaacev.mongodb.net/${process.env.DBNAME}`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[DB] Conectado a MongoDB'))
  .catch(err => console.error('[DB] Error de conexión:', err.message));

// ===== Rutas principales =====
app.use('/', require('./router/rutas')); // rutas generales

// ===== Entidades generales del Gimnasio Inteligente =====
app.use('/usuarios', require('./router/usuarios'));
app.use('/clientes', require('./router/clientes'));
app.use('/instructores', require('./router/instructores'));
app.use('/admins', require('./router/admins'));

// ===== Vistas de prueba =====
app.get('/pruebas', (req, res) => {
  res.render('pruebas', { titulo: 'Prueba 1', descripcion: 'Descripción de prueba 1' });
});

app.get('/pruebas2', (req, res) => {
  res.render('pruebas2', { titulo: 'Prueba 2', descripcion: 'Descripción de prueba 2' });
});

app.get('/contacto', (req, res) => {
  res.send('Estás en la sección de contacto');
});

// ===== Manejo de errores 404 =====
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/html/404.html');
});

// ===== Arranque del servidor =====
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[HTTP] Servidor escuchando en puerto ${port}`);
});
