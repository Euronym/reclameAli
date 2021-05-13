const mongoose = require("mongoose");

const Operador = require("../models/operadorModel");

module.exports = {

    async edit_one(req, res){

    },
    async create_one(req, res){

        let nome = req.body.nome;
        let telefone = req.body.telefone;
        let email = req.body.email;
        let senha = req.body.senha;
        let cargo = req.body.cargo;

        await Operador.find({email: email}, (err, operadores) => {
            if(err){
                console.log(err);
            }
            if(!operadores.length){

                const operador = new Operador({
                    _id: new mongoose.Types.ObjectId(),
                    usuario: {
                        nome: nome,
                        telefone: telefone,
                        email: email,
                        senha: senha
                    },
                });
            }
            else{
                res.status(404).json({"messagem":"Não foi possível prosseguir: usuário já existe. "});
            }
        });         
    },
    async remove_one(req, res){
        let email = req.body.email;
        let senha = req.body.senha;

        await Operador.findOne({email: email, senha: senha}, (err, operador) => {
            
        });
    },
    async get_all(req, res){

    },
    async get_one(req, res){

    },
}