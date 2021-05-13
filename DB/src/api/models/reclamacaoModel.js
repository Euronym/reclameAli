const mongoose = require('mongoose');

const { Schema } = mongoose;

const reclamacaoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unidadeConsumidora: Number,
    tipoReclamacao: String,
    prioridadeAssociada: Number,
    local:{
        CEP: Number,
        complemento: String
    }
}, {timestamps: true},);


module.exports = mongoose.model("Reclamacao", reclamacaoSchema);