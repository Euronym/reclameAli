const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Tecnico = require("../models/tecnicoModel");

module.exports = {
    // modifica o estado do técnico para disponível ou indisponível.
    async edit_state(req, res){

       await Tecnico.findOne({_id :req.body.tecnicoId}).
       then(tecnico => {
            if(!tecnico){
                return res.status(404).json({mensagem: "não há técnicos registrados."});
            }
            else{  
                Tecnico.updateOne({_id: req.body.tecnicoId}, {estaDisponivel: !tecnico.estaDisponivel}, (err, tecnico) => {
                    if(err){
                        return res.status(500).json({erro: err});
                    }
                    else{
                        return res.status(200).json({mensagem: "estado alterado com sucesso."});
                    }
                });
            }
       }).catch(err => {
            return res.status(500).json({erro: err});
       });
    },
    // obtém todos os técnicos registrados.
    async get_all(req, res){
        await Tecnico.find({}, (err, tecnicos) => {
            if(err){
                return res.status(500).json({erro: err});
            }
            if(!tecnicos.length){
                return res.status(404).json({mensagem: "não há tecnicos disponíveis."});
            }
            else{
                return res.status(200).json(err);
            }
        });
    },
    // obtém um técnico disponível para atender a solicitação.
    async get_one(req, res){
        await Tecnico.find({nome: req.body.nome}, (err, tecnicos) => {
            if(err){
                return res.status(500).json({erro: err});
            }
            if(!tecnicos.length){
                return res.status(404).json({mensagem: "Não há técnicos disponíveis."});
            }
            else{
                return res.status(200).json(tecnicos);
            }
        });
    },
    // adiciona um técnico para a base de dados.
    async add_one(req, res){

        let email = req.body.email;
        let senha = req.body.senha;
        let telefone = req.body.telefone;
        let nome = req.body.nome;

        // faz o hash da senha criada pelo usuário e verifica a existência de possíveis erros.
        bcrypt.hash(req.body.senha, 10).then(hash => {

            Tecnico.find({email: email}).exec().then(tecnicos => {
                if(!tecnicos.length){
                    const tecnico = new Tecnico({
                        _id: new mongoose.Types.ObjectId(),
                        usuario: {   
                        nome: nome,
                        telefone: telefone,
                        email: email,
                        senha: hash
                        },
                        estaDisponivel: true
                    });   
                    tecnico.save().then(_request => {
                        return res.status(201).json({mensagem: "usuário criado com sucesso."});
                    })
                    .catch(err => {
                        return res.status(500).json({erro: err});
                    });
                }
                else{
                    return res.status(409).json({mensagem: "não foi possível prosseguir: usuário já existe."});
                }
            })
            .catch(err => {
                return res.status(500).json({erro: err});
            });
        })
        .catch(err => {
            return res.status(500).json({erro: err});
        });
    },
    // remove um dos técnicos.
    async delete_one(req, res){

        await Tecnico.findOneAndRemove({_id: req.body.tecnicoId}, (err, tecnico) => {
            if(err){
                return res.status(500).json({erro: err});
            }
            if(!tecnico){
                return res.status(404).json({mensagem: "técnico inexistente."});
            }
            else{
                return res.status(200).json({mensagem: "tecnico removido."});
            }
        });
    }

}