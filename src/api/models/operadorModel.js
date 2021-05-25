const mongoose = require('mongoose');

const { Schema } = mongoose;

// define o esquema utilizado para um operador no banco de dados, com todos os atributos necessários.
const operadorSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: {type: String, required: true},
  telefone: {type: Number, required:true},
  email: {type: String, required: true, unique: true},
  senha: {type: String, required: true},
  cargo: String,
});


module.exports = mongoose.model("Operador",operadorSchema);
