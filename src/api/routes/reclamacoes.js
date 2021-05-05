const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// importa o modelo definido para instanciação das reclamações.
const Reclamacao = require("../models/reclamacaoModel");

router.post("/", (req,res) => {

    const reclamacao = new Reclamacao({
        _id: new mongoose.Types.ObjectId(),
        unidadeConsumidora: req.body.unidadeConsumidora,
        tipoReclamacao: req.body.tipoReclamacao,
        prioridadeAssociada: 0,
        local: {
            CEP: 0,
            complemento: "0",
        }
    });
    reclamacao.save();
    res.status(201).json({
        message:"handling posts",
        createdProduct: reclamacao
    });

});
// obtém informações da primeira reclamação na lista.
router.get("/:reclamacaoId", (req,res) => {
    
});
router.delete("/:reclamacaoId", (req,res) => {

});

module.exports = router;
