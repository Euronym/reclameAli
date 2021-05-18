const mongoose = require('mongoose');

const { Schema } = mongoose;

const operadorSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usuario: {   
    nome: {type: String, required: true},
    telefone: {type: Number, required:true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
  },
  cargo: String,
});


module.exports = mongoose.model("Operador",operadorSchema);
