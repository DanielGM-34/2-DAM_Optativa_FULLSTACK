// Importamos la librería express
const express = require('express');
// Creamos un objeto router para agrupar las rutas relacionadas con "personal"
const router = express.Router();

// -------------------------
// Ruta GET: Mostrar formulario
// -------------------------
router.get('/formulario', (req, res) => {
  // Renderiza la vista "formularioPersonal.ejs" desde la carpeta /views
  // Además le pasa un objeto con la variable "tituloWeb" para mostrar en la cabecera
  res.render('formularioPersonal', { tituloWeb: 'Inscripción de personal' });
});

// -------------------------
// Ruta POST: Procesar inscripción
// -------------------------
router.post('/inscribir', (req, res) => {
  // Extraemos los datos enviados desde el formulario (req.body) 
  //PARA AGREGAR EXTRAER LOS DATOS DEL FORMULARIO SE LE AGREGA AL FORMUARIO EL METHOD="POST" Y LA ACTION="/personal/inscribir" 
  //PARA LOS ATRIBUTOS NAME EN CADA INPUT SE DEBE COLOCAR EL NOMBRE EN CADA INPUT name=nombreCampo
  //de donde vienen los campos: nombre, edad, fechaNac, email, dni, sexo

  const { nombre, edad, fechaNac, email, dni, sexo } = req.body;

  // Renderizamos la vista "resultadoPersonal.ejs" mostrando los datos recibidos
  res.render('resultadoPersonal', {
    tituloWeb: 'Resultado de inscripción',
    nombre, edad, fechaNac, email, dni, sexo
  });
});

// Exportamos el router para que pueda usarse en 01-express.js
module.exports = router;
