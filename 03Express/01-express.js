const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use('views', express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'));

app.get('/pruebas', (req, res) => {
  //console.log(__dirname) //ruta donde estamos
  //res.send('Ya somos unos crack en Node+Express')
  //pasa un json con un titulo
  res.render('pruebas', { titulo: 'titulo nuevoooo', descripcion: 'descripción nueva'  })

})

app.get('/pruebas2', (req, res) => {
  //console.log(__dirname) //ruta donde estamos
  //res.send('Ya somos unos crack en Node+Express')
  //pasa un json con un titulo
  res.render('pruebas2', { titulo: 'titulo nuevoooo 2', descripcion: 'descripción nueva 2'  })

})

app.get('/contacto', (req, res) => {
  console.log(__dirname + '/public')
  res.send('Estas en contactos')
})


app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/html/404.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})