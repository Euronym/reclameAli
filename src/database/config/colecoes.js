/*  Cria as coleções e estabelece a conexão com o banco de dados. */

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/projetos2DB', {useNewUrlParser: true, useUnifiedTopology: true});

const tecnicoSchema  = require("../schemas/tecnico.js");
const operadorSchema = require("../schemas/operador.js");
const clienteSchema = require("../schemas/cliente.js");
const pessoaSchema = require("../schemas/pessoa.js");

const Cliente = mongoose.model("Clientes",tecnicoSchema);
const Operador = mongoose.model("Operadores",operadorSchema);
const Tecnico = mongoose.model("Tecnicos",clienteSchema);
const Pessoa = mongoose.model("Pessoas",pessoaSchema);

// pequeno teste para verificar a funcionalidade.
const Bruno = new Pessoa({
    nome: "Bruno Martins",
    telefone: 40028922,
    email: "bruno@hotmail.com",
    senha: "algo"
});
Bruno.save();
const tecnico = new Tecnico({
   usuario: Bruno,
   estaDisponivel: false,

});
tecnico.save();




