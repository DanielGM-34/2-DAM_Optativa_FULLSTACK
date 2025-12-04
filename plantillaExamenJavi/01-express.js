// Importamos la librería express
const express = require('express');
// Creamos la aplicación express
const app = express();
// Definimos el puerto donde escuchará el servidor
const port = 3000;

// Configuramos EJS como motor de plantillas (para renderizar vistas .ejs en /views)
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos (CSS, imágenes, HTML) desde la carpeta /public
app.use(express.static(__dirname + '/public'));

// Middleware para poder leer datos enviados por formularios (req.body)
app.use(express.urlencoded({ extended: true }));

// Conexión de routers:
// - '/' usa el router principal (router/rutas.js)
// - '/personal' usa el router de inscripción de personal (router/personal.js)
app.use('/', require('./router/rutas'));
app.use('/personal', require('./router/personal'));

// Middleware de error 404: si no se encuentra la ruta, se devuelve la página 404.html
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/html/404.html');
});

// Arrancamos el servidor en el puerto indicado y mostramos mensaje en consola
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
