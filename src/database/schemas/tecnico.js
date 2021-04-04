const mongoose = require('mongoose');

const pessoaSchema = require("../schemas/pessoa.js");

const { Schema } = mongoose;

const tecnicoSchema = new Schema({
  usuario: pessoaSchema,
  estaDisponivel: Boolean
});

module.exports = tecnicoSchema;