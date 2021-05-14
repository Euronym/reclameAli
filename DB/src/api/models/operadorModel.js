const mongoose = require('mongoose');

const { Schema } = mongoose;

const operadorSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usuario: {   
    nome: String,
    telefone: Number,
    email: String,
    senha: String
  },
  cargo: String,
});


module.exports = mongoose.model("Operador",operadorSchema);
