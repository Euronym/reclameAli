const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

const Operador = require("../models/operadorModel");

const Cliente = require("../models/clienteModel");

const checkAut = require("../middleware/check-auth");

// biblioteca para a utilização de funções relacionadas à criptografia.
const bcrypt = require('bcrypt');

dotenv.config({path: '../.env'});

module.exports = {
    // método para apresentação. Em uma situação real não estaria aqui, mas clientes precisam ser 
    // inseridos para teste.
    async create_client(req, res){

        await Cliente.find({email: req.body.email}).exec()
        .then(clientes => {
            if(!clientes.length){
                
                bcrypt.hash(req.body.senha, 10)
                .then(hash => {
                    const cliente = new Cliente({
                        _id: new mongoose.Types.ObjectId(),
                        nome: req.body.nome,
                        senha: hash,
                        telefone: req.body.telefone,
                        email: req.body.email,
                        cpf: req.body.cpf,
                        rg: req.body.rg,
                        unidadeConsumidora: req.body.unidadeConsumidora,
                        estaRegular: true,
                        cep: req.body.cep,
                        complemento: req.body.complemento
                    });
                    cliente.save()
                    .then(_result => {
                        return res.status(200).json({mensagem: "cliente registrado com sucesso."});
                    })
                    .catch(err => {
                        return res.status(500).json({erro: err});
                    });
                })
                .catch(err => {
                    res.status(500).json({erro: err});
                });
            }
            else{
                return res.status(409).json({mensagem: "usuário já existe."});
            }
        })
        .catch(err => {
            return res.status(500).json({erro: err});
        });
    },
    // modifica algum dos dados previamente informados pelo usuário.
    async edit_one(req, res){

        let opcao = req.body.opcao;

        await Operador.findOne({email: req.body.email}).exec()
        .then(operador => {
            if(!operador){
                return res.status(404).json({mensagem: "dados inválidos."});
            }
            else{
                switch(Number(opcao)){
                    case 1:
                        // procura por algum operador cujo email corresponde com o informado e modifica o telefone
                        Operador.updateOne({email: req.body.email}, {telefone: req.body.telefone}).exec()
                        .then(result => {
                            if(!result){
                                return res.status(404).json({mensagem: "usuario não encontrado."});
                            }
                            else{
                                return res.status(200).json({mensagem: "telefone atualizado com sucesso."});
                            }
                        })
                        .catch(err => {
                            return res.status(500).json({erro: err});
                        });
                        break;
                    case 2:
                        // solicita o email do usuário e realiza a verificação.
                        bcrypt.compare(req.body.senha, operador.senha)
                        .then(result => {
                            if(result){
                                bcrypt.hash(req.body.novaSenha, 10, (err, hash) => {
                                    if(err){
                                        res.status(500).json({erro: err});
                                    }
                                    else{
                                        operador.updateOne({email: req.body.email}, {senha: hash}).exec()
                                        .then(result => {
                                            if(result){
                                                res.status(200).json({mensagem: "senha atualizada com sucesso."});
                                            }
                                            else{
                                                res.status(404).json({mensagem: "usuario não encontrado."});
                                            }
                                        }).catch(err => {
                                            res.status(500).json({erro: err});
                                        });
                                    }
                                });
                            }
                            else{
                                res.status(401).json({mensagem: "falha na autenticação."});
                            }
                        })
                        .catch(err => {
                            return res.status(500).json({erro: err});
                        });
                        break;
                    default:
                        return res.status(404).json({mensagem: "opção inválida."});
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
                        return res.status(500).json({erro: err});
                    }
                    // se não houverem usuários com o email informado, pode-se criar a conta.
                    if(!operadores.length){
                        // cria um novo objeto operador com as informações obtidas.
                        const operador = new Operador({
                            _id: new mongoose.Types.ObjectId(),        
                            nome: nome,
                            telefone: telefone,
                            email: email,
                            senha: hash,
                            cargo: cargo
                        });
                        operador.save().then(request => {
                            res.status(201).json({mensagem: "usuário criado com sucesso.", usuario: request});
                        }).catch(err => {
                            res.status(500).json({erro: err});
                        });
                        return ;
                    }
                    else{
                        return res.status(409).json({mensagem:"Não foi possível prosseguir: usuário já existe. "});
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
                return res.status(404).json({mensagem: "Falha na autenticação."});
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
                return;
            }
        })
        .catch(err => {
            return res.status(500).json({erro: err});
        });
    },
    // remove um dos operadores do banco de dados.
    async remove_one(req, res){

        let email = req.body.email;

        await Operador.findOne({email: email}, (err, operador) => {
            if(err){
                return res.status(500).json({erro: err});
            }
            if(!operador){
                return res.status(404).json({mensagem:"não foi possível remover."});
            }
            else{
                bcrypt.compare(req.body.senha, operador.senha)
                .then(result => {
                    if(result){
                        Operador.remove({email: email}, (err) => {
                            if(err){
                                res.status(500).json({erro: err});
                            }
                            else{
                                res.status(200).json({mensagem: "usuário removido com sucesso."});
                            }
                            return ;
                        });
                    }
                    else{
                        res.status(401).json({mensagem: "falha na autenticação."});
                    }
                }).catch(err => {
                    res.status(500).json({erro: err});
                })
                return; 
            }
        });
    },
    // obtém um operador utilizando como base o seu id.
    async get_one(req, res){

        await Operador.findOne({_id: req.body.id}, (err, operador) => {
            if(err){
                return res.status(500).json({erro: err});
            }
            if(!operador){
                return res.status(404).json({mensagem:"não encontrado."});
            }
            else{
                res.status(200).json(operador);
            
               return;
            }
        });
    },
}