const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// importa o modelo definido para instanciação das reclamações.
const Reclamacao = require("../models/reclamacaoModel");

router.post("/", (req,res) => {


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