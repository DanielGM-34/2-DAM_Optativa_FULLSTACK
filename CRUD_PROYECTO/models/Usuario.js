const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  DNI: { type: String, required: true, unique: true },
  Nombre_Completo: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Contraseña: { type: String, required: true },
  Fecha_De_Registro: { type: Date, default: Date.now },
  Rol: { 
    type: String, 
    enum: ['cliente', 'instructor', 'admin'], 
    required: true 
  },
  // Campos opcionales según rol
  Objetivo_Físico: String,          // solo clientes
  Membresía: { type: String, enum: ['activa', 'vencida'] }, // clientes
  Especialidad: String,             // solo instructores
  Perfil_Profesional: String        // instructores
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
