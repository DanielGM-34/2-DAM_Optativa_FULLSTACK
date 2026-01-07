const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    DNI: {
        type: String,
        required: true,
        trim: true
    }, 
    Nombre_Completo: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true
    },
    Contrasena: {
        type: String,
        required: true
    },
    Objetivo_Fisico: {
        type: String,
        required: true,
        trim: true
    },
    Membresia: {
        type: String,
        enum: ['activa', 'vencida'],
        default: 'activa'
    },
    Fecha_De_Registro: {
        type: Date,
        default: Date.now
    }
});

// Índice único por DNI
UsuarioSchema.index({ DNI: 1 }, { unique: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);