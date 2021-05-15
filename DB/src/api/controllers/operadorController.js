const mongoose = require("mongoose");

const Operador = require("../models/operadorModel");

// biblioteca para a utilização de funções relacionadas à criptografia.
const bcrypt = require('bcrypt');

module.exports = {
    // modifica algum dos dados previamente informados pelo usuário.
    //TODO  MODIFICAR SENHA E TELEFONE.
    async edit_one(req, res){

        let opcao = req.body.opcao;
        
        switch(opcao){
            case 1:
                await Operador.findOneAndUpdate({email: req.body.email}, {telefone: req.body.telefone},
                    null, (err, telefone) => {
                        if(err){
                            res.status(500).json({erro: err});
                        }
                        if(!operador){
                            res.status(404).json({mensagem: "usuário inexistente."});
                        }
                        else{
                            res.send(200).json({
                                mensagem: "telefone atualizado com sucesso",
                                telefone_antigo: telefone,
                                telefone_novo:  req.body.telefone
                            });
                        }
                    });
                break;
            case 2:
            
                break;
            case 3:
                break;
            default:
                res.status(404).json({mensagem: "opção inválida."});
        }

    },
    // cria a instância de um usuário e salva na base de dados.
    async create_one(req, res){

        let nome = req.body.nome;
        let cargo = req.body.cargo;
        let telefone = req.body.telefone;
        let email = req.body.email;
         // faz a criptografia da senha.
        let senha = bcrypt.hash(req.body.email, 10, (err, hash) => {
            if(err){
                res.status(500).json({erro: err});
            }
            else{

                // verifica se o email fornecido pelo usuário já encontra-se na base de dados.
                Operador.find({email: email}, (err, operadores) => {
                    if(err){
                        res.status(500).json({erro: err});
                    }
                    // se não houverem usuários com o email informado, pode-se criar a conta.
                    if(!operadores.length){
                        // cria um novo objeto operador com as informações obtidas.
                        const operador = new Operador({
                            _id: new mongoose.Types.ObjectId(),
                            usuario: {
                                nome: nome,
                                telefone: telefone,
                                email: email,
                                senha: senha
                            },
                            cargo: cargo
                        });
                        operador.save().then(request => {
                            res.status(201).json({mensagem: "usuário criado com sucesso."});
                        }).catch(err => {
                            res.status(500).json({erro: err});
                        });
                    }
                    else{
                        res.status(409).json({mensagem:"Não foi possível prosseguir: usuário já existe. "});
                    }        
                });         
            }
        });
    },
    async remove_one(req, res){
        let email = req.body.email;
        let senha = req.body.senha;

        await Operador.findOneAndRemove({email: email, senha: senha}, (err, operador) => {
            if(err){
                res.status(500).json({erro: err});
            }
            if(!operador){
                res.status(404).json({mensagem:"não foi possível remover."});
            }
            else{
                res.status(200).json({mensagem:"usuário removido com sucesso."});
            }
        });
    },
    async get_one(req, res){

        let email = req.body.email;
        let senha = req.body.senha;

        Operador.findOne({email: email, senha: senha}, (err, operador) => {
            if(err){
                res.status(500).json({erro: err});
            }
            if(!operador){
                res.status(404).json({mensagem:"usuário não encontrado."});
            }
            else{
                res.status(200).send(operador);
            }
        });
    },
}