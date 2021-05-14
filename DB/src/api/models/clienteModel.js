const mongoose = require('mongoose');

const { Schema } = mongoose;

const clienteSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usuario: {   
    nome: String,
    telefone: Number,
    email: String,
    senha: String
  },
  cpf: Number,
  rg: Number,
  unidadeConsumidora: Number,
  estaRegular: Boolean,
  cep: Number,
  complemento: String
});

module.exports = mongoose.model("Cliente",clienteSchema);
