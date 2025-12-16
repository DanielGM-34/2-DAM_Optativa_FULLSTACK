const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
  _id: String,              // ID_Cliente
  DNI: String,              // FK Usuario
  Objetivo_Físico: String,
  Fecha_Alta: Date,
  Membresía: String         // activa | vencida
});

module.exports = mongoose.model('Cliente', clienteSchema);