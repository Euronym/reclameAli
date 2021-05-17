const mongoose = require('mongoose');

const { Schema } = mongoose;

const clienteSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usuario: {   
    nome: {type: String, required: true},
    telefone: {type: Number, required: true},
    email: {
      type: String, 
      required: true, 
      unique: true,
      // expressão regular para verificar o email fornecido pelo usuário é válido.
      match: / ?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]) /
    },
    senha: {type: String, required: true},
  },
  cpf: {type: Number,required: true, unique: true},
  rg: {type: Number,required: true, unique: true},
  unidadeConsumidora: {type: Number,required: true},
  estaRegular: Boolean,
  cep: {type: Number,required: true},
  complemento: String
});

module.exports = mongoose.model("Cliente",clienteSchema);

