const mongoose = require('mongoose');

const { Schema } = mongoose;

// define o esquema utilizado para um técnico no banco de dados, com todos os atributos necessários.
const tecnicoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  nome: {type: String, required: true},
  telefone: {type: Number, required: true},
  email: {type: String, required: true, unique: true},
  senha: {type: String, required: true},
  estaDisponivel: Boolean
});

module.exports = mongoose.model("Tecnico",tecnicoSchema);
