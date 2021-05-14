const mongoose = require("mongoose");

const Tecnico = require("../models/tecnicoModel");

module.exports = {
    // modifica o estado do técnico para disponível ou indisponível.
    async edit_state(req, res){

        Tecnico.findOneAndUpdate({estaDisponivel});
    },
    // obtém todos os técnicos registrados.
    async get_all(req, res){

    },
    // obtém um técnico disponível para atender a solicitação.
    async get_one(req, res){

    },
    // adiciona um técnico para a base de dados.
    async add_one(req, res){

    },
    // remove um dos técnicos.
    async delete_one(req, res){

    }

}