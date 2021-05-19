const mongoose = require('mongoose');

const { Schema } = mongoose;

const tecnicoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  nome: {type: String, required: true},
  telefone: {type: Number, required: true},
  email: {type: String, required: true, unique: true},
  senha: {type: String, required: true},
  estaDisponivel: Boolean
});

module.exports = mongoose.model("Tecnico",tecnicoSchema);
