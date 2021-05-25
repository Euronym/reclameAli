const mongoose = require('mongoose');

const { Schema } = mongoose;

// define o esquema utilizado para uma reclamação no banco de dados, com todos os atributos necessários.
const reclamacaoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unidadeConsumidora: {type: String,required: true},
    tipoReclamacao: {type: String,required: true},
    prioridadeAssociada: {type: Number,required: true},
    local:{
        cep: {type: Number,required: true},
        complemento: {type: String,required: true}
    }
}, {timestamps: true},);


module.exports = mongoose.model("Reclamacao", reclamacaoSchema);