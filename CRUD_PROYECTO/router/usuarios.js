const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

/* ============================
   LISTAR TODOS LOS USUARIOS
============================ */
router.get('/', async (req, res) => {
    try {
        const arrayUsuarios = await Usuario.find().lean();
        res.render('usuarios/usuarios', { arrayUsuarios });
    } catch (error) {
        console.log("Error al obtener usuarios:", error);
        res.send("Error al obtener usuarios");
    }
});

/* ============================
   FORMULARIO CREAR USUARIO
============================ */
router.get('/crear', (req, res) => {
    res.render('usuarios/crearUsuario');
});

/* ============================
   GUARDAR NUEVO USUARIO
============================ */
router.post('/crear', async (req, res) => {
    try {
        await Usuario.create({
            DNI: req.body.DNI,
            Nombre_Completo: req.body.Nombre_Completo,
            Email: req.body.Email,
            Contrasena: req.body.Contrasena,
            Objetivo_Fisico: req.body.Objetivo_Fisico,
            Membresia: req.body.Membresia
        });

        res.redirect('/usuarios');

    } catch (error) {
        console.log("Error al crear usuario:", error);
        res.send("Error al crear usuario");
    }
});

/* ============================
   DETALLE (EDITAR / ELIMINAR)
============================ */
router.get('/:dni', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ DNI: req.params.dni }).lean();

        if (!usuario) {
            return res.render('usuarios/detalleUsuario', { error: true });
        }

        res.render('usuarios/detalleUsuario', { usuario, error: false });

    } catch (error) {
        console.log("Error al obtener usuario:", error);
        res.render('usuarios/detalleUsuario', { error: true });
    }
});

/* ============================
   EDITAR USUARIO (PUT)
============================ */
router.put('/:dni', async (req, res) => {
    try {
        await Usuario.findOneAndUpdate(
            { DNI: req.params.dni },
            {
                Nombre_Completo: req.body.Nombre_Completo,
                Email: req.body.Email,
                Contrasena: req.body.Contrasena,
                Objetivo_Fisico: req.body.Objetivo_Fisico,
                Membresia: req.body.Membresia
            }
        );

        res.json({ estado: true });

    } catch (error) {
        console.log("Error al editar usuario:", error);
        res.json({ estado: false });
    }
});

/* ============================
   ELIMINAR USUARIO (DELETE)
============================ */
router.delete('/:dni', async (req, res) => {
    try {
        await Usuario.findOneAndDelete({ DNI: req.params.dni });
        res.json({ estado: true });

    } catch (error) {
        console.log("Error al eliminar usuario:", error);
        res.json({ estado: false });
    }
});

module.exports = router;
