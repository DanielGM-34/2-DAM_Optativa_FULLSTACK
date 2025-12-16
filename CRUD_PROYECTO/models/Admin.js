const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  _id: String,              // ID_Admin
  DNI: String               // FK Usuario
});

module.exports = mongoose.model('Admin', adminSchema);
