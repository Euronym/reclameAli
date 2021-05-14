const mongoose = require("mongoose");

const Reclamacao = require("../models/reclamacaoModel");

const Cliente = require("../models/clienteModel");

/*
    Define o tipos de prioridades associadas com cada reclamação realizada.
    O único atributo realmente interessante para a aplicação é a string que representa
    o tipo de reclamação, pois a prioridade associada já é passada ao objeto.
*/
const prioridades = {
    "prioridade_1": {
        "tipo_reclamacao": "reestabelecimento do fornecimento de energia",
        "prioridade_associada": "1"
    },

    "prioridade_2": {
        "tipo_reclamacao": "falta de energia",
        "prioridade_associada": "2"
    },

    "prioridade_3": {
        "tipo_reclamacao": "Acidente na rede elétrica",
        "prioridade_associada": "3"
    }
};
/** 
    Retorna o tipo de reclamação associada com o número informado pelo usuário na interface com
    o cliente. Novos tipos podem ser definidos e em uma implementação mais flexível talvez as 
    reclamações poderiam ser armazenadas no próprio banco de dados, dando liberdade à não
    programadores de criar suas próprias reclamações.

    @param tipoReclamacao o tipo da reclamação fornecida pelo usuário.
    @returns a string associada com aquele número.
*/
function calcularReclamacao(tipoReclamacao){
    let returnReclamacao;

    switch(tipoReclamacao){
        case 1:
            returnReclamacao = prioridades.prioridade_1.tipo_reclamacao;
            break;
        case 2:
            returnReclamacao = prioridades.prioridade_2.tipo_reclamacao;
            break;
        case 3:
            returnReclamacao = prioridades.prioridade_3.tipo_reclamacao;
            break;
    }
    return returnReclamacao;
}
/**
 *  Obtem a reclamação de maios prioridade entre aquelas da lista.
 * 
 * @returns a reclamação de maior prioridade.
 */
function getFirst(){

}
    
module.exports = {

    async store(req, res){

        let tipoReclamacao = req.body.tipoReclamacao;
        let unidadeConsumidora = req.body.unidadeConsumidora;

        await Cliente.findOne({unidadeConsumidora: unidadeConsumidora}, (err, cliente) => {
            if(err){
                res.status(500).json({erro: err});
            }
            if(!cliente){
                res.status(404).json({mensagem:"usuário não encontrado."});
            }
            else{
              
                // verifica se a reclamação informada é um número dentro do intervalo estabelecido.
                if(Number.isInteger(tipoReclamacao) && tipoReclamacao >= 1 && tipoReclamacao <= 3){
                    const reclamacao = new Reclamacao({
                        _id: new mongoose.Types.ObjectId(),
                        unidadeConsumidora: unidadeConsumidora,
                        tipoReclamacao: calcularReclamacao(tipoReclamacao),
                        prioridadeAssociada: tipoReclamacao,
                        local: {
                            CEP: cliente.CEP,
                            complemento: cliente.complemento
                        }
                    });
                    reclamacao.save();
                    res.status(201).json({message:"handling posts", reclamacao: reclamacao});
                }      
                else{
                    res.status(404).json({message: "reclamação inválida."});
                }
            }
        });
    },
    async get_all(req,res){

        await Reclamacao.find({}, (err, reclamacao) =>{
            if(err){
                res.status(500).json({erro: err});
            }
            if(!reclamacao.length){
                res.status(404).json({mensagem: "nenhuma reclamação encontrada."});
            }
            else{
                res.status(200).send(reclamacao);
            }
        });
    },
    async get_one(req, res){

       await Reclamacao.findOne({_id: req.body.reclamacaoId}, (err, reclamacao) => {
            if(err){
                res.status(500).json({erro: err});
            }
            if(!reclamacao){
                res.status(404).json({mensagem:"reclamacao não encontrada."});
            }
            else{
                res.status(200).send(reclamacao);
            }
       });
    },
    async delete_one(req, res){
        await Reclamacao.findOneAndRemove({_id: req.body.reclamacaoId}, (err, reclamacao) => {
            if(err){
                res.status(500).json({erro: err});
            }
            if(!reclamacao){
                res.status(404).json({mensagem:"reclamacao não encontrada."});
            }
            else{
                res.status(200).json({mensagem:"reclamacao deletada com sucesso."});
            }
        });
    }
}