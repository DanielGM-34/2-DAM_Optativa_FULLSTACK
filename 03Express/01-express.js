const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('¡No sabes nada!')
})

app.get('/contacto', (req, res) => {
  console.log(__dirname + '/public')
  res.send('¡Estás en contactos!')
})


app.listen(port, () => {
    console.log(__dirname + '/public')
  console.log(`Example app listening on port ${port}`)
})
