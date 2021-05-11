const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Tecnico = require("../models/tecnicoModel");

// obtém informações da primeira reclamação na lista.
router.get("/tecnicos/:tecnicoId", (req,res) => {

    Tecnico.findOne({estaDiponivel: true}, (err, tecnico) => {
        if(err){
            res.status(500).json({
                "error": err
            });
        }
        else{
            res.status(200).send(tecnico);
        }
    });
});
router.get("/tecnicos", (req, res) => {

    Tecnico.find({estaDiponivel: true}, (err, tecnicos) => {
        if(err){
            res.status(500).json({
                "error": err
            });
        }
        if(!tecnicos.length){
            res.status(404).json({
                "Mensagem": "não há tecnicos disponíveis para atendimento."
            });
        }
        else{
            res.status(200).json({
                "tecnicos_diponiveis": Tecnico.count(),
                "lista_tecnicos":  tecnicos
            });
        }
    });
});
router.patch("/:tecnicoId", (req,res) => {
    
    Tecnico.updateOne({email: req.body.email},{$set:{estaDiponivel: req.body.estaDiponivel} } );

});

module.exports = router;