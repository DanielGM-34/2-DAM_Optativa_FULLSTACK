const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



require('dotenv').config()

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use('views', express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'));

//Llamada a la ruta de router
app.use('/', require('./router/rutas'));

//LLamada a pokemon
app.use('/pokemon', require('./router/pokemon'))

//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales


// Usa backticks para interpolar la variable dbname
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@daniel.wxaacev.mongodb.net/${process.env.DBNAME}`;

mongoose.connect(uri)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

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

