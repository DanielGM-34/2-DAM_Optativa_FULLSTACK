const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  _id: String,              // ID_Instructor
  DNI: String,              // FK Usuario
  Especialidad: String,
  Perfil_Profesional: String
});

module.exports = mongoose.model('Instructor', instructorSchema);
