const express = require("express");
const mongoose = require("mongoose");


const router = express.Router();

const Operador = require("../models/operadorModel");

router.post("/", (req,res) => {
    
    Operador.findOne({ login: req.body.email }, (err, operador) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
        }
        else {
            if (operador.usuario.senha == req.body.senha) {
                res.status(200).json({
                    "nome": operador.usuario.nome,
                    "cargo": operador.cargo,
                    "telefone": operador.telefone
                });
            }
            else {
                res.status(404);
            }
        }
    });
});
router.get("/", (req,res) => {
   
    res.status(200).json({message: "you haven't picked the special id"});

});
router.patch("/:operadorId", (req,res) => {
    const email = req.body.email;
    const login = req.body.login;
});
router.delete("/:operadorId", (req,res) => {
    const id = req.params.operadorId;
    if(id === 'special')
        res.status(200).json({"message": "you picked the special id"});
    else
        res.status(200).json({"message": "you haven't picked the special id"});

});


module.exports = router;