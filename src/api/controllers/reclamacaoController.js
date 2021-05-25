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
        "tipo_reclamacao": "Reestabelecimento do fornecimento de energia",
        "prioridade_associada": "1"
    },

    "prioridade_2": {
        "tipo_reclamacao": "Falta de energia",
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

    @param prioridadeAssociada o tipo da reclamação fornecida pelo usuário.
    @returns a string associada com aquele número.
*/
function calcularReclamacao(prioridadeAssociada) {

    let returnReclamacao;

    switch (prioridadeAssociada) {
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
module.exports = {

    /**  Rota para a inserção de reclamações no banco de dados. 
    *    Necessita do tipo da reclamação(tipoReclamacao) e da
    *   unidade consumidora do cliente.
    */
    async store(req, res) {

        let prioridadeAssociada = req.body.prioridadeAssociada;
        let unidadeConsumidora = req.body.unidadeConsumidora;

        await Cliente.findOne({ unidadeConsumidora: unidadeConsumidora }, (err, cliente) => {
            if (err) {
                return res.status(500).json({ erro: err });
            }
            if (!cliente) {
                return res.status(422).json({ mensagem: "usuário não encontrado." });
            }
            else {

                // verifica se a reclamação informada é um número dentro do intervalo estabelecido.
                if (Number.isInteger(Number(prioridadeAssociada)) && prioridadeAssociada >= 1 && prioridadeAssociada <= 3) {
                    const reclamacao = new Reclamacao({
                        _id: new mongoose.Types.ObjectId(),
                        unidadeConsumidora: unidadeConsumidora,
                        tipoReclamacao: String(calcularReclamacao(Number(prioridadeAssociada))),
                        prioridadeAssociada: prioridadeAssociada,
                        local: {
                            cep: cliente.cep,
                            complemento: cliente.complemento
                        }
                    });
                    reclamacao.save().then(_response => {
                        res.status(201).json({
                            message: "reclamação feita com sucesso.",
                            reclamacao: reclamacao
                        });
                    }).catch(err => {
                        res.status(500).json({ erro: err });
                    });
                }
                else {
                    return res.status(404).json({ message: "reclamação inválida." });
                }
            }
        });
    },
    async get_all(req, res) {

        await Reclamacao.find({}, (err, reclamacao) => {
            if (err) {
                return res.status(500).json({ erro: err });
            }
            if (!reclamacao.length) {
                return res.status(404).json({ mensagem: "nenhuma reclamação encontrada." });
            }
            else {
                return res.status(200).send(reclamacao);
            }
        });
    },
    async get_priority(req, res){
        await Reclamacao.find({}, (err, reclamacao) => {
            if (err) {
                return res.status(500).json({ erro: err });
            }
            if (!reclamacao.length) { //Verifica se há alguma reclamação registrada
                return res.status(404).json({ mensagem: "nenhuma reclamação encontrada." });
            }
            else {
                if(reclamacao.length == 1){ //Se houver só uma reclamação, já retorna, não precisa procurar por prioridade
                    return res.status(200).json(reclamacao[0]);
                } else{
                    var reclamacao_prioridade3 = [];
                    var reclamacao_prioridade2 = [];
                    var reclamacao_prioridade1 = [];
                    var First;
                    var i3 = 0;
                    var i2 = 0;
                    var i1 = 0;
                    for(i=0; i<reclamacao.length; i++){ 
                        //Busca todas as reclamações com cada tipo de prioridade e guarda em uma array específico
                        if(reclamacao[i].prioridadeAssociada == 3){
                            reclamacao_prioridade3[i3] = reclamacao[i];
                            i3++;
                        }
                        if(reclamacao[i].prioridadeAssociada == 2){
                            reclamacao_prioridade2[i2] = reclamacao[i];
                            i2++;
                        }
                        if(reclamacao[i].prioridadeAssociada == 1){
                            reclamacao_prioridade1[i1] = reclamacao[i];
                            i1++;
                        }
                    }
                    if(reclamacao_prioridade3.length){ //Verifica se há alguma reclamação com prioridade 3
                        First = reclamacao_prioridade3[0]
                        if(reclamacao_prioridade3.length == 1){ //Caso haja só uma, retorna logo
                            return res.status(200).json(First);
                        } else{
                            for(i=0; i<reclamacao_prioridade3.length-1; i++){ //Caso haja mais, compara qual foi criada antes
                                var time1 = new Date(reclamacao_prioridade3[i].createdAt)
                                var time2 = new Date(reclamacao_prioridade3[i+1].createdAt)
                                if(time1.getTime() > time2.getTime()){
                                    First = reclamacao_prioridade3[i+1];
                                }
                            }
                            return res.status(200).json(First);
                        }
                    } else if(reclamacao_prioridade2.length){ //Verifica se há alguma reclamação com prioridade 2
                        First = reclamacao_prioridade2[0]
                        if(reclamacao_prioridade2.length == 1){ //Caso haja só uma, retorna logo
                            return res.status(200).json(First);
                        } else{
                            for(i=0; i<reclamacao_prioridade2.length-1; i++){ //Caso haja mais, compara qual foi criada antes
                                var time1 = new Date(reclamacao_prioridade2[i].createdAt)
                                var time2 = new Date(reclamacao_prioridade2[i+1].createdAt)
                                if(time1.getTime() > time2.getTime()){
                                    First = reclamacao_prioridade2[i+1];
                                }
                            }
                            return res.status(200).json(First);
                        }
                    } else{ //Se chegar aqui, não há reclamações de prioridade 3 nem 2, então verifica se há alguma reclamação com prioridade 1
                        First = reclamacao_prioridade1[0]
                        if(reclamacao_prioridade1.length == 1){ //Caso haja só uma, retorna logo
                            return res.status(200).json(First);
                        } else{
                            for(i=0; i<reclamacao_prioridade1.length-1; i++){ //Caso haja mais, compara qual foi criada antes
                                var time1 = new Date(reclamacao_prioridade1[i].createdAt)
                                var time2 = new Date(reclamacao_prioridade1[i+1].createdAt)
                                if(time1.getTime() > time2.getTime()){
                                    First = reclamacao_prioridade1[i+1];
                                }
                            }
                            return res.status(200).json(First);
                        }
                    }
                }
            }
        });
    },
    async get_one(req, res) {

        await Reclamacao.findOne({ _id: req.body.reclamacaoId }, (err, reclamacao) => {
            if (err) {
                return res.status(500).json({ erro: err });
            }
            if (!reclamacao) {
                return res.status(404).json({ mensagem: "reclamacao não encontrada." });
            }
            else {
                return res.status(200).send(reclamacao);
            }
        });
    },
    async delete_one(req, res) {
        await Reclamacao.findOneAndRemove({ _id: req.body.reclamacaoId }, (err, reclamacao) => {
            if (err) {
                return res.status(500).json({ erro: err });
            }
            if (!reclamacao) {
                return res.status(404).json({ mensagem: "reclamacao não encontrada." });
            }
            else {
                return res.status(200).json({ mensagem: "reclamacao deletada com sucesso." });
            }
        });
    }
}