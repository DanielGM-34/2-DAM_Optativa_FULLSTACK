const express = require('express')
const app = express()
const port = 3000

// Motor de vistas dinámicas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Archivos estáticos (CSS, JS, imágenes, HTML sueltos)
app.use(express.static(__dirname + '/public'))

// Rutas con EJS
app.use('/', require('./router/rutas'))
app.use('/autoescuela', require('./router/autoescuela'))


app.get('/index', (req, res) => {
  res.render('index', { titulo: 'titulo nuevoooo', descripcion: 'descripción nueva' })
})

// Ejemplo de HTML estático
app.get('/contacto', (req, res) => {
  res.sendFile(__dirname + '/public/html/contacto.html')
})

// Ejemplo de HTML estático
app.get('/quieneSomos', (req, res) => {
  res.sendFile(__dirname + '/public/html/quieneSomos.html')
})

// Página 404
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/html/404.html')
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})