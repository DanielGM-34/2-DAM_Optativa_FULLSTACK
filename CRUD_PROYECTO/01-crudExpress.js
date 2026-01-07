const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Conexión a MongoDB
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@daniel.wxaacev.mongodb.net/${process.env.DBNAME}`;

mongoose.connect(uri)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log('Error al conectar a MongoDB:', e));

// Rutas activas
app.use('/usuarios', require('./router/usuarios'));

// Panel de administración (falseado)
app.get('/administradores', (req, res) => {
  res.render('administradores/admin');
});

// Página principal
app.get('/', (req, res) => {
  res.render('landing');
});

// 404
app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/html/404.html");
});

// Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
