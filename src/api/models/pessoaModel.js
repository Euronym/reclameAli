const mongoose = require('mongoose');

const { Schema } = mongoose;

const pessoaSchema = new Schema({
    nome: {type: String, required: true},
    telefone:{type: Number, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true}
});

module.exports = mongoose.model("Pessoa",pessoaSchema);
