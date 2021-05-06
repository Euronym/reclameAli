const mongoose = require('mongoose');

const { Schema } = mongoose;

const tecnicoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usuario: {   
    nome: String,
    telefone: Number,
    email: String,
    senha: String
  },
  estaDisponivel: Boolean
});

module.exports = mongoose.model("Tecnico",tecnicoSchema);
