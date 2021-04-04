const mongoose = require('mongoose');

const { Schema } = mongoose;

const pessoaSchema = new Schema({
    nome: String,
    telefone: Number,
    email: String,
    senha: String
});

module.exports = pessoaSchema;