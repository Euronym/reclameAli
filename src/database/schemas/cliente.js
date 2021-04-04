const mongoose = require('mongoose');

const pessoaSchema = require("../schemas/pessoa.js");

const { Schema } = mongoose;

const clienteSchema = new Schema({
  usuario: pessoaSchema,
  cpf: Number,
  rg: Number,
  unidadeConsumidora: Number,
  estaRegular: Boolean,
  cep: Number,
  complemento: String
});

module.exports = clienteSchema;