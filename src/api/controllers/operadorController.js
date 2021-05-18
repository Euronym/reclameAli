const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

const Operador = require("../models/operadorModel");

const checkAut = require("../middleware/check-auth");

// biblioteca para a utilização de funções relacionadas à criptografia.
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
    // modifica algum dos dados previamente informados pelo usuário.
    async edit_one(req, res){

        let opcao = req.body.opcao;
        let email = req.body.email;
        let telefone = req.body.telefone;
        Operador.findOne({email: email})
            .exec()
        .then(operador => {
            if(!operador){
                res.status(404).json({mensagem: "dados inválidos."});
            }
            else{
                switch(opcao){
                    case 1:
                        Operador.findOneAndUpdate({email: req.body.email}, {telefone: req.body.telefone},
                            null, (err, operador) => {
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
                        // solicita o email do usuário e realiza a verificação.
                        Operador.findOne({email: req.body.email}, (err, operador) => {
                                if(err){
                                    res.tatus(500).json({erro: err});
                                }
                                if(!operador){
                                    res.status(409).json({mensagem: "falha na autenticação."});
                                }
                                else{
                                    // verifica se a senha informada pelo usuário corresponde aquela armazenada.
                                    bcrypt.compare(req.body.senha, operador.senha, (err, resultado) => {
                                        if(err){
                                            res.status(500).json({erro: err});
                                        }
                                        if(resultado){ 
                                            // faz o hash da senha e armazena no servidor.
                                            bcrypt.hash(req.body.senha, 10, (err, hash) => {
                                                if(err){
                                                    res.status(500).json({erro: err});
                                                }
                                                else{
                                                    // modifica a senha do usuário.
                                                    Operador.updateOne({email: operador.email},{senha: hash} ,(err, operador) => {
                                                        if(err){
                                                            res.status(500).json({erro: err});
                                                        }
                                                        else{
                                                            res.status(200).json({mensagem: "modificação feita com sucesso."});
                                                        }
                                                    });
                                                }
                                            });
                                        }   
                                        else{
                                            res.status(409).json({mensagem: "falha na autenticação."});
                                        }
                                    });
                                }
                            });
                        break;
                    default:
                        res.status(404).json({mensagem: "opção inválida."});
                }
            }
        }).catch(err => {
            res.status(500).json({erro: err});
        });
    },
    // cria a instância de um usuário e salva na base de dados.
    async create_one(req, res){

        let nome = req.body.nome;
        let cargo = req.body.cargo;
        let telefone = req.body.telefone;
        let email = req.body.email;
         // faz a criptografia da senha.
        bcrypt.hash(req.body.senha, 10, (err, hash) => {
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
                                senha: hash
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
    // função responsável pelo login de um usuário.
    async login(req,res){
        Operador.findOne({email: req.body.email})
        .exec()
        .then(operador => {
            if(!operador){
                res.status(404).json({mensagem: "Falha na autenticação."});
            }
            else{
                bcrypt.compare(req.body.senha, operador.senha, (err, resultado) => {
                    if(err){
                        res.status(500).json({erro: err});
                    }
                    if(resultado){
                        // fornece ao usuário um token que contém dados relevantes de sua conta.
                        const token = jwt.sign(
                        {
                            email: operador.email,
                            operadorId: operador.id
                        }, 
                        process.env.JWT_KEY, 
                        {
                            expiresIn: "1h" // define a validade do token como 1hr.
                        });
                        res.status(200).json({
                            mensagem: "autenticação feita com sucesso.",
                            token: token
                        });
                    }
                    else{
                        res.status(401).json({mensagem: "falha na autenticação."});
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({erro: err});
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

        await Operador.findOne({email: email}, (err, operador) => {
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