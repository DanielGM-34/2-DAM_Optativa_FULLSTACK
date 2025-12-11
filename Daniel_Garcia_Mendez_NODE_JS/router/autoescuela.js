const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("autoescuela", { //pokemon será el próximo fichero que creemos, AÚN NO EXISTE
        arrayAutoescuela: [ //Esta información, posteriormente, VENDRÁ DE LA BASE DE DATOS
            {id: 'RafaEli89', nombre: 'AutoescuelaAlgaba', tipoClase: 'presencial', descripcion:'autoescuela algaba', ubicacion:'La Algaba'},
            {id: 'EnriquePipo', nombre: 'Autoescuela Enrique', tipoClase: 'semipresencial', descripcion:'Tamb', ubicacion:'San Jerónimo'},
            {id: 'SanIgnacioEscu43', nombre: 'Autoescuela San Ignacio', tipoClase: 'online', descripcion:'Qué cosa más mala', ubicacion:'San Ignacio del Viar'}
        ]
    })
})

module.exports=router;