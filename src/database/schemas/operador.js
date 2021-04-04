const mongoose = require('mongoose');

const pessoaSchema = require("../schemas/pessoa.js");

const { Schema } = mongoose;

const operadorSchema = new Schema({
  usuario: pessoaSchema,
  cargo: String,
});


module.exports = operadorSchema;