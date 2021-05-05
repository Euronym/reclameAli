const mongoose = require('mongoose');

const { Schema } = mongoose;

const pessoaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: String,
    telefone: Number,
    email: String,
    senha: String
});

module.exports = mongoose.model("Pessoa",pessoaSchema);
